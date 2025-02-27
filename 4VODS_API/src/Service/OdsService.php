<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Ods;

class OdsService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function toDTO($ods): array
    {
        return [
            'id' => $ods->getId(),
            'description' => $ods->getDescription(),
            'dimension' => $ods->getDimension(),
        ];
    }
    public function getAllOdss(): array
    {
        $odss = $this->entityManager->getRepository(Ods::class)->findAll();
        $odssDTO = [];
        foreach ($odss as $ods) {
            $odssDTO[] = $this->toDTO($ods);
        }
        return $odssDTO;
    }

}