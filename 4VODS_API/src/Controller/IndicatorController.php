<?php

namespace App\Controller;

use App\Service\IndicatorService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;


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

    #[Route('/iniciatives/countGrouped', name: 'get_count', methods: ['GET'])]
    public function getQuantityInicitiaves(): JsonResponse
    {
        $iniciatives = $this->indicatorService->indicativeCount();
        return $this->json($iniciatives);
    }

    #[Route('/iniciatives/countGrouped/{year}', name: 'get_count_by_year', methods: ['GET'])]
    public function getQuantityInicitiavesByYear($year): JsonResponse
    {
        $iniciatives = $this->indicatorService->indicativeCountByYear($year);
        return $this->json($iniciatives);
    }

    #[Route('/iniciatives/count', methods: ['GET'])]
    public function getNumberOfIniciatives(): JsonResponse
    {
        return $this->json(['count' => $this->indicatorService->numberOfIniciatives()]);
    }

    #[Route('/iniciatives/hours/by-degree-year', name: 'get_hours_by_degree_year', methods: ['GET'])]
    public function getHoursByDegreeAndYear(): JsonResponse
    {
        $data = $this->indicatorService->hoursByDegreeBySchoolYear();
        return $this->json($data);
    }

}
