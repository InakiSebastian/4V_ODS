<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Company;
use App\Model\NewCompanyDTO;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CompanyService
{

    public function __construct(private EntityManagerInterface $entityManager, private ValidatorInterface $validator, private LoggerInterface $logger)
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

    public function createCompany(NewCompanyDTO $dto)
    {

        $errors = $this->validator->validate($dto);
        $this->logger->info(sprintf("%s", $dto));
        if (count($errors) > 0) {
            throw new BadRequestHttpException(implode(', ', array_map(fn($e) => $e->getMessage(), iterator_to_array($errors))));
        }

        $existeCompany = $this->entityManager->getRepository(Company::class)->findOneBy(['name' => $dto->getName()]);

        if ($existeCompany) {
            throw new BadRequestHttpException('Ya existe una compañia con el mismo nombre');
        }

        $newCompany = new Company();
        $newCompany->setName($dto->getName());

        $this->entityManager->persist($newCompany);
        $this->entityManager->flush();

        $companyDTO = $this->toDTO($newCompany);

        return $companyDTO;
    }


    public function updateCompany(int $id, NewCompanyDTO $dto)
    {
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            throw new BadRequestHttpException(implode(', ', array_map(fn($e) => $e->getMessage(), iterator_to_array($errors))));
        }

        $company = $this->entityManager->getRepository(Company::class)->find($id);

        if (!$company) {
            throw new BadRequestHttpException('No se ha encontrado la compañia');
        }

        $existeCompany = $this->entityManager->getRepository(Company::class)->findOneBy(['name' => $dto->getName()]);

        if ($existeCompany && $existeCompany->getId() !== $company->getId()) {
            throw new BadRequestHttpException('Ya existe una compañia con el mismo nombre');
        }

        $company->setName($dto->getName());
        $this->entityManager->persist($company);
        $this->entityManager->flush();

        $companyDTO = $this->toDTO($company);
        return $companyDTO;
    }


    public function deleteCompany(int $id)
    {
        $company = $this->entityManager->getRepository(Company::class)->find($id);

        if (!$company) {
            return false;
        }

        $this->entityManager->remove($company);
        $this->entityManager->flush();

        return true;
    }

}
