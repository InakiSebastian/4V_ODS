<?php

namespace App\Controller;

use App\Service\DiffusionService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

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
}