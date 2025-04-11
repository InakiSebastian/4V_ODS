<?php

namespace App\Controller;

use App\Model\NewGoalDTO;
use App\Service\GoalService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;


#[Route('/goal', name: 'goal')]
class GoalController extends AbstractController
{
    public function __construct(private GoalService $goalService) {}

    #[Route('/', name: 'get_all', methods: ['GET'])]
    public function getListGoals(): JsonResponse
    {
        $goals = $this->goalService->getAllGoals();
        return $this->json($goals);
    }

    
    #[Route('', name: 'createGoal', methods: ['POST'])]
    public function createGoal(#[MapRequestPayload] NewGoalDTO $newGoal): JsonResponse
    {
        $company = $this->goalService->createGoal($newGoal);
        return $this->json($company);
    }
    #[Route('/{id}', name: 'updateGoal', methods: ['PUT'])]
    public function updateGoal(int $id,#[MapRequestPayload] NewGoalDTO $newGoal): JsonResponse
    {
        $company = $this->goalService->updateGoal($id,$newGoal);
        return $this->json($company);
    }

    #[Route('/{id}', name: 'deleteGoal', methods: ['DELETE'])]
    public function deleteGoal(int $id): JsonResponse
    {
        $deleted = $this->goalService->deleteGoal($id);
        if (!$deleted) {
            return $this->json(['message' => 'Goal not found'], 404);
        }
        return $this->json(['message' => 'Goal deleted'], 200);
    }

    #[Route('/{id}', name: 'get_goal', methods: ['GET'])]
    public function getGoal(int $id): JsonResponse
    {
        $goal = $this->goalService->getGoal($id);
        if (!$goal) {
            return $this->json(['message' => 'Goal not found'], 404);
        }
        return $this->json($goal);
    }

}
