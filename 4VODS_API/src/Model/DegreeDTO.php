<?php

namespace App\Model;

class DegreeDTO
{
    private int $id;
    private string $name;

    private array $subjects;

    private bool $isActive;

    public function __construct()
    {
        
    }
}