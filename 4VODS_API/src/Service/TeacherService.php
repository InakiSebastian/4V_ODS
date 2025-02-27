<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Teacher;

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

}