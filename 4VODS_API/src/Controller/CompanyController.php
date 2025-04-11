<?php

namespace App\Controller;

use App\Model\NewCompanyDTO;
use App\Service\CompanyService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;


#[Route('/company', name: 'company')]
class CompanyController extends AbstractController
{
    public function __construct(private CompanyService $companyService) {}

    #[Route('', name: 'get_all', methods: ['GET'])]
    public function getListCompanies(): JsonResponse
    {
        $companies = $this->companyService->getAllCompanies();
        return $this->json($companies);
    }

    #[Route('', name: 'createCompany', methods: ['POST'])]
    public function createCompany(#[MapRequestPayload] NewCompanyDTO $newCompany): JsonResponse
    {
        $company = $this->companyService->createCompany($newCompany);
        return $this->json($company);
    }

    #[Route('/{id}', name: 'updateCompany', methods: ['PUT'])]
    public function updateCompany(int $id,#[MapRequestPayload] NewCompanyDTO $newCompany): JsonResponse
    {
        $company = $this->companyService->updateCompany($id,$newCompany);
        return $this->json($company);
    }


    #[Route('/{id}', name: 'deleteCompany', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $deleted = $this->companyService->deleteCompany($id);
        if (!$deleted) {
            return $this->json(['message' => 'Company not found'], 404);
        }
        return $this->json(['message' => 'Company deleted'], 200);
    }

    #[Route('/{id}', name: 'get_company', methods: ['GET'])]
    public function getCompany(int $id): JsonResponse
    {
        $company = $this->companyService->getCompany($id);
        if (!$company) {
            return $this->json(['message' => 'Company not found'], 404);
        }
        return $this->json($company);
    }
}
