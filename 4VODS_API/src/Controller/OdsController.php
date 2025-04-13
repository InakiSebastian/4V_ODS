<?php

namespace App\Controller;

use App\Model\NewOdsDTO;
use App\Model\UpdateOds;
use App\Service\OdsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;


#[Route('/ods', name: 'ods')]
class OdsController extends AbstractController
{
    public function __construct(private OdsService $odsService) {}

    #[Route('/ods', name: 'get_all', methods: ['GET'])]
    public function getListOdss(): JsonResponse
    {
        $odss = $this->odsService->getAllOdss();
        return $this->json($odss);
    }

    #[Route('/{id}', name: 'get_ods', methods: ['GET'])]
    public function getOds(int $id): JsonResponse
    {
        $ods = $this->odsService->getOds($id);
        if (!$ods) {
            return $this->json(['message' => 'ODS not found'], 404);
        }
        return $this->json($ods);
    }


    #[Route('', name: 'createOds', methods: ['POST'])]
    public function createCompany(#[MapRequestPayload] NewOdsDTO $newOds): JsonResponse
    {
        $company = $this->odsService->createODS($newOds);
        return $this->json($company);
    }

    #[Route('/{id}', name: 'updateOds', methods: ['PUT'])]
    public function updateOds(int $id,#[MapRequestPayload] UpdateOds $newOds): JsonResponse
    {
        $company = $this->odsService->updateOds($id,$newOds);

        return $this->json($company);
    }


    #[Route('/{id}', name: 'deleteOds', methods: ['DELETE'])]
    public function deleteOds(int $id): JsonResponse
    {
        $deleted = $this->odsService->deleteOds($id);
        if (!$deleted) {
            return $this->json(['message' => 'ODS not found'], 404);
        }
        return $this->json(['message' => 'ODS deleted'], 200);
    }

}