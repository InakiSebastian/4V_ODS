<?php

namespace App\Entity;

use App\Repository\ModuleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ModuleRepository::class)]
class Module
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'modules')]
    #[ORM\JoinColumn(nullable: false)]
    private ?degree $idDegree = null;

    /**
     * @var Collection<int, TeacherModule>
     */
    #[ORM\OneToMany(targetEntity: TeacherModule::class, mappedBy: 'idModule', orphanRemoval: true)]
    private Collection $teacherModules;

    /**
     * @var Collection<int, ModuleIniciative>
     */
    #[ORM\OneToMany(targetEntity: ModuleIniciative::class, mappedBy: 'idModule', orphanRemoval: true)]
    private Collection $moduleIniciatives;

    public function __construct()
    {
        $this->teacherModules = new ArrayCollection();
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

    public function getIdDegree(): ?degree
    {
        return $this->idDegree;
    }

    public function setIdDegree(?degree $idDegree): static
    {
        $this->idDegree = $idDegree;

        return $this;
    }

    /**
     * @return Collection<int, TeacherModule>
     */
    public function getTeacherModules(): Collection
    {
        return $this->teacherModules;
    }

    public function addTeacherModule(TeacherModule $teacherModule): static
    {
        if (!$this->teacherModules->contains($teacherModule)) {
            $this->teacherModules->add($teacherModule);
            $teacherModule->setIdModule($this);
        }

        return $this;
    }

    public function removeTeacherModule(TeacherModule $teacherModule): static
    {
        if ($this->teacherModules->removeElement($teacherModule)) {
            // set the owning side to null (unless already changed)
            if ($teacherModule->getIdModule() === $this) {
                $teacherModule->setIdModule(null);
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
            $moduleIniciative->setIdModule($this);
        }

        return $this;
    }

    public function removeModuleIniciative(ModuleIniciative $moduleIniciative): static
    {
        if ($this->moduleIniciatives->removeElement($moduleIniciative)) {
            // set the owning side to null (unless already changed)
            if ($moduleIniciative->getIdModule() === $this) {
                $moduleIniciative->setIdModule(null);
            }
        }

        return $this;
    }
}
