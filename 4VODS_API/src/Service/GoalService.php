<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Goal;

class GoalService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getAllGoals(): array
    {
        return $this->entityManager->getRepository(Goal::class)->findAll();
    }

}