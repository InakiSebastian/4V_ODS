<?php

use App\Entity\Module;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\ModuleService;
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
        $iniciatives = $this->moduleService->getAllModules();
        return $this->json($iniciatives);
    }
}