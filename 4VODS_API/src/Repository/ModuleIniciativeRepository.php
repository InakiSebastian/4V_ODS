<?php

namespace App\Repository;

use App\Entity\ModuleIniciative;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ModuleIniciative>
 */
class ModuleIniciativeRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ModuleIniciative::class);
    }

    //    /**
    //     * @return ModuleIniciative[] Returns an array of ModuleIniciative objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('m.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?ModuleIniciative
    //    {
    //        return $this->createQueryBuilder('m')
    //            ->andWhere('m.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
