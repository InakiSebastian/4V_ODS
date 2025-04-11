<?php

namespace App\Controller;

use App\Model\NewDiffusionDTO;
use App\Service\DiffusionService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;


#[Route('/diffusion', name: 'diffusion')]
class DiffusionController extends AbstractController
{
    public function __construct(private DiffusionService $diffusionService) {}

    #[Route('/', name: 'get_all', methods: ['GET'])]
    public function getListDiffusions(): JsonResponse
    {
        $diffusions = $this->diffusionService->getAllDiffusions();
        return $this->json($diffusions);
    }

    #[Route('', name: 'create_diffusion', methods: ['POST'])]
    public function createDiffusion(#[MapRequestPayload] NewDiffusionDTO $diffusionData): JsonResponse
    {
        $diffusion = $this->diffusionService->createDiffusion($diffusionData);
        return $this->json($diffusion, 201);
    }
    
    #[Route('/{id}', name: 'update_diffusion', methods: ['PUT'])]
    public function updateDiffusion(int $id, #[MapRequestPayload] NewDiffusionDTO $diffusionData): JsonResponse
    {
        $diffusion = $this->diffusionService->updateDiffusion($id, $diffusionData);
        return $this->json($diffusion);
    }

    #[Route('/{id}', name: 'delete_diffusion', methods: ['DELETE'])]
    public function deleteDiffusion(int $id): JsonResponse
    {
        $this->diffusionService->deleteDiffusion($id);
        return $this->json(['message' => 'La difusión fue eliminada correctamente']);
    }

    #[Route('/{id}', name: 'get_diffusion_by_id', methods: ['GET'])]
    public function getDiffusionById(int $id): JsonResponse
    {
        $diffusion = $this->diffusionService->getDiffusionById($id);
        if (!$diffusion) {
            return $this->json(['message' => 'Difusión no encontrada'], 404);
        }
        return $this->json($diffusion);
    }
    

    

}