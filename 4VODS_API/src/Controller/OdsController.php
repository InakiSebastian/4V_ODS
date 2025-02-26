<?php

namespace App\Controller;

use App\Service\OdsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/ods', name: 'ods')]
class OdsController extends AbstractController
{
    public function __construct(private OdsService $odsService) {}

    #[Route('/', name: 'get_all', methods: ['GET'])]
    public function getListOdss(): JsonResponse
    {
        $odss = $this->odsService->getAllOdss();
        return $this->json($odss);
    }
}