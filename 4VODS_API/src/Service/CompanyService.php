<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Company;

class CompanyService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function toDTO($company): array
    {
        return [
            'id' => $company->getId(),
            'name' => $company->getName(),
        ];
    }
    public function getAllCompanies(): array
    {

        $companies = $this->entityManager->getRepository(Company::class)->findAll();
        $companiesDTO = [];
        foreach ($companies as $company) {
            $companiesDTO[] = $this->toDTO($company);
        }
        return $companiesDTO;
    }

}