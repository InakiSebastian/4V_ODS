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
        $iniciative1->setStartDate(new \DateTime('2024-09-01'));
        $iniciative1->setEndDate(new \DateTime('2025-06-30'));
        $iniciative1->setHours(5);
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
        $iniciative2->setHours(5);
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
        $iniciative3->setHours(10);
        $iniciative3->setType("Taller");
        $iniciative3->setSchoolYear('2022-2023');
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
        $iniciative4->setHours(20);
        $iniciative4->setType("Proyecto");
        $iniciative4->setSchoolYear('2022-2023');
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


        // ---------------- INICIATIVE 5 ----------------
        $iniciative5 = new \App\Entity\Iniciative();
        $iniciative5->setName('Campaña contra el Bullying');
        $iniciative5->setDescription('Campaña de sensibilización y prevención del acoso escolar.');
        $iniciative5->setStartDate(new \DateTime('2025-10-01'));
        $iniciative5->setEndDate(new \DateTime('2026-05-31'));
        $iniciative5->setHours(40);
        $iniciative5->setType("Campaña");
        $iniciative5->setSchoolYear('2022-2023');
        $iniciative5->setInnovative(false);

        foreach ([$teachers[8], $teachers[9]] as $teacher) {
            $teacherIniciative = new TeacherIniciative();
            $teacherIniciative->setIdTeacher($teacher);
            $teacherIniciative->setIdIniciative($iniciative5);
            $manager->persist($teacherIniciative);
        }

        foreach ([$modules[8], $modules[9]] as $module) {
            $moduleIniciative = new \App\Entity\ModuleIniciative();
            $moduleIniciative->setIdModule($module);
            $moduleIniciative->setIdIniciative($iniciative5);
            $manager->persist($moduleIniciative);
        }

        foreach ([$goals[16], $goals[22], $goals[31]] as $goal) {
            $goalIniciative = new \App\Entity\IniciativeGoal();
            $goalIniciative->setIdGoal($goal);
            $goalIniciative->setIdIniciative($iniciative5);
            $manager->persist($goalIniciative);
        }

        $companyIniciative5 = new \App\Entity\CompanyIniciative();
        $companyIniciative5->setIdCompany($companies[0]);
        $companyIniciative5->setIdIniciative($iniciative5);
        $manager->persist($companyIniciative5);
        $manager->persist($iniciative5);

        // ---------------- INICIATIVE 6 ----------------
        $iniciative6 = new \App\Entity\Iniciative();
        $iniciative6->setName('Semana de la Ciencia');
        $iniciative6->setDescription('Semana de talleres y actividades para fomentar el interés por la ciencia.');
        $iniciative6->setStartDate(new \DateTime('2024-11-01'));
        $iniciative6->setEndDate(new \DateTime('2025-01-31'));
        $iniciative6->setHours(10);
        $iniciative6->setType("Jornada");
        $iniciative6->setSchoolYear('2025-2026');
        $iniciative6->setInnovative(true);

        foreach ([$teachers[2], $teachers[5]] as $teacher) {
            $teacherIniciative = new TeacherIniciative();
            $teacherIniciative->setIdTeacher($teacher);
            $teacherIniciative->setIdIniciative($iniciative6);
            $manager->persist($teacherIniciative);
        }

        foreach ([$modules[4], $modules[10]] as $module) {
            $moduleIniciative = new \App\Entity\ModuleIniciative();
            $moduleIniciative->setIdModule($module);
            $moduleIniciative->setIdIniciative($iniciative6);
            $manager->persist($moduleIniciative);
        }

        foreach ([$goals[12], $goals[33], $goals[44]] as $goal) {
            $goalIniciative = new \App\Entity\IniciativeGoal();
            $goalIniciative->setIdGoal($goal);
            $goalIniciative->setIdIniciative($iniciative6);
            $manager->persist($goalIniciative);
        }

        $companyIniciative6 = new \App\Entity\CompanyIniciative();
        $companyIniciative6->setIdCompany($companies[1]);
        $companyIniciative6->setIdIniciative($iniciative6);
        $manager->persist($companyIniciative6);
        $manager->persist($iniciative6);

        // ---------------- INICIATIVE 7 ----------------
        $iniciative7 = new \App\Entity\Iniciative();
        $iniciative7->setName('Concurso de Emprendimiento');
        $iniciative7->setDescription('Concurso para impulsar ideas emprendedoras entre el alumnado.');
        $iniciative7->setStartDate(new \DateTime('2025-02-01'));
        $iniciative7->setEndDate(new \DateTime('2025-06-30'));
        $iniciative7->setHours(30);
        $iniciative7->setType("Concurso");
        $iniciative7->setSchoolYear('2024-2025');
        $iniciative7->setInnovative(true);

        foreach ([$teachers[13], $teachers[14]] as $teacher) {
            $teacherIniciative = new TeacherIniciative();
            $teacherIniciative->setIdTeacher($teacher);
            $teacherIniciative->setIdIniciative($iniciative7);
            $manager->persist($teacherIniciative);
        }

        foreach ([$modules[11], $modules[12]] as $module) {
            $moduleIniciative = new \App\Entity\ModuleIniciative();
            $moduleIniciative->setIdModule($module);
            $moduleIniciative->setIdIniciative($iniciative7);
            $manager->persist($moduleIniciative);
        }

        foreach ([$goals[25], $goals[37], $goals[51]] as $goal) {
            $goalIniciative = new \App\Entity\IniciativeGoal();
            $goalIniciative->setIdGoal($goal);
            $goalIniciative->setIdIniciative($iniciative7);
            $manager->persist($goalIniciative);
        }

        $companyIniciative7 = new \App\Entity\CompanyIniciative();
        $companyIniciative7->setIdCompany($companies[2]);
        $companyIniciative7->setIdIniciative($iniciative7);
        $manager->persist($companyIniciative7);
        $manager->persist($iniciative7);

        // ---------------- INICIATIVE 8 ----------------
        $iniciative8 = new \App\Entity\Iniciative();
        $iniciative8->setName('Donación de Sangre');
        $iniciative8->setDescription('Campaña para fomentar la donación de sangre entre estudiantes y familias.');
        $iniciative8->setStartDate(new \DateTime('2025-04-01'));
        $iniciative8->setEndDate(new \DateTime('2025-04-30'));
        $iniciative8->setHours(50);
        $iniciative8->setType("Campaña");
        $iniciative8->setSchoolYear('2024-2025');
        $iniciative8->setInnovative(false);

        foreach ([$teachers[16], $teachers[17]] as $teacher) {
            $teacherIniciative = new TeacherIniciative();
            $teacherIniciative->setIdTeacher($teacher);
            $teacherIniciative->setIdIniciative($iniciative8);
            $manager->persist($teacherIniciative);
        }

        foreach ([$modules[13], $modules[14]] as $module) {
            $moduleIniciative = new \App\Entity\ModuleIniciative();
            $moduleIniciative->setIdModule($module);
            $moduleIniciative->setIdIniciative($iniciative8);
            $manager->persist($moduleIniciative);
        }

        foreach ([$goals[9], $goals[19], $goals[59]] as $goal) {
            $goalIniciative = new \App\Entity\IniciativeGoal();
            $goalIniciative->setIdGoal($goal);
            $goalIniciative->setIdIniciative($iniciative8);
            $manager->persist($goalIniciative);
        }

        $companyIniciative8 = new \App\Entity\CompanyIniciative();
        $companyIniciative8->setIdCompany($companies[3]);
        $companyIniciative8->setIdIniciative($iniciative8);
        $manager->persist($companyIniciative8);
        $manager->persist($iniciative8);

        // ---------------- INICIATIVE 9 ----------------
        $iniciative9 = new \App\Entity\Iniciative();
        $iniciative9->setName('Programa de Voluntariado');
        $iniciative9->setDescription('Programa para implicar al alumnado en actividades de voluntariado social.');
        $iniciative9->setStartDate(new \DateTime('2025-09-01'));
        $iniciative9->setEndDate(new \DateTime('2026-06-15'));
        $iniciative9->setHours(50);
        $iniciative9->setType("Proyecto");
        $iniciative9->setSchoolYear('2024-2025');
        $iniciative9->setInnovative(true);

        foreach ([$teachers[1], $teachers[3]] as $teacher) {
            $teacherIniciative = new TeacherIniciative();
            $teacherIniciative->setIdTeacher($teacher);
            $teacherIniciative->setIdIniciative($iniciative9);
            $manager->persist($teacherIniciative);
        }

        foreach ([$modules[15], $modules[16]] as $module) {
            $moduleIniciative = new \App\Entity\ModuleIniciative();
            $moduleIniciative->setIdModule($module);
            $moduleIniciative->setIdIniciative($iniciative9);
            $manager->persist($moduleIniciative);
        }

        foreach ([$goals[13], $goals[26], $goals[47]] as $goal) {
            $goalIniciative = new \App\Entity\IniciativeGoal();
            $goalIniciative->setIdGoal($goal);
            $goalIniciative->setIdIniciative($iniciative9);
            $manager->persist($goalIniciative);
        }

        $companyIniciative9 = new \App\Entity\CompanyIniciative();
        $companyIniciative9->setIdCompany($companies[1]);
        $companyIniciative9->setIdIniciative($iniciative9);
        $manager->persist($companyIniciative9);
        $manager->persist($iniciative9);

        // ---------------- INICIATIVE 10 ----------------
        $iniciative10 = new \App\Entity\Iniciative();
        $iniciative10->setName('Cine Foro Medioambiental');
        $iniciative10->setDescription('Proyecciones de cine y debates sobre sostenibilidad y cambio climático.');
        $iniciative10->setStartDate(new \DateTime('2023-11-15'));
        $iniciative10->setEndDate(new \DateTime('2024-02-15'));
        $iniciative10->setHours(19);
        $iniciative10->setType("Charla");
        $iniciative10->setSchoolYear('2024-2025');
        $iniciative10->setInnovative(false);

        foreach ([$teachers[10], $teachers[11]] as $teacher) {
            $teacherIniciative = new TeacherIniciative();
            $teacherIniciative->setIdTeacher($teacher);
            $teacherIniciative->setIdIniciative($iniciative10);
            $manager->persist($teacherIniciative);
        }

        foreach ([$modules[17], $modules[0]] as $module) {
            $moduleIniciative = new \App\Entity\ModuleIniciative();
            $moduleIniciative->setIdModule($module);
            $moduleIniciative->setIdIniciative($iniciative10);
            $manager->persist($moduleIniciative);
        }

        foreach ([$goals[6], $goals[28], $goals[41]] as $goal) {
            $goalIniciative = new \App\Entity\IniciativeGoal();
            $goalIniciative->setIdGoal($goal);
            $goalIniciative->setIdIniciative($iniciative10);
            $manager->persist($goalIniciative);
        }

        $companyIniciative10 = new \App\Entity\CompanyIniciative();
        $companyIniciative10->setIdCompany($companies[0]);
        $companyIniciative10->setIdIniciative($iniciative10);
        $manager->persist($companyIniciative10);
        $manager->persist($iniciative10);

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
