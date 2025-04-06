<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;


class NewOdsDTO
{

    public function __construct(

        #[Assert\NotBlank(message: "El nombre del ODS es obligatorio")]
        private string $description,

        private array $goals,

        #[Assert\NotBlank(message: "La dimensión es obligatorio")]
        private string $dimension,
    ) {}

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }



    public function getGoals(): array
    {
        return $this->goals;
    }

    public function setGoals(array $goals): void
    {
        $this->goals = $goals;
    }


    public function getDimension(): string
    {
        return $this->dimension;
    }

    public function setDimension(string $dimension): void
    {
        $this->dimension = $dimension;
    }
}
