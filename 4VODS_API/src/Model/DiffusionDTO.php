<?php

namespace App\Model;

use App\Entity\Iniciative;

class DiffusionDTO
{
    private int $id;
    private string $type;
    private string $link;

    private Iniciative $iniciative;
}