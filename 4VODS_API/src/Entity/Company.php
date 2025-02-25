<?php

namespace App\Entity;

use App\Repository\CompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CompanyRepository::class)]
class Company
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, CompanyIniciative>
     */
    #[ORM\OneToMany(targetEntity: CompanyIniciative::class, mappedBy: 'idCompany', orphanRemoval: true)]
    private Collection $companyIniciatives;

    #[ORM\Column]
    private ?bool $_Active = True;

    public function __construct()
    {
        $this->companyIniciatives = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, CompanyIniciative>
     */
    public function getCompanyIniciatives(): Collection
    {
        return $this->companyIniciatives;
    }

    public function addCompanyIniciative(CompanyIniciative $companyIniciative): static
    {
        if (!$this->companyIniciatives->contains($companyIniciative)) {
            $this->companyIniciatives->add($companyIniciative);
            $companyIniciative->setIdCompany($this);
        }

        return $this;
    }

    public function removeCompanyIniciative(CompanyIniciative $companyIniciative): static
    {
        if ($this->companyIniciatives->removeElement($companyIniciative)) {
            // set the owning side to null (unless already changed)
            if ($companyIniciative->getIdCompany() === $this) {
                $companyIniciative->setIdCompany(null);
            }
        }

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
