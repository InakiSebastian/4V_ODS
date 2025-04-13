<?php

namespace App\Controller;

use App\Model\NewModuleDTO;
use App\Service\ModuleService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
    

#[Route('/module', name: 'module')]
class ModuleController extends AbstractController
{
    public function __construct(private ModuleService $moduleService) {}

    #[Route('/modules', name: 'get_all', methods: ['GET'])]
    public function getListModules(): JsonResponse
    {
        $modules = $this->moduleService->getAllModules();
        return $this->json($modules);
    }


    #[Route('', name: 'create_module', methods: ['POST'])]
    public function createModule(#[MapRequestPayload] NewModuleDTO $newModule): JsonResponse
    {
        $module = $this->moduleService->createModule($newModule);
        return $this->json($module, 201);
    }

    #[Route('/{id}', name: 'update_module', methods: ['PUT'])]
    public function updateModule(int $id, #[MapRequestPayload] NewModuleDTO $newModule): JsonResponse
    {
        $module = $this->moduleService->updateModule($id, $newModule);
        return $this->json($module);
    }

    #[Route('/{id}', name: 'delete_module', methods: ['DELETE'])]

    public function deleteModule(int $id): JsonResponse
    {
        $this->moduleService->deleteModule($id);
        return $this->json(['message' => 'El módulo fue eliminado correctamente']);
    }

    #[Route('/{id}', name: 'get_module_by_id', methods: ['GET'])]
    public function getModuleById(int $id): JsonResponse
    {
        $module = $this->moduleService->getModuleById($id);
        if (!$module) {
            return $this->json(['message' => 'Módulo no encontrado'], 404);
        }
        return $this->json($module);
    }
    

}