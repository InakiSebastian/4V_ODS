<?php

class TeacherDTO
{
    private int $id;
    private string $description;
    
    private array $iniciatives;
    private array $subjects;

    private bool $isActive;
    
    public function __construct(){}

}