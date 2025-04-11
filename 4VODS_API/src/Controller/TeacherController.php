<?php

namespace App\Controller;

use App\Model\NewTeacherDTO;
use App\Service\TeacherService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;

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

    #[Route('', name: 'createTeacher', methods: ['POST'])]
    public function createTeacher(#[MapRequestPayload] NewTeacherDTO $newTeacher): JsonResponse
    {
        $teacher = $this->teacherService->createTeacher($newTeacher);
        return $this->json($teacher);
    }

    #[Route('/{id}', name: 'updateTeacher', methods: ['PUT'])]
    public function updateTeacher(int $id, #[MapRequestPayload] NewTeacherDTO $newTeacher): JsonResponse
    {
        $teacher = $this->teacherService->updateTeacher($id, $newTeacher);
        return $this->json($teacher);
    }

    #[Route('/{id}', name: 'deleteTeacher', methods: ['DELETE'])]
    public function deleteTeacher(int $id): JsonResponse
    {
        $deleted = $this->teacherService->deleteTeacher($id);
        if (!$deleted) {
            return $this->json(['message' => 'Teacher not found'], 404);
        }
        return $this->json(['message' => 'Teacher deleted'], 200);
    }

    #[Route('/{id}', name: 'getTeacherById', methods: ['GET'])]
    public function getTeacherById(int $id): JsonResponse
    {
        $teacher = $this->teacherService->getTeacherById($id);
        if (!$teacher) {
            return $this->json(['message' => 'Teacher not found'], 404);
        }
        return $this->json($teacher);
    }



    


}