<?php

namespace App\Controller;

use App\Service\IndicatorService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/indicators', name: 'company')]
class IndicatorController extends AbstractController
{
    public function __construct(private IndicatorService $indicatorService) {}

    #[Route('/iniciatives/ods/grouped', name: 'get_by_ods_grouped', methods: ['GET'])]
    public function getIniciativesByOdsGrouped(): JsonResponse
    {
        $iniciatives = $this->indicatorService->iniciativesByOdsGrouped();
        return $this->json($iniciatives);
    }
    
    #[Route('/iniciatives/ods', name: 'get_by_ods', methods: ['GET'])]
    public function getIniciativesByOds(): JsonResponse
    {
        $iniciatives = $this->indicatorService->iniciativesByOds();
        return $this->json($iniciatives);
    }
}