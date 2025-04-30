<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use App\Entity\TeacherIniciative;


class Iniciative extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $teachers = $manager->getRepository(\App\Entity\Teacher::class)->findAll();
        $modules = $manager->getRepository(\App\Entity\Module::class)->findAll();
        $companies = $manager->getRepository(\App\Entity\Company::class)->findAll();
        $goals = $manager->getRepository(\App\Entity\Goal::class)->findAll();
    
        // ---------------- INICIATIVE 1 ----------------
        $iniciative1 = new \App\Entity\Iniciative();
        $iniciative1->setName('Reciclaje Electrónico');
        $iniciative1->setDescription('Iniciativa para la recolección y reciclaje de dispositivos electrónicos.');
        $iniciative1->setStartDate(new \DateTime('2023-09-01'));
        $iniciative1->setEndDate(new \DateTime('2024-06-30'));
        $iniciative1->setHours(20);
        $iniciative1->setType("Charla");
        $iniciative1->setSchoolYear('2023-2024');
        $iniciative1->setInnovative(true);
    
        foreach ([$teachers[0], $teachers[1]] as $teacher) {
            $teacherIniciative = new TeacherIniciative();
            $teacherIniciative->setIdTeacher($teacher);
            $teacherIniciative->setIdIniciative($iniciative1);
            $manager->persist($teacherIniciative);
        }
    
        foreach ([$modules[0], $modules[1]] as $module) {
            $moduleIniciative = new \App\Entity\ModuleIniciative();
            $moduleIniciative->setIdModule($module);
            $moduleIniciative->setIdIniciative($iniciative1);
            $manager->persist($moduleIniciative);
        }
    
        foreach ([$goals[1], $goals[8], $goals[11]] as $goal) {
            $goalIniciative = new \App\Entity\IniciativeGoal();
            $goalIniciative->setIdGoal($goal);
            $goalIniciative->setIdIniciative($iniciative1);
            $manager->persist($goalIniciative);
        }
    
        $companyIniciative1 = new \App\Entity\CompanyIniciative();
        $companyIniciative1->setIdCompany($companies[0]);
        $companyIniciative1->setIdIniciative($iniciative1);
        $manager->persist($companyIniciative1);
    
        $manager->persist($iniciative1);
    
        // ---------------- INICIATIVE 2 ----------------
        $iniciative2 = new \App\Entity\Iniciative();
        $iniciative2->setName('APP Salud Mental');
        $iniciative2->setDescription('Desarrollo de una aplicación móvil para el seguimiento y mejora de la salud mental en jóvenes.');
        $iniciative2->setStartDate(new \DateTime('2023-10-01'));
        $iniciative2->setEndDate(new \DateTime('2024-05-31'));
        $iniciative2->setHours(50);
        $iniciative2->setType("Proyecto");
        $iniciative2->setSchoolYear('2023-2024');
        $iniciative2->setInnovative(true);
    
        foreach ([$teachers[4], $teachers[7]] as $teacher) {
            $teacherIniciative = new TeacherIniciative();
            $teacherIniciative->setIdTeacher($teacher);
            $teacherIniciative->setIdIniciative($iniciative2);
            $manager->persist($teacherIniciative);
        }
    
        foreach ([$modules[2], $modules[3]] as $module) {
            $moduleIniciative = new \App\Entity\ModuleIniciative();
            $moduleIniciative->setIdModule($module);
            $moduleIniciative->setIdIniciative($iniciative2);
            $manager->persist($moduleIniciative);
        }
    
        foreach ([$goals[3], $goals[4], $goals[5]] as $goal) {
            $goalIniciative = new \App\Entity\IniciativeGoal();
            $goalIniciative->setIdGoal($goal);
            $goalIniciative->setIdIniciative($iniciative2);
            $manager->persist($goalIniciative);
        }
    
        $companyIniciative2 = new \App\Entity\CompanyIniciative();
        $companyIniciative2->setIdCompany($companies[1]);
        $companyIniciative2->setIdIniciative($iniciative2);
        $manager->persist($companyIniciative2);
    
        $manager->persist($iniciative2);
    
        // ---------------- INICIATIVE 3 ----------------
        $iniciative3 = new \App\Entity\Iniciative();
        $iniciative3->setName('Taller Igualdad');
        $iniciative3->setDescription('Taller formativo sobre igualdad de género y diversidad en el entorno educativo.');
        $iniciative3->setStartDate(new \DateTime('2024-01-15'));
        $iniciative3->setEndDate(new \DateTime('2024-03-15'));
        $iniciative3->setHours(15);
        $iniciative3->setType("Taller");
        $iniciative3->setSchoolYear('2023-2024');
        $iniciative3->setInnovative(false);
    
        foreach ([$teachers[15], $teachers[12]] as $teacher) {
            $teacherIniciative = new TeacherIniciative();
            $teacherIniciative->setIdTeacher($teacher);
            $teacherIniciative->setIdIniciative($iniciative3);
            $manager->persist($teacherIniciative);
        }
    
        foreach ([$modules[1], $modules[5]] as $module) {
            $moduleIniciative = new \App\Entity\ModuleIniciative();
            $moduleIniciative->setIdModule($module);
            $moduleIniciative->setIdIniciative($iniciative3);
            $manager->persist($moduleIniciative);
        }
    
        foreach ([$goals[1], $goals[2], $goals[42]] as $goal) {
            $goalIniciative = new \App\Entity\IniciativeGoal();
            $goalIniciative->setIdGoal($goal);
            $goalIniciative->setIdIniciative($iniciative3);
            $manager->persist($goalIniciative);
        }
    
        $companyIniciative3 = new \App\Entity\CompanyIniciative();
        $companyIniciative3->setIdCompany($companies[2]);
        $companyIniciative3->setIdIniciative($iniciative3);
        $manager->persist($companyIniciative3);
    
        $manager->persist($iniciative3);
    
        // ---------------- INICIATIVE 4 ----------------
        $iniciative4 = new \App\Entity\Iniciative();
        $iniciative4->setName('Huerto Escolar');
        $iniciative4->setDescription('Creación y mantenimiento de un huerto escolar para promover la sostenibilidad y la educación ambiental.');
        $iniciative4->setStartDate(new \DateTime('2023-09-15'));
        $iniciative4->setEndDate(new \DateTime('2024-06-15'));
        $iniciative4->setHours(30);
        $iniciative4->setType("Proyecto");
        $iniciative4->setSchoolYear('2023-2024');
        $iniciative4->setInnovative(false);
    
        foreach ([$teachers[6], $teachers[7]] as $teacher) {
            $teacherIniciative = new TeacherIniciative();
            $teacherIniciative->setIdTeacher($teacher);
            $teacherIniciative->setIdIniciative($iniciative4);
            $manager->persist($teacherIniciative);
        }
    
        foreach ([$modules[6], $modules[7]] as $module) {
            $moduleIniciative = new \App\Entity\ModuleIniciative();
            $moduleIniciative->setIdModule($module);
            $moduleIniciative->setIdIniciative($iniciative4);
            $manager->persist($moduleIniciative);
        }
    
        foreach ([$goals[50], $goals[60], $goals[65]] as $goal) {
            $goalIniciative = new \App\Entity\IniciativeGoal();
            $goalIniciative->setIdGoal($goal);
            $goalIniciative->setIdIniciative($iniciative4);
            $manager->persist($goalIniciative);
        }
    
        $companyIniciative4 = new \App\Entity\CompanyIniciative();
        $companyIniciative4->setIdCompany($companies[3]);
        $companyIniciative4->setIdIniciative($iniciative4);
        $manager->persist($companyIniciative4);
    
        $manager->persist($iniciative4);
    
        $manager->flush();
    }
    

    public function getDependencies(): array
    {
        return [
            Degree::class,
            Company::class,
            Ods::class,
        ];
    }
}
