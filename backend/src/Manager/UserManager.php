<?php

namespace App\Manager;

use App\Entity\User;
use App\Repository\UserRepository;
use App\Services\PasswordService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class UserManager
{
    /**
     * @var EntityManagerInterface
     */
    protected $em;

    /**
     * @var PasswordService
     */
    protected $passwordService;

    /**
     * @var UserRepository
     */
    protected $userRepository;

    /**
     * UserManager constructor.
     * @param EntityManagerInterface $entityManager
     * @param PasswordService $passwordService
     * @param UserRepository $userRepository
     */
    public function __construct(
        EntityManagerInterface $entityManager,
        PasswordService $passwordService,
        UserRepository $userRepository
    ) {
        $this->em = $entityManager;
        $this->passwordService = $passwordService;
        $this->userRepository = $userRepository;
    }

    /**
     * @param string $email
     * @return mixed
     */
    public function findByEmail(string $email)
    {
        $user = $this->userRepository->findOneBySomeField($email);
        if ($user) {
            return $user;
        }

        return null;
    }

    /**
     * @param string $email
     * @param string $username
     * @return mixed
     */
    public function findByUsername(string $username)
    {
        $user = $this->userRepository->findOneByUsername($username);

        if ($user) {
            return $user;
        }

        return null;
    }

    /**
     * @param int $id
     */
    public function remove(int $id)
    {
        $user = $this->userRepository->find($id);

        if ($user instanceof User) {
            $user->setEmail('***********************');
            $user->setUsername('***********************');
            $this->em->remove($user);
            $this->em->flush();
        }
    }

    /**
     * @param User $user
     * @return array|string
     * @throws \Exception
     */
    public function registerAccount(User $user)
    {
        if ($this->findByEmail($user->getEmail())) {
            throw new BadRequestHttpException('Cette adresse email a déjà été utilisé.');
        }
        if ($this->findByUsername($user->getUsername())) {
            throw new BadRequestHttpException("Cette nom d'utlisateur a déjà été utilisé.");
        }
        $pass = $this->passwordService->encode($user, $user->getPassword());
        $user->setPassword($pass);
        $user->setCreatedAt(new \DateTime());
        $this->em->persist($user);
        $this->em->flush();

        return [
            'message' => 'Création de compte enregistrée.',
            'user' => $user
        ];
    }

    /**
     * REP + ANNEE + MOIS + JOUR + TOKEN GENERER.
     *
     * @return string
     */
    public function referenceFormat()
    {
        return 'REP'.substr(date('Y'), 2).date('md').uniqid();
    }
}