<?php

namespace App\Model;

use DateTime;
use App\Entity\TeacherIniciative;
use App\Entity\CompanyIniciative;
use App\Entity\ModuleIniciative;
use App\Entity\IniciativeGoal;
use App\Entity\DiffusionIniciative;

class IniciativeDTO
{
    private int $id;
    private string $name;
    private string $description;
    private DateTime $startDate;
    private DateTime $endDate;
    private float $hours;
    private string $schoolYear;
    private int $innovative;
    private string $type;
    
    /** @var TeacherIniciative[] */
    private array $teachers;
    /** @var CompanyIniciative[] */
    private array $companies;
    /** @var ModuleIniciative[] */
    private array $modules;
    /** @var IniciativeGoal[] */
    private array $goals;
    /** @var DiffusionIniciative[] */
    private array $diffusions;
    
    private bool $isActive;

    public function __construct(){}
    
}

