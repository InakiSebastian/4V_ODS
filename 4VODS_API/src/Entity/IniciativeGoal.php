<?php

namespace App\Entity;

use App\Repository\IniciativeGoalRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: IniciativeGoalRepository::class)]
class IniciativeGoal
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'iniciativeGoals')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Iniciative $idIniciative = null;

    #[ORM\ManyToOne(inversedBy: 'iniciativeGoals')]
    private ?Goal $idGoal = null;

    #[ORM\Column]
    private ?bool $_Active = True;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdIniciative(): ?Iniciative
    {
        return $this->idIniciative;
    }

    public function setIdIniciative(?Iniciative $idIniciative): static
    {
        $this->idIniciative = $idIniciative;

        return $this;
    }

    public function getIdGoal(): ?Goal
    {
        return $this->idGoal;
    }

    public function setIdGoal(?Goal $idGoal): static
    {
        $this->idGoal = $idGoal;

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
