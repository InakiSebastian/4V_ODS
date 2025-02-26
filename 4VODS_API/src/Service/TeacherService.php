<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Teacher;

class TeacherService {

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getAllTeachers(): array
    {
        return $this->entityManager->getRepository(Teacher::class)->findAll();
    }

}