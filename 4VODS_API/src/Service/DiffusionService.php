<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Diffusion;

class DiffusionService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getAllDiffusions(): array
    {
        return $this->entityManager->getRepository(Diffusion::class)->findAll();
    }

}