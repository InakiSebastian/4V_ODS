<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Module;

class ModuleService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function toDTO($module): array
    {
        return [
            'id' => $module->getId(),
            'name' => $module->getName(),
            'degree' => $module->getIdDegree()->getId(),
        ];
    }
    public function getAllModules(): array
    {
        $modules = $this->entityManager->getRepository(Module::class)->findAll();
        $modulesDTO = [];
        foreach ($modules as $module) {
            $modulesDTO[] = $this->toDTO($module);
        }
        return $modulesDTO;
    }

}