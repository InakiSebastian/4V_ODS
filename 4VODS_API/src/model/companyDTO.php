<?php

namespace App\Model;

class CompanyDTO
{
    private int $id; 
    private string $name;
    
    private bool $isActive;
    
    public function __construct(){}
}