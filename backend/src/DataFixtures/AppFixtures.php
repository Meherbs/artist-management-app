<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
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
        $user = new User();
        $passwordHashed = $this->encoder->encodePassword(
            $user, 'root'
        );
        $user->setUsername('root');
        $user->setRoles(['ROLE_ADMIN']);
        $user->setEmail('');
        $user->setPassword($passwordHashed);
        // $product = new Product();
        $manager->persist($user);

        $manager->flush();
    }
}
