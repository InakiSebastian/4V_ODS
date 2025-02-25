<?php

namespace App\Entity;

use App\Repository\TeacherIniciativeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TeacherIniciativeRepository::class)]
class TeacherIniciative
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'teacherIniciatives')]
    #[ORM\JoinColumn(nullable: false)]
    private ?teacher $idTeacher = null;

    #[ORM\ManyToOne(inversedBy: 'teacherIniciatives')]
    #[ORM\JoinColumn(nullable: false)]
    private ?iniciative $idIniciative = null;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getIdIniciative(): ?iniciative
    {
        return $this->idIniciative;
    }

    public function setIdIniciative(?iniciative $idIniciative): static
    {
        $this->idIniciative = $idIniciative;

        return $this;
    }
}
