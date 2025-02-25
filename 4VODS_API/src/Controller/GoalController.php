<?php

use App\Entity\Goal;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/goal', name: 'goal')]
class GoalController extends AbstractController
{
    public function __construct(private GoalService $goalService) {}

    #[Route('/', name: 'get_all', methods: ['GET'])]
    public function getListIniciatives(): JsonResponse
    {
        $iniciatives = $this->goalService->getAll();
        return $this->json($iniciatives, 200, [], ['groups' => 'iniciative:read']);
    }
}
