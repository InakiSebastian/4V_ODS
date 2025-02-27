<?php

namespace App\Entity;

use App\Repository\DiffusionRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Iniciative;

#[ORM\Entity(repositoryClass: DiffusionRepository::class)]
class Diffusion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $type = null;

    #[ORM\Column(length: 255)]
    private ?string $link = null;

    #[ORM\ManyToOne(inversedBy: 'diffusions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Iniciative $iniciative = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(string $link): static
    {
        $this->link = $link;

        return $this;
    }

    public function getIniciative(): ?iniciative
    {
        return $this->iniciative;
    }

    public function setIniciative(?iniciative $iniciative): static
    {
        $this->iniciative = $iniciative;

        return $this;
    }
}
