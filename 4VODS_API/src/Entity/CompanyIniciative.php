<?php

namespace App\Entity;

use App\Repository\CompanyIniciativeRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\Company;
use App\Entity\Iniciative;

#[ORM\Entity(repositoryClass: CompanyIniciativeRepository::class)]
class CompanyIniciative
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'companyIniciatives')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Iniciative $idIniciative = null;

    #[ORM\ManyToOne(inversedBy: 'companyIniciatives')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Company $idCompany = null;

    #[ORM\Column]
    private ?bool $_Active = True;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getIdCompany(): ?company
    {
        return $this->idCompany;
    }

    public function setIdCompany(?company $idCompany): static
    {
        $this->idCompany = $idCompany;

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
