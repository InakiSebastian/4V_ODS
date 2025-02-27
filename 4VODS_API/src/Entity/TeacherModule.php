<?php

namespace App\Entity;

use App\Repository\TeacherModuleRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TeacherModuleRepository::class)]
class TeacherModule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'teacherModules')]
    #[ORM\JoinColumn(nullable: false)]
    private ?module $idModule = null;

    #[ORM\ManyToOne(inversedBy: 'teacherModules')]
    #[ORM\JoinColumn(nullable: false)]
    private ?teacher $idTeacher = null;

    #[ORM\Column]
    private ?bool $_Active = True;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdModule(): ?module
    {
        return $this->idModule;
    }

    public function setIdModule(?module $idModule): static
    {
        $this->idModule = $idModule;

        return $this;
    }

    public function getIdTeacher(): ?teacher
    {
        return $this->idTeacher;
    }

    public function setIdTeacher(?teacher $idTeacher): static
    {
        $this->idTeacher = $idTeacher;

        return $this;
    }

    public function isActive(): ?bool
    {
        return $this->_Active;
    }

    public function setActive(bool $_Active): static
    {
        $this->_Active = $_Active;

        return $this;
    }
}
