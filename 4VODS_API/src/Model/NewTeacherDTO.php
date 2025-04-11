<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;


class NewTeacherDTO
{



    public function __construct(

        #[Assert\NotBlank(message: "El nombre es obligatyorio")]
        private string $name


    ) {}

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

}
