<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Company;

class CompanyService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getAllCompanies(): array
    {
        return $this->entityManager->getRepository(Company::class)->findAll();
    }

}