<?php

namespace App\Repository;

use App\Entity\Connections;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Connections|null find($id, $lockMode = null, $lockVersion = null)
 * @method Connections|null findOneBy(array $criteria, array $orderBy = null)
 * @method Connections[]    findAll()
 * @method Connections[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ConnectionsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Connections::class);
    }

    // /**
    //  * @return Connections[] Returns an array of Connections objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Connections
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
