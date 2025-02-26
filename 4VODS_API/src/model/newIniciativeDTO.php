<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;
use DateTime;

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
        private array $teachers,
        #[Assert\NotBlank(message: "La lista de entidades externas de la iniciativa es obligatoria")]
        private array $companies,
        #[Assert\NotBlank(message: "La lista de módulos de la iniciativa es obligatoria")]
        private array $subjects,
        #[Assert\NotBlank(message: "La lista de metas de la iniciativa es obligatoria")]
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

    public function getTeachers(): array
    {
        return $this->teachers;
    }

    public function getCompanies(): array
    {
        return $this->companies;
    }

    public function getSubjects(): array
    {
        return $this->subjects;
    }

    public function getGoals(): array
    {
        return $this->goals;
    }
}