<?php

namespace App\Service;

use App\Entity\Degree;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Module;
use App\Model\NewModuleDTO;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

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
            'idDegree' => $module->getIdDegree()->getId(),
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

    public function createModule(NewModuleDTO $newModule)
    {
        $existeDescripcionModule = $this->entityManager->getRepository(Module::class)->findOneBy(['name' => $newModule->getName()]);
        if ($existeDescripcionModule) {
            throw new BadRequestHttpException('Ya existe un módulo con el mismo nombre');
        }
        $newModuleEntity = new Module();
        $newModuleEntity->setName($newModule->getName());
        $degree = $this->entityManager->getRepository(Degree::class)->find($newModule->getDegree());
        if (!$degree) {
            throw new BadRequestHttpException('No se encontró el grado con el id ' . $newModule->getDegree());
        }
        $newModuleEntity->setIdDegree($degree);
        $this->entityManager->persist($newModuleEntity);
        $this->entityManager->flush();
        return $this->toDTO($newModuleEntity);
    }
    
    public function updateModule(int $id,NewModuleDTO $newModule)
    {
        $module = $this->entityManager->getRepository(Module::class)->find($id);
        if (!$module) {
            throw new BadRequestHttpException('No se encontró el módulo con el id ' . $id);
        }
        $existeDescripcionModule = $this->entityManager->getRepository(Module::class)->findOneBy(['name' => $newModule->getName()]);
        if ($existeDescripcionModule) {
            throw new BadRequestHttpException('Ya existe un módulo con el mismo nombre');
        }
        $module->setName($newModule->getName());
        $degree = $this->entityManager->getRepository(Degree::class)->find($newModule->getDegree());
        if (!$degree) {
            throw new BadRequestHttpException('No se encontró el grado con el id ' . $newModule->getDegree());
        }
        $module->setIdDegree($degree);
        $this->entityManager->flush();
        return $this->toDTO($module);
    }

    public function deleteModule(int $id)
    {
        $module = $this->entityManager->getRepository(Module::class)->find($id);
        if (!$module) {
            throw new BadRequestHttpException('No se encontró el módulo con el id ' . $id);
        }
        $this->entityManager->remove($module);
        $this->entityManager->flush();
    }

    public function getModuleById(int $id): ?array
    {
        $module = $this->entityManager->getRepository(Module::class)->find($id);
        if (!$module) {
            return null;
        }
        return $this->toDTO($module);
    }
    
    

}