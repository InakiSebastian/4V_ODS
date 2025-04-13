<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;
use DateTime;

class NewIniciativeDTO
{
    public function __construct(

        #[Assert\NotBlank(message: "El nombre de la iniciativa es obligatorio")]
        private string $name,

        #[Assert\NotBlank(message: "La descripción de la iniciativa es obligatoria")]
        private string $description,

        #[Assert\NotBlank(message: "La fecha inicial de la iniciativa es obligatoria")]
        private DateTime $startDate,

        private ?DateTime $endDate,

        #[Assert\NotBlank(message: "La duración de la iniciativa es obligatoria")]
        private float $hours,

        #[Assert\NotBlank(message: "El curso escolar de la iniciativa es obligatorio")]
        private string $schoolYear,

        #[Assert\NotBlank(message: "La lista de ods de la iniciativa es obligatoria")]
        private array $ods = [],

        #[Assert\NotBlank(message: "El tipo de la iniciativa es obligatorio")]
        private string $type,

        #[Assert\NotBlank(message: "La innovación de la iniciativa es obligatoria")]
        private int $innovative,

        #[Assert\NotBlank(message: "La lista de profesores de la iniciativa es obligatoria")]
        private array $teachers = [],

      
        #[Assert\All([new Assert\Type('integer')])]
        private array $modules = [],

        #[Assert\NotBlank(message: "La lista de metas de la iniciativa es obligatoria")]
        private array $goals = [],

        #[Assert\NotBlank(message: "La lista de entidades externas de la iniciativa es obligatoria")]
        private array $companies = [],
        
        #[Assert\NotBlank(message: "La lista de difusiones de la iniciativa es obligatoria")]
        private array $diffusions = [],

    ) {}

    public function getDiffusions(): array
    {
        return $this->diffusions;
    }

    public function setDiffusions(array $diffusions): void
    {
        $this->diffusions = $diffusions;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getStartDate(): DateTime
    {
        return $this->startDate;
    }

    public function setStartDate(DateTime $startDate): void
    {
        $this->startDate = $startDate;
    }

    public function getEndDate(): ?DateTime
    {
        return $this->endDate;
    }

    public function setEndDate(?DateTime $endDate): void
    {
        $this->endDate = $endDate;
    }

    public function getHours(): float
    {
        return $this->hours;
    }

    public function setHours(float $hours): void
    {
        $this->hours = $hours;
    }

    public function getSchoolYear(): string
    {
        return $this->schoolYear;
    }

    public function setSchoolYear(string $schoolYear): void
    {
        $this->schoolYear = $schoolYear;
    }

    public function getOds(): array
    {
        return $this->ods;
    }

    public function setOds(array $ods): void
    {
        $this->ods = $ods;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }

    public function getInnovative(): int
    {
        return $this->innovative;
    }

    public function setInnovative(int $innovative): void
    {
        $this->innovative = $innovative;
    }

    public function getTeachers(): array
    {
        return $this->teachers;
    }

    public function setTeachers(array $teachers): void
    {
        $this->teachers = $teachers;
    }

    public function getModules(): array
    {
        return $this->modules;
    }

    public function setModules(array $modules): void
    {
        $this->modules = $modules;
    }

    public function getGoals(): array
    {
        return $this->goals;
    }

    public function setGoals(array $goals): void
    {
        $this->goals = $goals;
    }

    public function getCompanies(): array
    {
        return $this->companies;
    }

    public function setCompanies(array $companies): void
    {
        $this->companies = $companies;
    }
}
