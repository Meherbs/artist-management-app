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

    public function countAgents(){
        $em = $this->getEntityManager();
        $query = $em->createQuery('SELECT COUNT(c.id) FROM '.Connections::class .' c where c.isAgent = true');
        return intval($query->getSingleScalarResult());
    }

    public function countPublicist(){
        $em = $this->getEntityManager();
        $query = $em->createQuery('SELECT COUNT(c.id) FROM '.Connections::class .' c where c.isPublicist = true');
        return intval($query->getSingleScalarResult());
    }

    public function countManagers(){
        $em = $this->getEntityManager();
        $query = $em->createQuery('SELECT COUNT(c.id) FROM '.Connections::class .' c where c.isManager = true');
        return intval($query->getSingleScalarResult());
    }

    public function existConnectionForAgentOrManager($representative, $celebrity, $id=0){
        $em = $this->getEntityManager();
        if($id !== 0){
            $query = $em->createQuery('SELECT COUNT(c.id) FROM '.Connections::class .' c where c.representative = '
                .$representative.' and c.celebrity = '.$celebrity.' and c.id <> '.$id.
                ' and (c.isAgent = true or c.isManager = true)');
        }else{
            $query = $em->createQuery('SELECT COUNT(c.id) FROM '.Connections::class .' c where c.representative = '
                .$representative.' and c.celebrity = '.$celebrity.
                ' and (c.isAgent = true or c.isManager = true)');
        }

        return intval($query->getSingleScalarResult());
    }

    public function existConnectionForPublicist($representative, $celebrity, $id=0){
        $em = $this->getEntityManager();
        if($id !== 0) {
            $query = $em->createQuery('SELECT COUNT(c.id) FROM ' . Connections::class .
                ' c where c.representative = ' . $representative . ' and c.id <> ' . $id .
                ' and c.celebrity = ' . $celebrity . ' and (c.isAgent = false and c.isManager = false)');
        }else{
            $query = $em->createQuery('SELECT COUNT(c.id) FROM ' . Connections::class .
                ' c where c.representative = ' . $representative .
                ' and c.celebrity = ' . $celebrity . ' and (c.isAgent = false and c.isManager = false)');
        }
        return intval($query->getSingleScalarResult());
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
