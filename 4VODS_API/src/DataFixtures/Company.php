<?php

namespace App\DataFixtures;

use App\Entity\Company as EntityCompany;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class Company extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $companies = [
            'Ibedrola',
            'Repsol',
            'Endesa',
            'Naturgy',
            'Acciona',
        ];

        foreach ($companies as $name) {
            $company = new EntityCompany();
            $company->setName($name);
            $company->setActive(true);
            $manager->persist($company);
        }

        $manager->flush();
    }
}
