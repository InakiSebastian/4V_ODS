<?php

namespace App\Controller;

use App\Model\NewIniciativeDTO;
use App\Service\IniciativeService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;

#[Route('/iniciatives', name: 'iniciatives_')]
class IniciativeController extends AbstractController
{
    public function __construct(private IniciativeService $iniciativeService) {}

    #[Route('/', name: 'get_all', methods: ['GET'])]
    public function getListIniciatives(): JsonResponse
    {
        $iniciatives = $this->iniciativeService->getAll();
        return $this->json($iniciatives, 200, [], ['groups' => 'iniciative:read']);
    }

    #[Route('/{id}', name: 'get_one', methods: ['GET'])]
    public function getIniciativeById(int $id): JsonResponse
    {
        $iniciative = $this->iniciativeService->getById($id);
        if (!$iniciative) {
            return $this->json(['message' => 'Iniciative not found'], 404);
        }
        return $this->json($iniciative, 200, [], ['groups' => 'iniciative:read']);
    }

    #[Route('/', name: 'create', methods: ['POST'])]
    public function create(#[MapRequestPayload] NewIniciativeDTO $newIniciativeDTO): JsonResponse
    {
        $iniciative = $this->iniciativeService->createIniciative($newIniciativeDTO);
        return $this->json($iniciative, 201, [], ['groups' => 'iniciative:read']);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(int $id, #[MapRequestPayload] NewIniciativeDTO $newIniciativeDTO): JsonResponse
    {
        $updatedIniciative = $this->iniciativeService->updateIniciative($id, $newIniciativeDTO);
        if (!$updatedIniciative) {
            return $this->json(['message' => 'Iniciative not found'], 404);
        }
        return $this->json($updatedIniciative, 200, [], ['groups' => 'iniciative:read']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $deleted = $this->iniciativeService->deleteIniciative($id);
        if (!$deleted) {
            return $this->json(['message' => 'Iniciative not found'], 404);
        }
        return $this->json(['message' => 'Iniciative deleted'], 200);
    }
}
