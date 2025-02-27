<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;
use DateTime;
use App\Entity\TeacherIniciative;
use App\Entity\CompanyIniciative;
use App\Entity\ModuleIniciative;
use App\Entity\IniciativeGoal;

class NewIniciativeDTO
{
    public function __construct (
        #[Assert\NotBlank(message: "El id de la iniciativa es obligatorio")]
        private int $id,
        #[Assert\NotBlank(message: "El nombre de la iniciativa es obligatorio")]
        private string $nombre,
        #[Assert\NotBlank(message: "La descripción de la iniciativa es obligatoria")]
        private string $description,
        #[Assert\NotBlank(message: "La fecha inicial de la iniciativa es obligatoria")]
        private DateTime $startDate,
        
        // TODORepasar fecha fin
        private DateTime $endDate,
        #[Assert\NotBlank(message: "La duración de la iniciativa es obligatoria")]
        private float $hours,
        
        #[Assert\NotBlank(message: "La lista de profesores de la iniciativa es obligatoria")]
        /** @var Teacher[] */
        private array $teachers,
        #[Assert\NotBlank(message: "La lista de entidades externas de la iniciativa es obligatoria")]
        /** @var Company[] */
        private array $companies,
        /** @var Module[] */
        private array $modules,
        #[Assert\NotBlank(message: "La lista de metas de la iniciativa es obligatoria")]
        /** @var Goal[] */
        private array $goals,
    ){}

    public function getId(): int
    {
        return $this->id;
    }

    public function getNombre(): string
    {
        return $this->nombre;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getStartDate(): DateTime
    {
        return $this->startDate;
    }

    public function getEndDate(): DateTime
    {
        return $this->endDate;
    }

    public function getHours(): float
    {
        return $this->hours;
    }

    /** @return TeacherIniciative[] */
    public function getTeachers(): array
    {
        return $this->teachers;
    }

    /** @return CompanyIniciative[] */
    public function getCompanies(): array
    {
        return $this->companies;
    }

    /** @return ModuleIniciative[] */
    public function getModules(): array
    {
        return $this->modules;
    }

    /** @return IniciativeGoal[] */
    public function getGoals(): array
    {
        return $this->goals;
    }
}