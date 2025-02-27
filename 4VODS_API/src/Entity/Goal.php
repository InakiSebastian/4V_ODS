<?php

namespace App\Entity;

use App\Repository\GoalRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GoalRepository::class)]
class Goal
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'goals')]
    private ?ods $idOds = null;

    /**
     * @var Collection<int, IniciativeGoal>
     */
    #[ORM\OneToMany(targetEntity: IniciativeGoal::class, mappedBy: 'idGoal')]
    private Collection $iniciativeGoals;

    #[ORM\Column]
    private ?bool $_Active = True;

    public function __construct()
    {
        $this->iniciativeGoals = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getIdOds(): ?ods
    {
        return $this->idOds;
    }

    public function setIdOds(?ods $idOds): static
    {
        $this->idOds = $idOds;

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
            $iniciativeGoal->setIdGoal($this);
        }

        return $this;
    }

    public function removeIniciativeGoal(IniciativeGoal $iniciativeGoal): static
    {
        if ($this->iniciativeGoals->removeElement($iniciativeGoal)) {
            // set the owning side to null (unless already changed)
            if ($iniciativeGoal->getIdGoal() === $this) {
                $iniciativeGoal->setIdGoal(null);
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
