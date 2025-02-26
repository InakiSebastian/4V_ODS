<?php

namespace App\Model;

use DateTime;
use App\Entity\Teacher;
use App\Entity\Company;
use App\Entity\Module;
use App\Entity\Goal;

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
    
    /** @var Teacher[] */
    private array $teachers;
    /** @var Company[] */
    private array $companies;
    /** @var Module[] */
    private array $modules;
    /** @var Goal[] */
    private array $goals;
    
    private bool $isActive;

    public function __construct(){}
    
}

