<?php

namespace App\Controller;

use App\Service\CompanyService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/company', name: 'company')]
class CompanyController extends AbstractController
{
    public function __construct(private CompanyService $companyService) {}

    #[Route('/', name: 'get_all', methods: ['GET'])]
    public function getListCompanies(): JsonResponse
    {
        $companies = $this->companyService->getAllCompanies();
        return $this->json($companies);
    }
}