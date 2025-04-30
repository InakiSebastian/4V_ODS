<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class Degree extends Fixture 

{
    public function load(ObjectManager $manager): void
    {
        // Lista de grados y sus módulos
        $degreeModules = [
            'Administración y Finanzas' => [
                'Gestión Financiera',
                'Gestión de Recursos Humanos',
                'Derecho Empresarial'
            ],
            'Comercio Internacional' => [
                'Logística Internacional',
                'Marketing Internacional',
                'Economía Internacional'
            ],
            'Gestión de Ventas y Espacios Comerciales' => [
                'Técnicas de Venta',
                'Visual Merchandising',
                'Gestión de Espacios Comerciales'
            ],
            'Transporte y Logística' => [
                'Logística Internacional',
                'Gestión de Almacenes',
                'Transporte de Mercancías'
            ],
            'Administración de Sistemas Informáticos en Red' => [
                'Redes de Ordenadores',
                'Sistemas Operativos',
                'Gestión de Bases de Datos'
            ],
            'Desarrollo de Aplicaciones Multiplataforma' => [
                'Desarrollo Web',
                'Desarrollo de Software Móvil',
                'Bases de Datos'
            ]
        ];

        // Lista de profesores
        $teachers = [
            'María Pérez',
            'José López',
            'Ana García',
            'Juan Martínez',
            'Laura Rodríguez',
            'Carlos Sánchez',
            'Elena Fernández',
            'Pedro Gómez',
            'Marta Ruiz',
            'Luis Díaz',
            'Carmen Hernández',
            'Javier Morales',
            'Sonia Navarro',
            'Miguel Torres',
            'Isabel García',
            'Andrés Romero',
            'Beatriz Jiménez',
            'Francisco López'
        ];

        // Creamos los profesores
        $teacherEntities = [];
        foreach ($teachers as $teacherName) {
            $teacher = new \App\Entity\Teacher();
            $teacher->setName($teacherName);
            $manager->persist($teacher);
            $teacherEntities[] = $teacher; // Guardamos los profesores creados para luego asignarlos aleatoriamente
        }

        // Iteramos sobre los grados y módulos
        foreach ($degreeModules as $degreeName => $modules) {
            // Crear el grado
            $degree = new \App\Entity\Degree();
            $degree->setName($degreeName);
            $degree->setActive(true);
            $manager->persist($degree);

            // Iteramos sobre los módulos de cada grado
            foreach ($modules as $moduleName) {
                // Crear el módulo para ese grado
                $module = new \App\Entity\Module();
                $module->setName($moduleName);
                $module->setIdDegree($degree);  // Asociamos el módulo al grado
                $manager->persist($module);

                // Seleccionamos aleatoriamente 3 profesores de la lista de profesores disponibles
                $randomTeachers = $this->getRandomTeachers($teacherEntities, 3);

                // Asignar los 3 profesores aleatorios a este módulo
                foreach ($randomTeachers as $teacher) {
                    // Crear la relación TeacherModule
                    $teacherModule = new \App\Entity\TeacherModule();
                    $teacherModule->setIdModule($module);
                    $teacherModule->setIdTeacher($teacher);  // Asignamos el profesor aleatorio
                    $manager->persist($teacherModule);
                }
            }
        }

        // Guardamos los cambios en la base de datos
        $manager->flush();
    }

 
    private function getRandomTeachers(array $teachers, int $num): array
    {
        // Barajamos la lista de profesores para seleccionar aleatoriamente
        shuffle($teachers);

        // Devolvemos los primeros n profesores de la lista barajada
        return array_slice($teachers, 0, $num);
    }


 
}
