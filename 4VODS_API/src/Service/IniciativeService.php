<?php

namespace App\Service;

use App\Model\NewIniciativeDTO;
use App\Entity\Iniciative;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class IniciativeService {

    public function __construct(private EntityManagerInterface $entityManager, private ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    public function getAllIniciatives(): array
    {
        return $this->entityManager->getRepository(Iniciative::class)->findAll();
    }
    
    public function getIniciative(int $id): ?Iniciative
    {
        return $this->entityManager->getRepository(Iniciative::class)->find($id);
    }

    public function createIniciative(NewIniciativeDTO $dto): ?Iniciative
    {
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            throw new BadRequestHttpException(implode(', ', $errorMessages));
        }

        if ($dto->getEndDate()){
            if ($dto->getEndDate() < $dto->getStartDate()) {
                throw new BadRequestHttpException('La fecha de fin debe ser posterior a la fecha de inicio.');
            }
        }

        if ($dto->getHours() <= 0) {
            throw new BadRequestHttpException('La duración de la iniciativa debe ser mayor a 0.');
        }

        $iniciative = new Iniciative();
        $iniciative->setName($dto->getNombre());
        $iniciative->setDescription($dto->getDescription());
        $iniciative->setStartDate($dto->getStartDate());
        $iniciative->setEndDate($dto->getEndDate());
        $iniciative->setHours($dto->getHours());

        foreach ($dto->getTeachers() as $teacher) {
            $iniciative->addTeacherIniciative($teacher);
        }
        foreach ($dto->getCompanies() as $company) {
            $iniciative->addCompanyIniciative($company);
        }
        foreach ($dto->getModules() as $module) {
            $iniciative->addModuleIniciative($module);
        }
        foreach ($dto->getGoals() as $goal) {
            $iniciative->addIniciativeGoal($goal);
        }

        $this->entityManager->persist($iniciative);
        $this->entityManager->flush();

        return $iniciative;
    }

    public function updateIniciative(int $id, NewIniciativeDTO $dto): Iniciative
    {
        $iniciative = $this->entityManager->getRepository(Iniciative::class)->find($id);
        if (!$iniciative) {
            throw new NotFoundHttpException("No se encontró la iniciativa con ID $id.");
        }

        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            throw new BadRequestHttpException(implode(', ', $errorMessages));
        }

        if ($dto->getEndDate()){
            if ($dto->getEndDate() < $dto->getStartDate()) {
                throw new BadRequestHttpException('La fecha de fin debe ser posterior a la fecha de inicio.');
            }
        }

        if ($dto->getHours() <= 0) {
            throw new BadRequestHttpException('La duración de la iniciativa debe ser mayor a 0.');
        }

        $iniciative->setNombre($dto->getNombre());
        $iniciative->setDescription($dto->getDescription());
        $iniciative->setStartDate($dto->getStartDate());
        if ($dto->getEndDate()){
            $iniciative->setEndDate($dto->getEndDate());
        }
        $iniciative->setHours($dto->getHours());

        $iniciative->clearTeachers();
        foreach ($dto->getTeachers() as $teacher) {
            $iniciative->addTeacher($teacher);
        }

        $iniciative->clearCompanies();
        foreach ($dto->getCompanies() as $company) {
            $iniciative->addCompany($company);
        }

        $iniciative->clearModules();
        foreach ($dto->getModules() as $module) {
            $iniciative->addModule($module);
        }

        $iniciative->clearGoals();
        foreach ($dto->getGoals() as $goal) {
            $iniciative->addGoal($goal);
        }

        $this->entityManager->persist($iniciative);
        $this->entityManager->flush();

        return $iniciative;
    }

    public function deleteIniciative(int $id): void
    {
        $iniciative = $this->entityManager->getRepository(Iniciative::class)->find($id);

        if (!$iniciative) {
            throw new NotFoundHttpException("No se encontró la iniciativa con ID $id.");
        }

        $this->entityManager->remove($iniciative);
        $this->entityManager->flush();
    }
}