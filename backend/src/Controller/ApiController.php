<?php

namespace App\Controller;

use App\Entity\Celebrity;
use App\Entity\Connections;
use App\Entity\Log;
use App\Entity\Representative;
use App\Entity\ResetPasswordRequest;
use App\Entity\User;
use phpDocumentor\Reflection\Types\Collection;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Security;

class ApiController extends AbstractController
{
    /**
     * @Route("/auth/forget-password", name="forget_password_api")
     */
    public function forgetPassword(\Swift_Mailer $mailer,Request $request): Response
    {
        $content = json_decode($request->getContent(), true);
        $email = $content['email'];
        //$email = $request->request->get('email');

        $user = $this->getDoctrine()
            ->getRepository(User::class)
            ->findOneBySomeField($email);
        if (!$user) {
            return $this->json([
               'response' => 'invalid account data!',
               'code' => 0,
                'data'=> $email
            ]);
        }else{
            try{
                $token = sha1(uniqid($user->getEmail(), true));
                $url = "http://localhost:4200/reset-password?token=".$token;

                // you can fetch the EntityManager via $this->getDoctrine()
                // or you can add an argument to the action: createProduct(EntityManagerInterface $entityManager)
                $entityManager = $this->getDoctrine()->getManager();

                $requestPassword = new ResetPasswordRequest();
                $requestPassword->setUser($user);
                $requestPassword->setToken($token);

                // tell Doctrine you want to (eventually) save the Product (no queries yet)
                $entityManager->persist($requestPassword);

                // actually executes the queries (i.e. the INSERT query)
                $entityManager->flush();

                $message = (new \Swift_Message('Votre compte sur artist management'))
                    ->setFrom('lica8720@gmail.com')
                    ->setTo($user->getEmail())
                    ->setBody("Stram Portrait Reset Password Request")
                    ->addPart('
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: \'Open Sans\', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:\'Rubik\',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique url to reset your
                                            password has been generated for you. To reset your password, click to reset password button.
                                        </p>
                                        <a href="'.$url.'"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                               Reset password
                                            </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align:center;">
                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;"> <strong></strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
', 'text/html');
                $mailer->send($message);
                return $this->json([
                    'response' => 'mail sended to '.$user->getEmail(),
                    'code' => 1
                ]);
            }catch (\Exception $exception){
                return $this->json([
                    'response' => 'error sending mail!',
                    'code' => 0
                ]);
            }
        }
    }

    /**
     * @Route("/auth/reset-password", name="reset_password_api")
     */
    public function resetPassword(UserPasswordEncoderInterface $userPasswordEncoder, Request $request): Response
    {
        $content = json_decode($request->getContent(), true);
        $token = $content['token'];
        $password = $content['password'];

        $resetPassword = $this->getDoctrine()
            ->getRepository(ResetPasswordRequest::class)
            ->findOneBySomeField($token);

        if (!$resetPassword) {
            return $this->json([
                'response' => 'invalid or expired url, this url is available for just 15 min!',
                'code' => 0,
                'data'=> $content
            ]);
        }else{
            try{
                $user = $resetPassword->getUser();

                $user->setPassword(
                    $userPasswordEncoder->encodePassword($user, $password)
                );
                $entityManager = $this->getDoctrine()->getManager();
                //$entityManager->remove($resetPassword);*/
                // tell Doctrine you want to (eventually) save the Product (no queries yet)
                $entityManager->persist($user);

                // actually executes the queries (i.e. the INSERT query)
                $entityManager->flush();

                return $this->json([
                    'response' => 'password has been changed successfully ',
                    'code' => 1,
                    'user' => $user
                ]);
            }catch (\Exception $exception){
                return $this->json([
                    'response' => 'error when persisting new password !',
                    'code' => 0,
                    'exception' => $exception
                ]);
            }
        }
    }

    /**
     * @Route("/api/removeApi", name="remove_entity_api", methods={"POST"})
     */
    public function removeEntity(Request $request, Security $security): Response
    {
        $content = json_decode($request->getContent(), true);
        $namespace = $content['namespace'];
        $id = $content['id'];

        $entity = $this->getDoctrine()
            ->getRepository($namespace)
            ->find($id);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($entity);
        $log = new Log();
        $tab = explode("\\", $namespace);
        $log->setLevel(200);
        $log->setLevelName('INFO');
        $name =  $tab[count($tab)-1];
        $log->setMessage($name." with id ".$entity->getId()." deleted by ");
        $log->setDoneBy($security->getUser()->getUsername());
        $log->setUser($security->getUser());
        $log->setExtra([]);
        $log->setCreatedAt(new \DateTimeImmutable());

        $entityManager->persist($log);
        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return $this->json([
            'response' => 'entity removed successfully!',
            'code' => 1,
            'data'=> $content
        ]);
    }


    /**
     * @Route("/api/stats", name="stats_datas")
     */
    public function statGetters(Request $request): Response
    {
        try{
            $celebrityNb = $this->getDoctrine()->getRepository(Celebrity::class)->count([]);
            $representativeNb = $this->getDoctrine()->getRepository(Representative::class)->count([]);
            $accountsNb = $this->getDoctrine()->getRepository(User::class)->count([]);
            $publicistNb = $this->getDoctrine()->getRepository(Connections::class)->countPublicist();
            $agentsNb = $this->getDoctrine()->getRepository(Connections::class)->countAgents();
            $managersNb = $this->getDoctrine()->getRepository(Connections::class)->countManagers();

            return $this->json([
                'celebrity' => $celebrityNb,
                'representative' => $representativeNb,
                'accounts' => $accountsNb,
                'publicist' => $publicistNb,
                'managers'=> $managersNb,
                'agents'=> $agentsNb,
                'code' => 1
            ]);
        }catch (\Exception $exception){
            return $this->json([
                'response' => 'error when get stats !',
                'code' => 0,
                'exception' => $exception
            ]);
        }

    }

    /**
     * @Route("/test", name="test_api")
     */
    public function testApi(Request $request): Response
    {
            return $this->json([
                'response' => 'working api!',
                'code' => 1,
                'data'=> null
            ]);

    }
}
