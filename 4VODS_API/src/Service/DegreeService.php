<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Degree;
use App\Model\NewDegreeDTO;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class DegreeService
{

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function toDTO($degree): array
    {
        return [
            'id' => $degree->getId(),
            'name' => $degree->getName(),
        ];
    }
    public function getAllDegrees(): array
    {
        $degrees = $this->entityManager->getRepository(Degree::class)->findAll();
        $degreesDTO = [];
        foreach ($degrees as $degree) {
            $degreesDTO[] = $this->toDTO($degree);
        }
        return $degreesDTO;
    }

    public function getDegreeById($id){
    $degree = $this->entityManager->getRepository(Degree::class)->find($id);
    if (!$degree) {
        return null;
    }
    return $this->toDTO($degree);
    }

    public function createDegree(NewDegreeDTO $degree)
    {

        $existeDescripcionDegree = $this->entityManager->getRepository(Degree::class)->findOneBy(['name' => $degree->getName()]);
        if ($existeDescripcionDegree) {
            throw new BadRequestHttpException('Ya existe un ciclo con el mismo nombre');
        }
        $newDegree = new Degree();
        $newDegree->setName($degree->getName());
        $this->entityManager->persist($newDegree);
        $this->entityManager->flush();
        return $this->toDTO($newDegree);
    }

    public function updateDegree(int $id, NewDegreeDTO $degree)
    {
        $degreeEntity = $this->entityManager->getRepository(Degree::class)->find($id);
        if (!$degreeEntity) {
            throw new BadRequestHttpException('No se encontró el ciclo con el id ' . $id);
        }
        $existeDescripcionDegree = $this->entityManager->getRepository(Degree::class)->findOneBy(['name' => $degree->getName()]);
        if ($existeDescripcionDegree) {
            throw new BadRequestHttpException('Ya existe un ciclo con el mismo nombre');
        }
        $degreeEntity->setName($degree->getName());
        $this->entityManager->persist($degreeEntity);
        $this->entityManager->flush();
        return $this->toDTO($degreeEntity);
    }

    public function deleteDegree(int $id)
    {
        $degree = $this->entityManager->getRepository(Degree::class)->find($id);
        if (!$degree) {
            throw new BadRequestHttpException('No se encontró el ciclo con el id ' . $id);
            return false;
        }
        $this->entityManager->remove($degree);
        $this->entityManager->flush();
        return true;
    }



}
