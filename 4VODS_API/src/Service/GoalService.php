<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Goal;

class GoalService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function toDTO($goal): array
    {
        return [
            'id' => $goal->getId(),
            'description' => $goal->getDescription(),
            'idOds' => $goal->getIdOds()->getId(),
        ];
    }
    public function getAllGoals(): array
    {
        $goals = $this->entityManager->getRepository(Goal::class)->findAll();
        $goalsDTO = [];
        foreach ($goals as $goal) {
            $goalsDTO[] = $this->toDTO($goal);
        }
        return $goalsDTO;
    }

}