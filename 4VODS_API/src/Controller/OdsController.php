<?php

namespace App\Controller;

use App\Model\NewOdsDTO;
use App\Service\OdsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;


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


    #[Route('/', name: 'createOds', methods: ['POST'])]
    public function createCompany(#[MapRequestPayload] NewOdsDTO $newOds): JsonResponse
    {
        $company = $this->odsService->createODS($newOds);
        return $this->json($company);
    }

}