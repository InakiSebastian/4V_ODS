<?php

namespace App\Controller;

use App\Entity\Goal;
use App\Entity\Ods;
use App\Entity\Meta;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/ods', name: 'ods')]
class OdsController extends AbstractController
{
    public function __construct(private OdsService $odsService) {}

    #[Route('/', name: 'get_all', methods: ['GET'])]
    public function getListIniciatives(): JsonResponse
    {
        $iniciatives = $this->odsService->getAll();
        return $this->json($iniciatives, 200, [], ['groups' => 'iniciative:read']);
    }
}