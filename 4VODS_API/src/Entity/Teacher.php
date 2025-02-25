<?php

namespace App\Entity;

use App\Repository\TeacherRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TeacherRepository::class)]
class Teacher
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, TeacherModule>
     */
    #[ORM\OneToMany(targetEntity: TeacherModule::class, mappedBy: 'idTeacher', orphanRemoval: true)]
    private Collection $teacherModules;

    /**
     * @var Collection<int, TeacherIniciative>
     */
    #[ORM\OneToMany(targetEntity: TeacherIniciative::class, mappedBy: 'idTeacher', orphanRemoval: true)]
    private Collection $teacherIniciatives;

    public function __construct()
    {
        $this->teacherModules = new ArrayCollection();
        $this->teacherIniciatives = new ArrayCollection();
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
            $teacherModule->setIdTeacher($this);
        }

        return $this;
    }

    public function removeTeacherModule(TeacherModule $teacherModule): static
    {
        if ($this->teacherModules->removeElement($teacherModule)) {
            // set the owning side to null (unless already changed)
            if ($teacherModule->getIdTeacher() === $this) {
                $teacherModule->setIdTeacher(null);
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
            $teacherIniciative->setIdTeacher($this);
        }

        return $this;
    }

    public function removeTeacherIniciative(TeacherIniciative $teacherIniciative): static
    {
        if ($this->teacherIniciatives->removeElement($teacherIniciative)) {
            // set the owning side to null (unless already changed)
            if ($teacherIniciative->getIdTeacher() === $this) {
                $teacherIniciative->setIdTeacher(null);
            }
        }

        return $this;
    }
}
