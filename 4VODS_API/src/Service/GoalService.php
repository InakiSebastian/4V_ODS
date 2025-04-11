<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Goal;
use App\Entity\Ods;
use App\Model\NewGoalDTO;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class GoalService
{

    public function __construct(private EntityManagerInterface $entityManager, private ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
    }
    public function toDTO($goal): array
    {
        return [
            'id' => $goal->getId(),
            'description' => $goal->getDescription(),
            'ods' => $goal->getIdOds()->getId(),
        ];
    }
    public function getAllGoals(): array
    {
        $goals = $this->entityManager->getRepository(Goal::class)->findAll();
        $goalsDTO = [];
        foreach ($goals as $goal) {
            $goalsDTO[] = $this->toDTO($goal);
        }
        return $goalsDTO;
    }

    public function createGoal(NewGoalDTO $dto)
    {

        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            throw new BadRequestHttpException(implode(', ', array_map(fn($e) => $e->getMessage(), iterator_to_array($errors))));
        }

        $existeDescripcionGoal = $this->entityManager->getRepository(Ods::class)->findOneBy(['description' => $dto->getDescription()]);

        if ($existeDescripcionGoal) {
            throw new BadRequestHttpException('Ya existe una meta con el mismo nombre');
        }

        $newGoal = new Goal();
        $newGoal->setDescription($dto->getDescription());
        $newGoal->setIdOds($this->entityManager->getRepository(Ods::class)->find($dto->getIdOds()));

        $this->entityManager->persist($newGoal);
        $this->entityManager->flush();

        $companyDTO = $this->toDTO($newGoal);

        return $companyDTO;
    }

    public function updateGoal(int $id, NewGoalDTO $dto)
    {
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            throw new BadRequestHttpException(implode(', ', array_map(fn($e) => $e->getMessage(), iterator_to_array($errors))));
        }

        $goal = $this->entityManager->getRepository(Goal::class)->find($id);

        if (!$goal) {
            throw new BadRequestHttpException('No existe una meta con ese id');
        }

        $goal->setDescription($dto->getDescription());
        $goal->setIdOds($this->entityManager->getRepository(Ods::class)->find($dto->getIdOds()));

        $this->entityManager->persist($goal);
        $this->entityManager->flush();

        return $this->toDTO($goal);
    }
    public function deleteGoal(int $id)
    {
        $goal = $this->entityManager->getRepository(Goal::class)->find($id);

        if (!$goal) {
            throw new BadRequestHttpException('No existe una meta con ese id');
            return false;
        }

        $this->entityManager->remove($goal);
        $this->entityManager->flush();

        return true;
    }

    public function getGoal(int $id)
    {
        $goal = $this->entityManager->getRepository(Goal::class)->find($id);

        if (!$goal) {
            return null;
        }

        return $this->toDTO($goal);
    }
}
