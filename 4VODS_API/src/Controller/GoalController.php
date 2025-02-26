<?php

use App\Entity\Goal;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\GoalService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

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
}
