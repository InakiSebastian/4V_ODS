<?php

namespace App\Service;

use App\Entity\Goal;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Ods;
use App\Model\NewOdsDTO;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class OdsService
{

    public function __construct(private EntityManagerInterface $entityManager, private ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
    }
    public function toDTO($ods): array
    {
        return [
            'id' => $ods->getId(),
            'description' => $ods->getDescription(),
            'dimension' => $ods->getDimension(),
        ];
    }
    public function getAllOdss(): array
    {
        $odss = $this->entityManager->getRepository(Ods::class)->findAll();
        $odssDTO = [];
        foreach ($odss as $ods) {
            $odssDTO[] = $this->toDTO($ods);
        }
        return $odssDTO;
    }

    public function createODS(NewOdsDTO $dto)
    {

        $errors = $this->validator->validate($dto);

        if (count($errors) > 0) {
            throw new BadRequestHttpException(implode(', ', array_map(fn($e) => $e->getMessage(), iterator_to_array($errors))));
        }

        $existeODS = $this->entityManager->getRepository(Ods::class)->findOneBy(['description' => $dto->getDescription()]);

        if ($existeODS) {
            throw new BadRequestHttpException('Ya existe un ODS con el mismo nombre');
        }

        $newODS = new Ods();
        $newODS->setDescription($dto->getDescription());
        $newODS->setDimension($dto->getDimension());



        $this->entityManager->persist($newODS);
        $this->entityManager->flush();


        foreach ($dto->getGoals() as $goalDescription) {

            $goal = new Goal();
            $goal->setDescription($goalDescription);
            $goal->setIdOds($newODS);
            $this->entityManager->persist($goal);
        }

        $this->entityManager->flush();


        $companyDTO = $this->toDTO($newODS);

        return $companyDTO;
    }

    
}
