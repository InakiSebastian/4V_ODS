<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;


class NewModuleDTO
{



    public function __construct(

        #[Assert\NotBlank(message: "El nombre es obligatorio")]
        private string $name,
        #[Assert\NotBlank(message: "El id del grado es obligatiorio")]
        private int $idDegree,


    ) {}

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getDegree(): int
    {
        return $this->idDegree;
    }   

}
