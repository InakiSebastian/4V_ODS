<?php

namespace App\Entity;

use App\Repository\IniciativeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: IniciativeRepository::class)]
class Iniciative
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $startDay = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $endDate = null;

    #[ORM\Column]
    private ?int $hours = null;

    /**
     * @var Collection<int, IniciativeGoal>
     */
    #[ORM\OneToMany(targetEntity: IniciativeGoal::class, mappedBy: 'idIniciative', orphanRemoval: true)]
    private Collection $iniciativeGoals;

    /**
     * @var Collection<int, TeacherIniciative>
     */
    #[ORM\OneToMany(targetEntity: TeacherIniciative::class, mappedBy: 'idIniciative', orphanRemoval: true)]
    private Collection $teacherIniciatives;

    /**
     * @var Collection<int, CompanyIniciative>
     */
    #[ORM\OneToMany(targetEntity: CompanyIniciative::class, mappedBy: 'idIniciative', orphanRemoval: true)]
    private Collection $companyIniciatives;

    /**
     * @var Collection<int, ModuleIniciative>
     */
    #[ORM\OneToMany(targetEntity: ModuleIniciative::class, mappedBy: 'idIniciative', orphanRemoval: true)]
    private Collection $moduleIniciatives;

    public function __construct()
    {
        $this->iniciativeGoals = new ArrayCollection();
        $this->teacherIniciatives = new ArrayCollection();
        $this->companyIniciatives = new ArrayCollection();
        $this->moduleIniciatives = new ArrayCollection();
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getStartDay(): ?\DateTimeInterface
    {
        return $this->startDay;
    }

    public function setStartDay(\DateTimeInterface $startDay): static
    {
        $this->startDay = $startDay;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): static
    {
        $this->endDate = $endDate;

        return $this;
    }

    public function getHours(): ?int
    {
        return $this->hours;
    }

    public function setHours(int $hours): static
    {
        $this->hours = $hours;

        return $this;
    }

    /**
     * @return Collection<int, IniciativeGoal>
     */
    public function getIniciativeGoals(): Collection
    {
        return $this->iniciativeGoals;
    }

    public function addIniciativeGoal(IniciativeGoal $iniciativeGoal): static
    {
        if (!$this->iniciativeGoals->contains($iniciativeGoal)) {
            $this->iniciativeGoals->add($iniciativeGoal);
            $iniciativeGoal->setIdIniciative($this);
        }

        return $this;
    }

    public function removeIniciativeGoal(IniciativeGoal $iniciativeGoal): static
    {
        if ($this->iniciativeGoals->removeElement($iniciativeGoal)) {
            // set the owning side to null (unless already changed)
            if ($iniciativeGoal->getIdIniciative() === $this) {
                $iniciativeGoal->setIdIniciative(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, TeacherIniciative>
     */
    public function getTeacherIniciatives(): Collection
    {
        return $this->teacherIniciatives;
    }

    public function addTeacherIniciative(TeacherIniciative $teacherIniciative): static
    {
        if (!$this->teacherIniciatives->contains($teacherIniciative)) {
            $this->teacherIniciatives->add($teacherIniciative);
            $teacherIniciative->setIdIniciative($this);
        }

        return $this;
    }

    public function removeTeacherIniciative(TeacherIniciative $teacherIniciative): static
    {
        if ($this->teacherIniciatives->removeElement($teacherIniciative)) {
            // set the owning side to null (unless already changed)
            if ($teacherIniciative->getIdIniciative() === $this) {
                $teacherIniciative->setIdIniciative(null);
            }
        }

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
            $companyIniciative->setIdIniciative($this);
        }

        return $this;
    }

    public function removeCompanyIniciative(CompanyIniciative $companyIniciative): static
    {
        if ($this->companyIniciatives->removeElement($companyIniciative)) {
            // set the owning side to null (unless already changed)
            if ($companyIniciative->getIdIniciative() === $this) {
                $companyIniciative->setIdIniciative(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, ModuleIniciative>
     */
    public function getModuleIniciatives(): Collection
    {
        return $this->moduleIniciatives;
    }

    public function addModuleIniciative(ModuleIniciative $moduleIniciative): static
    {
        if (!$this->moduleIniciatives->contains($moduleIniciative)) {
            $this->moduleIniciatives->add($moduleIniciative);
            $moduleIniciative->setIdIniciative($this);
        }

        return $this;
    }

    public function removeModuleIniciative(ModuleIniciative $moduleIniciative): static
    {
        if ($this->moduleIniciatives->removeElement($moduleIniciative)) {
            // set the owning side to null (unless already changed)
            if ($moduleIniciative->getIdIniciative() === $this) {
                $moduleIniciative->setIdIniciative(null);
            }
        }

        return $this;
    }
}
