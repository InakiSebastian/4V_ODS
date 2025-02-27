<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Diffusion;

class DiffusionService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function toDTO($diffusion): array
    {
        return [
            'id' => $diffusion->getId(),
            'type' => $diffusion->getType(),
            'link' => $diffusion->getLink(),
            'iniciative' =>  $diffusion->getIniciative()->getId(),
        ];
    }
    public function getAllDiffusions(): array
    {
        $diffusions = $this->entityManager->getRepository(Diffusion::class)->findAll();
        $diffusionsDTO = [];
        foreach ($diffusions as $diffusion) {
            $diffusionsDTO[] = $this->toDTO($diffusion);
        }
        return $diffusionsDTO;
    }

}