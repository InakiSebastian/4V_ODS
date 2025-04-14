<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;


class NewGoalDTO
{



    public function __construct(

        #[Assert\NotBlank(message: "La descripción de la meta es obligatyoria")]
        private string $description,

        #[Assert\NotBlank(message: "El ids del ODS relacionado es obligatorio")]
        private int $ods,
    ) {}

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getIdOds(): int
    {
        return $this->ods;
    }

    public function setIdOds(int $idOds): void
    {
        $this->ods = $idOds;
    }
}
