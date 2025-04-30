<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class Diffusion extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        // Obtener todas las iniciativas
        $iniciatives = $manager->getRepository(\App\Entity\Iniciative::class)->findAll();

        // Métodos de difusión y links personalizados
        $diffusionMethods = [
            'Instagram' => 'https://example.com/redes-sociales/{id}',
            'Facebook' => 'https://example.com/pagina-web/{id}',
            'Linkedin' => 'https://example.com/boletin/{id}',
            'Twitter' => 'https://example.com/reuniones/{id}',
        ];

        // Recorrer cada iniciativa
        foreach ($iniciatives as $iniciative) {
            // Elegir aleatoriamente uno de los métodos de difusión
            $randomMethod = array_rand($diffusionMethods);

            // Verificar si ya existe una difusión para este tipo (aunque no debería ser necesario)
            $existingDiffusion = $manager->getRepository(\App\Entity\Diffusion::class)
                ->findOneBy(['iniciative' => $iniciative, 'type' => $randomMethod]);

            // Si no existe, crear la difusión
            if (!$existingDiffusion) {
                $diffusion = new \App\Entity\Diffusion();
                $link = str_replace('{id}', $iniciative->getId(), $diffusionMethods[$randomMethod]); // Reemplazar el {id} por el ID de la iniciativa

                $diffusion->setType($randomMethod);
                $diffusion->setLink($link);
                $diffusion->setIniciative($iniciative);

                // Persistir la difusión
                $manager->persist($diffusion);
            }
        }

        // Hacer el flush para guardar todos los cambios en la base de datos
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            Iniciative::class,
        ];
    }


}
