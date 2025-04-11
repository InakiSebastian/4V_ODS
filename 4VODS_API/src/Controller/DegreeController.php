<?php

namespace App\Controller;

use App\Model\NewDegreeDTO;
use App\Service\DegreeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;


#[Route('/degree', name: 'degree')]
class DegreeController extends AbstractController
{
    public function __construct(private DegreeService $degreeService) {}

    #[Route('/', name: 'get_all', methods: ['GET'])]
    public function getListDegrees(): JsonResponse
    {
        $degrees = $this->degreeService->getAllDegrees();
        return $this->json($degrees);
    }

    #[Route('/{id}', name: 'get_byId', methods: ['GET'])]
    public function getDegreeById(int $id): JsonResponse
    {
        $degree = $this->degreeService->getDegreeById($id);
        if ($degree === null) {
            return $this->json(['error' => 'Degree not found'], 404);
        }
        return $this->json($degree);
    }

    #[Route('', name: 'create_degree', methods: ['POST'])]
    public function createDegree(#[MapRequestPayload] NewDegreeDTO $degreeData): JsonResponse
    {
        $degree = $this->degreeService->createDegree($degreeData);
        return $this->json($degree, 201);
    }

    #[Route('/{id}', name: 'update_degree', methods: ['PUT'])]
    public function updateDegree(int $id, #[MapRequestPayload] NewDegreeDTO $degreeData): JsonResponse
    {
        $degree = $this->degreeService->updateDegree($id, $degreeData);
        return $this->json($degree);
    }

    #[Route('/{id}', name: 'delete_degree', methods: ['DELETE'])]
    public function deleteDegree(int $id): JsonResponse
    {
        $this->degreeService->deleteDegree($id);
        return $this->json(['message' => 'El grado fue eliminado correctamente']);
    }

    

}
