<?php

use App\Entity\Module;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/module', name: 'module')]
class ModuleController extends AbstractController
{
    public function __construct(private ModuleService $moduleService) {}

    #[Route('/', name: 'get_all', methods: ['GET'])]
    public function getListIniciatives(): JsonResponse
    {
        $iniciatives = $this->moduleService->getAll();
        return $this->json($iniciatives, 200, [], ['groups' => 'iniciative:read']);
    }
}