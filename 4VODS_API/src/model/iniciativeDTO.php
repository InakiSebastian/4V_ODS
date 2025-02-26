<?php

namespace App\Model;

use DateTime;
class IniciativeDTO
{
    private int $id;
    private string $name;
    private string $description;
    private DateTime $startDate;
    private DateTime $endDate;
    private float $hours;
    private int $idIniciativeType;
    private int $idDifusionType;
    
    private array $teachers;
    private array $companies;
    private array $subjects;
    private array $goals;
    
    private bool $isActive;

    public function __construct(){}
    
}

