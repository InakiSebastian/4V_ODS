<?php

namespace App\Controller;

use App\Service\TeacherService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/teacher', name: 'teacher')]
class TeacherController extends AbstractController
{
    public function __construct(private TeacherService $teacherService) {}

    #[Route('/', name: 'get_all', methods: ['GET'])]
    public function getListTeachers(): JsonResponse
    {
        $teachers = $this->teacherService->getAllTeachers();
        return $this->json($teachers);
    }
}