<?php

namespace App\Entity;

use App\Repository\TeacherModulesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TeacherModulesRepository::class)]
class TeacherModules
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * @var Collection<int, teacher>
     */
    #[ORM\ManyToMany(targetEntity: teacher::class, inversedBy: 'idTeacher')]
    private Collection $idTeacher;

    public function __construct()
    {
        $this->idTeacher = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, teacher>
     */
    public function getIdTeacher(): Collection
    {
        return $this->idTeacher;
    }

    public function addIdTeacher(teacher $idTeacher): static
    {
        if (!$this->idTeacher->contains($idTeacher)) {
            $this->idTeacher->add($idTeacher);
        }

        return $this;
    }

    public function removeIdTeacher(teacher $idTeacher): static
    {
        $this->idTeacher->removeElement($idTeacher);

        return $this;
    }
}
