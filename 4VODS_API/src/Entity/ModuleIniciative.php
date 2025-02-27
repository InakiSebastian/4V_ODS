<?php

namespace App\Entity;

use App\Repository\ModuleIniciativeRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Module;
use App\Entity\Iniciative;

#[ORM\Entity(repositoryClass: ModuleIniciativeRepository::class)]
class ModuleIniciative
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'moduleIniciatives')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Module $idModule = null;

    #[ORM\ManyToOne(inversedBy: 'moduleIniciatives')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Iniciative $idIniciative = null;

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

    public function getIdIniciative(): ?iniciative
    {
        return $this->idIniciative;
    }

    public function setIdIniciative(?iniciative $idIniciative): static
    {
        $this->idIniciative = $idIniciative;

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
