<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;
use DateTime;

class NewIniciativeDTO
{
    public function __construct (

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

        #[Assert\NotBlank(message: "La innovación de la iniciativa es obligatoria")]
        #[Assert\Type('integer')]
        private int $innovative,

        #[Assert\NotBlank(message: "El tipo de la iniciativa es obligatorio")]
        private string $type,

        #[Assert\NotBlank(message: "La lista de profesores de la iniciativa es obligatoria")]
        #[Assert\All([new Assert\Type('integer')])]
        private array $teachers = [],

        #[Assert\NotBlank(message: "La lista de entidades externas de la iniciativa es obligatoria")]
        #[Assert\All([new Assert\Type('integer')])]
        private array $companies = [],

        #[Assert\All([new Assert\Type('integer')])]
        private array $modules = [],

        #[Assert\NotBlank(message: "La lista de metas de la iniciativa es obligatoria")]
        #[Assert\All([new Assert\Type('integer')])]
        private array $goals = []
    ){}

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getStartDate(): DateTime
    {
        return $this->startDate;
    }

    public function getEndDate(): ?DateTime
    {
        return $this->endDate;
    }

    public function getHours(): float
    {
        return $this->hours;
    }

    public function getSchoolYear(): string
    {
        return $this->schoolYear;
    }

    public function getInnovative(): int
    {
        return $this->innovative;
    }

    public function getType(): string
    {
        return $this->type;
    }

    /** @return int[] */
    public function getTeachers(): array
    {
        return $this->teachers;
    }

    /** @return int[] */
    public function getCompanies(): array
    {
        return $this->companies;
    }

    /** @return int[] */
    public function getModules(): array
    {
        return $this->modules;
    }

    /** @return int[] */
    public function getGoals(): array
    {
        return $this->goals;
    }

}
