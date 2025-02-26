<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Module;

class ModuleService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getAllModules(): array
    {
        return $this->entityManager->getRepository(Module::class)->findAll();
    }

}