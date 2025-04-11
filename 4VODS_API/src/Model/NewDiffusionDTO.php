<?php

namespace App\Model;

use Symfony\Component\Validator\Constraints as Assert;


class NewDiffusionDTO
{



    public function __construct(
        #[Assert\NotBlank(message: "El id de la iniciativa es obligatorio")]
        private int $iniciative,
        #[Assert\NotBlank(message: "El tipo de la difusión es obligatorio")]
        private string $type,
        #[Assert\NotBlank(message: "El link de la difusión es obligatorio")]
        private string $link
        ) {}


    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }

    public function getLink(): string
    {
        return $this->link;
    }

    public function setLink(string $link): void
    {
        $this->link = $link;
    }

    public function getIniciative(): int
    {
        return $this->iniciative;
    }

    public function setIniciative(int $iniciative): void
    {
        $this->iniciative = $iniciative;
    }

    


}
