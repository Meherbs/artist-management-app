<?php

namespace App\DataFixtures;

use App\Entity\Celebrity;
use App\Entity\Connections;
use App\Entity\EmailAdress;
use App\Entity\Representative;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $encoder;

    /**
     * AppFixtures constructor.
     * @param UserPasswordEncoderInterface $encoder
     */
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }


    public function load(ObjectManager $manager)
    {
        $user = $this->createUser();

        // $product = new Product();
        $manager->persist($user);

        $emails1 = new EmailAdress();
        $emails1->setAdress("adress@gmail.com");
        $emails2 = new EmailAdress();
        $emails2->setAdress("adress2@gmail.com");
        $emails3 = new EmailAdress();
        $emails3->setAdress("adress3@gmail.com");
        $emails4 = new EmailAdress();
        $emails4->setAdress("adress4@gmail.com");
        $emails5 = new EmailAdress();
        $emails5->setAdress("adress5@gmail.com");
        $emails6 = new EmailAdress();
        $emails6->setAdress("adress6@gmail.com");
        $emails7 = new EmailAdress();
        $emails7->setAdress("adress7@gmail.com");
        $emails8 = new EmailAdress();
        $emails8->setAdress("adress8@gmail.com");
        $emails9 = new EmailAdress();
        $emails9->setAdress("adress9@gmail.com");

        $celebrity1 = $this->createCelebrity("celebrity 1", new \DateTimeImmutable(), "bio 1");
        $celebrity2 = $this->createCelebrity("celebrity 2", new \DateTimeImmutable(), "bio 2");
        $celebrity3 = $this->createCelebrity("celebrity 3", new \DateTimeImmutable(), "bio 3");
        $manager->persist($celebrity1);
        $manager->persist($celebrity2);
        $manager->persist($celebrity3);

        $represenataive1 = $this->createRepresentative("representative agent1", "company1");
        $emails1->setRepresentative($represenataive1);
        $represenataive1->addEmail($emails1);
        $manager->persist($represenataive1);

        $represenataive2 = $this->createRepresentative("representative manager1", "company1");
        $emails2->setRepresentative($represenataive2);
        $represenataive2->addEmail($emails2);
        $manager->persist($represenataive2);

        $represenataive3 = $this->createRepresentative("representative publicist1", "company1");
        $emails3->setRepresentative($represenataive3);
        $represenataive3->addEmail($emails3);
        $manager->persist($represenataive3);

        $represenataive4 = $this->createRepresentative("representative agent2", "company2");
        $emails4->setRepresentative($represenataive4);
        $represenataive4->addEmail($emails4);
        $manager->persist($represenataive4);

        $represenataive5 = $this->createRepresentative("representative manager2", "company2");
        $emails5->setRepresentative($represenataive5);
        $represenataive5->addEmail($emails5);
        $manager->persist($represenataive5);

        $represenataive6 = $this->createRepresentative("representative publicist2", "company2");
        $emails6->setRepresentative($represenataive6);
        $represenataive6->addEmail($emails6);
        $manager->persist($represenataive6);

        $represenataive7 = $this->createRepresentative("representative agent3", "company3");
        $emails7->setRepresentative($represenataive7);
        $represenataive7->addEmail($emails7);
        $manager->persist($represenataive7);

        $represenataive8 = $this->createRepresentative("representative manager3", "company3");
        $emails8->setRepresentative($represenataive8);
        $represenataive8->addEmail($emails8);
        $manager->persist($represenataive8);

        $represenataive9 = $this->createRepresentative("representative publicist3", "company3");
        $emails9->setRepresentative($represenataive9);
        $represenataive9->addEmail($emails9);
        $manager->persist($represenataive9);

        $c1 = $this->createConnection($celebrity1, $represenataive1, true, false, false);
        $manager->persist($c1);

        $c2 = $this->createConnection($celebrity1, $represenataive2, false, true, false);
        $manager->persist($c2);

        $c3 = $this->createConnection($celebrity1, $represenataive3, false, false, true);
        $manager->persist($c3);

        $c4 = $this->createConnection($celebrity2, $represenataive4, true, false, false);
        $manager->persist($c4);

        $c5 = $this->createConnection($celebrity3, $represenataive6, false, true, false);
        $manager->persist($c5);

        $manager->flush();
    }

    private function createUser(){
        $user = new User();
        $passwordHashed = $this->encoder->encodePassword(
            $user, 'root'
        );
        $user->setUsername('root');
        $user->setRoles(['ROLE_ADMIN', 'ROLE_USER']);
        $user->setEmail('');
        $user->setPassword($passwordHashed);
        return $user;
    }

    private function createCelebrity($name, $birthday, $bio){
        $model = new Celebrity();
        $model->setName($name);
        $model->setBirthday($birthday);
        $model->setBio($bio);
        return $model;
    }

    private function createRepresentative($name, $company){
        $model = new Representative();
        $model->setName($name);
        $model->setCompany($company);
        //$model->setEmails($emails);
        return $model;
    }

    private function createConnection($celebrity, $presentative, $isAgent, $isManager, $isPublicist){
        $model = new Connections();
        $model->setRepresentative($presentative);
        $model->setCelebrity($celebrity);
        $model->setIsAgent($isAgent);
        $model->setIsManager($isManager);
        $model->setIsPublicist($isPublicist);
        return $model;
    }

}
