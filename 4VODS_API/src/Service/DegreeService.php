<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Degree;

class DegreeService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function toDTO($degree): array
    {
        return [
            'id' => $degree->getId(),
            'name' => $degree->getName(),
        ];
    }
    public function getAllDegrees(): array
    {
        $degrees = $this->entityManager->getRepository(Degree::class)->findAll();
        $degreesDTO = [];
        foreach ($degrees as $degree) {
            $degreesDTO[] = $this->toDTO($degree);
        }
        return $degreesDTO;
    }

}