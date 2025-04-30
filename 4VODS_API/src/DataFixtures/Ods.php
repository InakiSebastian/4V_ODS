<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class Ods extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $odsWithGoals = [
            [
                'description' => 'Fin de la pobreza',
                'dimension' => 'Social',
                'goals' => [
                    'Erradicar la pobreza extrema para todas las personas en el mundo.',
                    'Reducir al menos a la mitad la proporción de personas que viven en la pobreza en todas sus dimensiones.',
                    'Garantizar el acceso de todos a recursos económicos, servicios básicos, propiedad y control sobre la tierra.',
                    'Aumentar la resiliencia de los pobres y personas en situaciones vulnerables ante desastres.',
                ],
            ],
            [
                'description' => 'Hambre cero',
                'dimension' => 'Económico',
                'goals' => [
                    'Poner fin al hambre y asegurar el acceso a alimentos nutritivos.',
                    'Acabar con todas las formas de malnutrición.',
                    'Aumentar la productividad agrícola y los ingresos de pequeños productores de alimentos.',
                    'Asegurar sistemas de producción alimentaria sostenibles.',
                ],
            ],
            [
                'description' => 'Salud y bienestar',
                'dimension' => 'Social',
                'goals' => [
                    'Reducir la mortalidad materna a menos de 70 por cada 100.000 nacidos vivos.',
                    'Poner fin a las epidemias de SIDA, tuberculosis, malaria y otras enfermedades.',
                    'Reducir en un tercio las muertes prematuras por enfermedades no transmisibles.',
                    'Garantizar el acceso universal a servicios de salud sexual y reproductiva.',
                ],
            ],
            [
                'description' => 'Educación de calidad',
                'dimension' => 'Social',
                'goals' => [
                    'Asegurar que todos los niños completen la educación primaria y secundaria gratuita.',
                    'Aumentar el número de jóvenes y adultos con habilidades técnicas y profesionales.',
                    'Eliminar las disparidades de género en la educación.',
                    'Garantizar que todos los jóvenes y una proporción sustancial de adultos tengan competencias de lectura, escritura y aritmética.',
                ],
            ],
            [
                'description' => 'Igualdad de género',
                'dimension' => 'Social',
                'goals' => [
                    'Eliminar todas las formas de violencia contra las mujeres y niñas.',
                    'Eliminar todas las prácticas nocivas como el matrimonio infantil y la mutilación genital femenina.',
                    'Asegurar la participación plena y efectiva de las mujeres en la vida política, económica y pública.',
                    'Asegurar el acceso universal a la salud sexual y reproductiva.',
                ],
            ],
            [
                'description' => 'Agua limpia y saneamiento',
                'dimension' => 'Medioambiental',
                'goals' => [
                    'Lograr el acceso universal y equitativo al agua potable segura y asequible.',
                    'Lograr el acceso a servicios de saneamiento e higiene adecuados.',
                    'Mejorar la calidad del agua reduciendo la contaminación.',
                    'Aumentar el uso eficiente del agua en todos los sectores.',
                ],
            ],
            [
                'description' => 'Energía asequible y no contaminante',
                'dimension' => 'Medioambiental',
                'goals' => [
                    'Garantizar el acceso universal a servicios energéticos asequibles, fiables y modernos.',
                    'Aumentar considerablemente la proporción de energía renovable.',
                    'Duplicar la tasa mundial de mejora de la eficiencia energética.',
                    'Ampliar la infraestructura y mejorar la tecnología para servicios energéticos sostenibles.',
                ],
            ],
            [
                'description' => 'Trabajo decente y crecimiento económico',
                'dimension' => 'Económico',
                'goals' => [
                    'Mantener el crecimiento económico per cápita de acuerdo a las circunstancias nacionales.',
                    'Lograr niveles más elevados de productividad económica.',
                    'Promover políticas orientadas al desarrollo que apoyen actividades productivas.',
                    'Lograr el empleo pleno y productivo y el trabajo decente para todos.',
                ],
            ],
            [
                'description' => 'Industria, innovación e infraestructura',
                'dimension' => 'Económico',
                'goals' => [
                    'Desarrollar infraestructuras fiables, sostenibles y resilientes.',
                    'Promover la industrialización inclusiva y sostenible.',
                    'Aumentar el acceso de las pequeñas industrias a servicios financieros y mercados.',
                    'Mejorar la investigación científica y la capacidad tecnológica.',
                ],
            ],
            [
                'description' => 'Reducción de las desigualdades',
                'dimension' => 'Social',
                'goals' => [
                    'Aumentar y promover la inclusión social, económica y política de todas las personas.',
                    'Asegurar la igualdad de oportunidades y reducir la desigualdad de resultados.',
                    'Facilitar la migración y la movilidad ordenada, segura y responsable.',
                    'Adoptar políticas fiscales, salariales y de protección social que promuevan la igualdad.',
                ],
            ],
            [
                'description' => 'Ciudades y comunidades sostenibles',
                'dimension' => 'Medioambiental',
                'goals' => [
                    'Asegurar el acceso de todos a viviendas y servicios básicos adecuados.',
                    'Proporcionar acceso a sistemas de transporte seguros, asequibles y sostenibles.',
                    'Reducir el impacto ambiental negativo de las ciudades.',
                    'Proteger y salvaguardar el patrimonio cultural y natural del mundo.',
                ],
            ],
            [
                'description' => 'Producción y consumo responsables',
                'dimension' => 'Económico',
                'goals' => [
                    'Implementar el marco decenal de programas sobre modalidades de consumo y producción sostenibles.',
                    'Lograr la gestión sostenible y el uso eficiente de los recursos naturales.',
                    'Reducir a la mitad el desperdicio de alimentos per cápita.',
                    'Gestionar adecuadamente los productos químicos y todos los desechos a lo largo de su ciclo de vida.',
                ],
            ],
            [
                'description' => 'Acción por el clima',
                'dimension' => 'Medioambiental',
                'goals' => [
                    'Fortalecer la resiliencia y la capacidad de adaptación a los riesgos relacionados con el clima.',
                    'Integrar medidas contra el cambio climático en las políticas, estrategias y planes nacionales.',
                    'Mejorar la educación y sensibilización sobre el cambio climático.',
                    'Movilizar recursos para mitigar el cambio climático en países en desarrollo.',
                ],
            ],
            [
                'description' => 'Vida submarina',
                'dimension' => 'Medioambiental',
                'goals' => [
                    'Prevenir y reducir significativamente la contaminación marina.',
                    'Gestionar y proteger de forma sostenible los ecosistemas marinos y costeros.',
                    'Minimizar y abordar los efectos de la acidificación de los océanos.',
                    'Reglamentar eficazmente la explotación pesquera y eliminar la pesca excesiva.',
                ],
            ],
            [
                'description' => 'Vida de ecosistemas terrestres',
                'dimension' => 'Medioambiental',
                'goals' => [
                    'Garantizar la conservación de los ecosistemas terrestres y de agua dulce.',
                    'Combatir la desertificación y restaurar tierras degradadas.',
                    'Garantizar la conservación de los ecosistemas montañosos.',
                    'Adoptar medidas urgentes para reducir la degradación de hábitats naturales.',
                ],
            ],
            [
                'description' => 'Paz, justicia e instituciones sólidas',
                'dimension' => 'Social',
                'goals' => [
                    'Reducir significativamente todas las formas de violencia.',
                    'Acabar con el maltrato, la explotación, la trata y todas las formas de violencia contra niños.',
                    'Promover el Estado de derecho y garantizar la igualdad de acceso a la justicia.',
                    'Reducir la corrupción y el soborno en todas sus formas.',
                ],
            ],
            [
                'description' => 'Alianzas para lograr los objetivos',
                'dimension' => 'Económico',
                'goals' => [
                    'Fortalecer la movilización de recursos internos mediante el apoyo internacional.',
                    'Promover un sistema de comercio multilateral universal, basado en normas, abierto y equitativo.',
                    'Aumentar el apoyo a los países en desarrollo en ciencia, tecnología e innovación.',
                    'Mejorar la estabilidad macroeconómica mundial mediante la coordinación de políticas.',
                ],
            ],
        ];

        foreach ($odsWithGoals as $odsData) {
            $ods = new \App\Entity\Ods();
            $ods->setDescription($odsData['description']);
            $ods->setActive(true);
            $ods->setDimension($odsData['dimension']);

            $manager->persist($ods);

            foreach ($odsData['goals'] as $goalDescription) {
                $goal = new \App\Entity\Goal();
                $goal->setDescription($goalDescription);
                $goal->setIdOds($ods);

                $manager->persist($goal);
            }
        }

        $manager->flush();
    }
}
