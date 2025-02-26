<?php

namespace App\Model;

class ModuleDTO{
    private int $id;
    private string $name;
    private int $idDegree;

    private array $teachers;
    private array $iniciatives;

    private bool $isActive;

    public function __construct(){}

}