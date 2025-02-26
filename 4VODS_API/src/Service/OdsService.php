<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Ods;

class OdsService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getAllOdss(): array
    {
        return $this->entityManager->getRepository(Ods::class)->findAll();
    }

}