<?php

namespace App\Repository;

use App\Entity\EmailAdress;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Persistence\ManagerRegistry;
use phpDocumentor\Reflection\Types\Collection;

/**
 * @method EmailAdress|null find($id, $lockMode = null, $lockVersion = null)
 * @method EmailAdress|null findOneBy(array $criteria, array $orderBy = null)
 * @method EmailAdress[]    findAll()
 * @method EmailAdress[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EmailAdressRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, EmailAdress::class);
    }

    // /**
    //  * @return EmailAdress[] Returns an array of EmailAdress objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?EmailAdress
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    public function duplicatedEmailAdress(Array $adress): ?int
    {
        $qb = $this->createQueryBuilder('e');

        return ($qb->select($qb->expr()->count('e'))
            ->where($qb->expr()->in('e.adress', $adress))
            ->getQuery()
            ->getSingleScalarResult()) > 0;
            ;

    }

}
