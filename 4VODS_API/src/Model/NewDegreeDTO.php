<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;


class NewDegreeDTO
{



    public function __construct(

        #[Assert\NotBlank(message: "El nombre del ciclo es obligatorio")]
        private string $name
    ) {}


    public function getName(): string
    {
        return $this->name;
    }
}
