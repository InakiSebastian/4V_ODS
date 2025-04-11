<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Diffusion;
use App\Entity\Iniciative;
use App\Model\NewDiffusionDTO;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class DiffusionService
{

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    public function toDTO($diffusion): array
    {
        return [
            'id' => $diffusion->getId(),
            'type' => $diffusion->getType(),
            'link' => $diffusion->getLink(),
            'iniciative' =>  $diffusion->getIniciative()->getId(),
        ];
    }
    public function getAllDiffusions(): array
    {
        $diffusions = $this->entityManager->getRepository(Diffusion::class)->findAll();
        $diffusionsDTO = [];
        foreach ($diffusions as $diffusion) {
            $diffusionsDTO[] = $this->toDTO($diffusion);
        }
        return $diffusionsDTO;
    }

    public function createDiffusion(NewDiffusionDTO $newDiffusion)
    {
        $existeDescripcionDiffusion = $this->entityManager->getRepository(Diffusion::class)->findOneBy(['type' => $newDiffusion->getType()]);
        if ($existeDescripcionDiffusion) {
            throw new BadRequestHttpException('Ya existe una difusión con el mismo nombre');
        }

        $iniciative = $this->entityManager->getRepository(Iniciative::class)->find($newDiffusion->getIniciative());

        if (!$iniciative) {
            throw new BadRequestHttpException('No se encontró la iniciativa con el id ' . $newDiffusion->getIniciative());
        }


        $newDiffusionEntity = new Diffusion();
        $newDiffusionEntity->setType($newDiffusion->getType());
        $newDiffusionEntity->setLink($newDiffusion->getLink());
        $newDiffusionEntity->setIniciative($iniciative);
        $this->entityManager->persist($newDiffusionEntity);
        $this->entityManager->flush();
        return $this->toDTO($newDiffusionEntity);
    }

    public function updateDiffusion(int $id, NewDiffusionDTO $newDiffusion)
    {
        $diffusion = $this->entityManager->getRepository(Diffusion::class)->find($id);
        if (!$diffusion) {
            throw new BadRequestHttpException('No se encontró la difusión con el id ' . $id);
        }
        $existeDescripcionDiffusion = $this->entityManager->getRepository(Diffusion::class)->findOneBy(['type' => $newDiffusion->getType()]);
        if ($existeDescripcionDiffusion) {
            throw new BadRequestHttpException('Ya existe una difusión con el mismo nombre');
        }
        $iniciative = $this->entityManager->getRepository(Iniciative::class)->find($newDiffusion->getIniciative());
        if (!$iniciative) {
            throw new BadRequestHttpException('No se encontró la iniciativa con el id ' . $newDiffusion->getIniciative());
        }
        $diffusion->setType($newDiffusion->getType());
        $diffusion->setLink($newDiffusion->getLink());
        $diffusion->setIniciative($iniciative);

        $this->entityManager->persist($diffusion);
        $this->entityManager->flush();
        return $this->toDTO($diffusion);
    }

    public function deleteDiffusion(int $id)
    {
        $diffusion = $this->entityManager->getRepository(Diffusion::class)->find($id);
        if (!$diffusion) {
            throw new BadRequestHttpException('No se encontró la difusión con el id ' . $id);
        }
        $this->entityManager->remove($diffusion);
        $this->entityManager->flush();
    }

    public function getDiffusionById(int $id): ?array
    {
        $diffusion = $this->entityManager->getRepository(Diffusion::class)->find($id);
        if (!$diffusion) {
            return null;
        }
        return $this->toDTO($diffusion);
    }
}
