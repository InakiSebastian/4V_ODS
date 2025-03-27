<?php

namespace App\Controller;

use App\Service\DegreeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

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
        return $this->json($degree);
    }
}

