<?php

namespace App\Controller\Api;

use App\Entity\Representative;
use App\Repository\EmailAdressRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class CreateRepresentative
{
    /**
     * @var EntityManagerInterface
     */
    protected $em;

    /**
     * @var EmailAdressRepository
     */
    protected $emailAdressRepository;

    /**
     * CreateUser constructor.
     * @param EntityManagerInterface $manager
     */
    public function __construct(EmailAdressRepository $repository, EntityManagerInterface $manager)
    {
        $this->emailAdressRepository = $repository;
        $this->em = $manager;
    }

    /**
     * @param Representative $data
     * @return mixed
     * @throws \Exception
     */
    public function __invoke(Representative $data)
    {
        if ($this->email_exist($data->getEmails())) {
            throw new BadRequestHttpException('Cette adresse email a déjà été utilisé.');
        }

        $representative = clone ($data);
        $representative->setEmails(new ArrayCollection());

        $this->em->persist($representative);

        foreach ($data->getEmails() as $email){
            $email->setRepresentative($representative);
            $representative->addEmail($email);
            $this->em->persist($email);
        }

        $this->em->persist($representative);
        $this->em->flush();

        return [
            'message' => "Representative created successfully.",
            'representative' => $representative
        ];
    }

    private function email_exist(Collection $emails){
        $list = [];
        foreach ($emails as $email){
            array_push($list, $email->getAdress());
        }

        return ($this->emailAdressRepository->duplicatedEmailAdress($list));
    }
}