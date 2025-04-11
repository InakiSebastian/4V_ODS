<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Teacher;
use App\Model\NewTeacherDTO;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class TeacherService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function toDTO($teacher): array
    {
        return [
            'id' => $teacher->getId(),
            'name' => $teacher->getName(),
        ];
    }
    public function getAllTeachers(): array
    {
        $teachers = $this->entityManager->getRepository(Teacher::class)->findAll();
        $teachersDTO = [];
        foreach ($teachers as $teacher) {
            $teachersDTO[] = $this->toDTO($teacher);
        }
        return $teachersDTO;
    }

    public function createTeacher(NewTeacherDTO $dto)
    {
        $existeDescripcionTeacher = $this->entityManager->getRepository(Teacher::class)->findOneBy(['name' => $dto->getName()]);

        if ($existeDescripcionTeacher) {
            throw new BadRequestHttpException('Ya existe un profesor con el mismo nombre');
        }
        $newTeacher = new Teacher();
        $newTeacher->setName($dto->getName());

        $this->entityManager->persist($newTeacher);
        $this->entityManager->flush();

        $teacherDTO = $this->toDTO($newTeacher);

        return $teacherDTO;
    }

    public function updateTeacher(int $id, NewTeacherDTO $newTeacher)
    {
      
        $teacher = $this->entityManager->getRepository(Teacher::class)->find($id);
        if (!$teacher) {
            throw new BadRequestHttpException('No se encontró el profesor con el id ' . $id);
        }
        $existeDescripcionTeacher = $this->entityManager->getRepository(Teacher::class)->findOneBy(['name' => $newTeacher->getName()]);

        if ($existeDescripcionTeacher) {
            throw new BadRequestHttpException('Ya existe un profesor con el mismo nombre');
        }

        $teacher->setName($newTeacher->getName());
        $this->entityManager->flush();

        return $this->toDTO($teacher);
    }
    public function deleteTeacher(int $id)
    {
        $teacher = $this->entityManager->getRepository(Teacher::class)->find($id);
        if (!$teacher) {
            return false;
        }
        $this->entityManager->remove($teacher);
        $this->entityManager->flush();

        return true;
    }

    public function getTeacherById(int $id)
    {
        $teacher = $this->entityManager->getRepository(Teacher::class)->find($id);
        if (!$teacher) {
            return null;
        }
        return $this->toDTO($teacher);
    }

}