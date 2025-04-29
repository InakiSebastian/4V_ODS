<?php

namespace App\Controller;

use App\Service\IniciativeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/options', name: 'app_options')]
final class OptionsController extends AbstractController {

    public function __construct(private IniciativeService $iniciativeService) {}

    
    #[Route('/schoolYears', name: 'get_years', methods: ['GET'])]
    public function getYears(): JsonResponse
    {
        $schoolYears = $this->iniciativeService->getSchoolYears();
        return $this->json($schoolYears);
    }
}
