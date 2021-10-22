<?php
/**
 * Created by PhpStorm.
 * User: TOSHIBA
 * Date: 22/10/2021
 * Time: 00:30
 */

namespace App\Controller\Api;


use App\Entity\Connections;
use App\Repository\ConnectionsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class CreateEditConnection
{
    /**
     * @var EntityManagerInterface
     */
    protected $em;

    /**
     * @var ConnectionsRepository
     */
    protected $connectionRepository;

    /**
     * CreateConnection constructor.
     * @param EntityManagerInterface $manager
     */
    public function __construct(ConnectionsRepository $repository, EntityManagerInterface $manager)
    {
        $this->connectionRepository = $repository;
        $this->em = $manager;
    }

    /**
     * @param Connections $data
     * @return mixed
     * @throws \Exception
     */
    public function __invoke(Connections $data)
    {
        if($data->getId() === null){
            if ($this->connection_exist($data->getRepresentative()->getId(), $data->getCelebrity()->getId(), $data->getIsPublicist())) {
                return [
                    'message' => 'You have already link this representative with this celebrity.',
                    'code'=> 0
                ];
            }
        }else{
            if ($this->connection_exist($data->getRepresentative()->getId(),
                $data->getCelebrity()->getId(), $data->getIsPublicist(), $data->getId())) {
                return [
                    'message' => 'You have already link this representative with this celebrity.',
                    'code'=> 0
                ];
            }
        }

        if($data->getCreatedAt()!== null){
            $data->setCreatedAt(new \DateTimeImmutable());
        }else{
            $data->setUpdatedAt(new \DateTimeImmutable());
        }
        $this->em->persist($data);
        $this->em->flush();

        return [
            'message' => "connection created successfully.",
            'connection' => $data,
            'code'=> 1
        ];
    }

    private function connection_exist($representative, $celebrity, $isPublicist, $id=0){
        if($isPublicist == true){
            return ($this->connectionRepository->existConnectionForPublicist($representative, $celebrity, $id));
        }else{
            return ($this->connectionRepository->existConnectionForAgentOrManager($representative, $celebrity, $id));
        }
    }
}