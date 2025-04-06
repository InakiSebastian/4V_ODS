<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;


class NewCompanyDTO
{



    public function __construct(

        #[Assert\NotBlank(message: "El nombre de la iniciativa es obligatorio")]
        private string $name
    ) {}


    public function getName(): string
    {
        return $this->name;
    }
}
