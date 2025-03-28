<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Iniciative;

class IndicatorService
{

    public function __construct(private EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function iniciativesByOds(): array
    {
        $iniciatives = $this->entityManager->getRepository(Iniciative::class)->findAll();
        $result = [];

        // Loop over each initiative
        foreach ($iniciatives as $iniciative) {

            // Loop over each initiative goal
            foreach ($iniciative->getIniciativeGoals() as $iniciativeGoal) {
                $goal = $iniciativeGoal->getIdGoal();
                $ods = $goal->getIdOds();

                // If ODS exists, add it to the result
                if ($ods) {
                    $odsTitle = $ods->getId() . ' - ' . $ods->getDescription();

                    // Initialize ODS array if not already set
                    if (!isset($result[$odsTitle])) {
                        $result[$odsTitle] = [];
                    }

                    // Add initiative name
                    $initiativeNameWithYear = $iniciative->getName() . " " . $iniciative->getSchoolYear();

                    // Verificar si ya existe en el array
                    if (!in_array($initiativeNameWithYear, $result[$odsTitle])) {
                        $result[$odsTitle][] = $initiativeNameWithYear;
                    }
                }
            }
        }

        return $result;
    }

    public function iniciativesByOdsGrouped(): array
    {
        $iniciatives = $this->entityManager->getRepository(Iniciative::class)->findAll();
        $result = [];

        // Loop over each initiative
        foreach ($iniciatives as $iniciative) {
            $schoolYear = $iniciative->getSchoolYear();

            // Initialize the schoolYear array if not already set
            if (!isset($result[$schoolYear])) {
                $result[$schoolYear] = [];
            }

            // Loop over each initiative goal
            foreach ($iniciative->getIniciativeGoals() as $iniciativeGoal) {
                $goal = $iniciativeGoal->getIdGoal();
                $ods = $goal->getIdOds();

                // If ODS exists, add it to the result
                if ($ods) {
                    $odsTitle = $ods->getId() . ' - ' . $ods->getDescription();

                    // Initialize ODS array if not already set
                    if (!isset($result[$schoolYear][$odsTitle])) {
                        $result[$schoolYear][$odsTitle] = [];
                    }

                    // Add initiative name
                    if (!in_array($iniciative->getName(), $result[$schoolYear][$odsTitle])) {
                        $result[$schoolYear][$odsTitle][] = $iniciative->getName();
                    }
                }
            }
        }

        return $result;
    }
}
