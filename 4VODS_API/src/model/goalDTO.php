<?php

namespace App\Model;

class GoalDTO{
    private int $id;
    private string $description;
    private int $idOds;

    private array $iniciatives;

    private bool $isActive;

    public function __construct(){}
}