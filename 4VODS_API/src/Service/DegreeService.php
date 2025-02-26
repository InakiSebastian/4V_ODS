<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
class DegreeService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getAllDegrees(): array
    {
        return $this->entityManager->getRepository(Degree::class)->findAll();
    }

}