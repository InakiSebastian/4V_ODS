<?php

namespace App\Controller;

use App\Entity\Goal;
use App\Entity\Ods;
use App\Entity\Meta;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\OdsService;
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
        $iniciatives = $this->odsService->getAllOdss();
        return $this->json($iniciatives);
    }
}