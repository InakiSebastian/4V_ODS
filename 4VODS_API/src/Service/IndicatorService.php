<?php

namespace App\Service;

use App\Entity\Degree;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Iniciative;
use App\Entity\Ods;

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

        // Loop over  initiative
        foreach ($iniciatives as $iniciative) {

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

        foreach ($iniciatives as $iniciative) {
            $schoolYear = $iniciative->getSchoolYear();

            foreach ($iniciative->getIniciativeGoals() as $iniciativeGoal) {
                $goal = $iniciativeGoal->getIdGoal();
                $ods = $goal->getIdOds();

                if ($ods) {
                    $odsTitle = $ods->getId() . ' - ' . $ods->getDescription();

                    if (!isset($result[$odsTitle])) {
                        $result[$odsTitle] = [
                            'schoolYears' => [],
                            'total' => 0
                        ];
                    }

                    if (!isset($result[$odsTitle]['schoolYears'][$schoolYear])) {
                        $result[$odsTitle]['schoolYears'][$schoolYear] = ['total' => 0];
                    }

                    $result[$odsTitle]['schoolYears'][$schoolYear]['total']++;
                    $result[$odsTitle]['total']++;
                }
            }
        }

        foreach ($result as &$odsData) {
            ksort($odsData['schoolYears']);
        }

        ksort($result);

        return $result;
    }


    public function indicativeCount(): array
    {
        $degrees = $this->entityManager->getRepository(Degree::class)->findAll();
        $result = [];

        foreach ($degrees as $degree) {
            if (!$degree->isActive()) continue;

            $degreeName = $degree->getName();
            $degreeSummary = [];
            $degreeTotal = 0;

            foreach ($degree->getModules() as $module) {
                if (!$module->isActive()) continue;

                foreach ($module->getModuleIniciatives() as $moduleIniciative) {
                    if (!$moduleIniciative->isActive()) continue;

                    $iniciative = $moduleIniciative->getIdIniciative();
                    if ($iniciative && $iniciative->isActive()) {
                        $schoolYear = $iniciative->getSchoolYear();

                        // Initialize year array if not already set
                        if (!isset($degreeSummary[$schoolYear])) {
                            $degreeSummary[$schoolYear] = [
                                'total' => 0,
                                'modules' => []
                            ];
                        }

                        $moduleName = $module->getName();

                        // Initialize module count for the year if not already set
                        if (!isset($degreeSummary[$schoolYear]['modules'][$moduleName])) {
                            $degreeSummary[$schoolYear]['modules'][$moduleName] = 0;
                        }

                        $degreeSummary[$schoolYear]['modules'][$moduleName]++;
                        $degreeSummary[$schoolYear]['total']++;
                        $degreeTotal++;
                    }
                }
            }

            $result[$degreeName] = [
                'schoolYears' => $degreeSummary,
                'total' => $degreeTotal
            ];
        }

        return $result;
    }
    

    public function numberOfIniciatives(): array
    {
        $iniciatives = $this->entityManager->getRepository(Iniciative::class)->findAll();
        $result = [];

        foreach ($iniciatives as $iniciative) {
            $schoolYear = $iniciative->getSchoolYear();

            if (!isset($result[$schoolYear])) {
                $result[$schoolYear] = 0;
            }

            $result[$schoolYear]++;
        }

        return $result;
    }

    public function indicativeCountByYear($year): array
    {
        $degrees = $this->entityManager->getRepository(Degree::class)->findAll();
        $result = [];

        foreach ($degrees as $degree) {
            if (!$degree->isActive()) continue;

            $degreeName = $degree->getName();
            $modulesSummary = [];
            $degreeIniciativeCount = 0;

            foreach ($degree->getModules() as $module) {
                if (!$module->isActive()) continue;

                $moduleName = $module->getName();
                $moduleIniciativeCount = 0;

                foreach ($module->getModuleIniciatives() as $moduleIniciative) {
                    if (!$moduleIniciative->isActive()) continue;

                    $iniciative = $moduleIniciative->getIdIniciative();
                    if ($iniciative && $iniciative->isActive() && $iniciative->getSchoolYear() == $year) {
                        $moduleIniciativeCount++;
                        $degreeIniciativeCount++;
                    }
                }

                if ($moduleIniciativeCount > 0) {
                    $modulesSummary[$moduleName] = $moduleIniciativeCount;
                }
            }

            $result[$degreeName] = [
                'total' => $degreeIniciativeCount,
                'modules' => $modulesSummary
            ];
        }

        return $result;
    }

    public function hoursByDegreeBySchoolYear(): array
    {
        $degrees = $this->entityManager->getRepository(Degree::class)->findAll();
        $result = [];

        foreach ($degrees as $degree) {
            if (!$degree->isActive()) continue;

            $degreeName = $degree->getName();

            foreach ($degree->getModules() as $module) {
                if (!$module->isActive()) continue;

                foreach ($module->getModuleIniciatives() as $moduleIniciative) {
                    if (!$moduleIniciative->isActive()) continue;

                    $iniciative = $moduleIniciative->getIdIniciative();
                    if (!$iniciative || !$iniciative->isActive()) continue;

                    $year = $iniciative->getSchoolYear();
                    $hours = $iniciative->getHours() ?? 0;

                    if (!isset($result[$degreeName])) {
                        $result[$degreeName] = [
                            'schoolYears' => [],
                            'total' => 0
                        ];
                    }

                    if (!isset($result[$degreeName]['schoolYears'][$year])) {
                        $result[$degreeName]['schoolYears'][$year] = ['total' => 0];
                    }

                    $result[$degreeName]['schoolYears'][$year]['total'] += $hours;
                    $result[$degreeName]['total'] += $hours;
                }
            }
        }

        foreach ($result as &$degreeData) {
            ksort($degreeData['schoolYears']);
        }

        ksort($result);

        return $result;
    }
}