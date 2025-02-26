<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
class CompanyService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getAllComanies(): array
    {
        return $this->entityManager->getRepository(Company::class)->findAll();
    }

}