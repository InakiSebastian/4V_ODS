<?php

use App\Entity\Teacher;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/teacher', name: 'teacher')]
class TeacherController extends AbstractController
{
    public function __construct(private TeacherService $teacherService) {}

    #[Route('/', name: 'get_all', methods: ['GET'])]
    public function getListIniciatives(): JsonResponse
    {
        $iniciatives = $this->teacherService->getAll();
        return $this->json($iniciatives, 200, [], ['groups' => 'iniciative:read']);
    }
}