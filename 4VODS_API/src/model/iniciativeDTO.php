<?php

namespace App\Model;

use DateTime;
use App\Entity\TeacherIniciative;
use App\Entity\CompanyIniciative;
use App\Entity\ModuleIniciative;
use App\Entity\GoalIniciative;

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
    
    /** @var TeacherIniciative[] */
    private array $teachers;
    /** @var CompanyIniciative[] */
    private array $companies;
    /** @var ModuleIniciative[] */
    private array $modules;
    /** @var GoalIniciative[] */
    private array $goals;
    
    private bool $isActive;

    public function __construct(){}
    
}

