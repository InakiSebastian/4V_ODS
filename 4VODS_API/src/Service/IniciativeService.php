<?php

namespace App\Service;

use App\Model\NewIniciativeDTO;
use App\Entity\Iniciative;
use App\Entity\Teacher;
use App\Entity\Company;
use App\Entity\Module;
use App\Entity\Goal;
use App\Entity\TeacherIniciative;
use App\Entity\CompanyIniciative;
use App\Entity\Diffusion;
use App\Entity\ModuleIniciative;
use App\Entity\IniciativeGoal;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\PseudoTypes\LowercaseString;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class IniciativeService
{

    public function __construct(private EntityManagerInterface $entityManager, private ValidatorInterface $validator)
    {
        $this->entityManager = $entityManager;
        $this->validator = $validator;
    }

    public function getAllIniciatives(): array
    {
        $iniciatives = $this->entityManager->getRepository(Iniciative::class)->findAll();

        $iniciativeDTOs = [];

        foreach ($iniciatives as $iniciative) {
            $iniciativeDTO = [
                'id' => $iniciative->getId(),
                'name' => $iniciative->getName(),
                'description' => $iniciative->getDescription(),
                'startDate' => $iniciative->getStartDate(),
                'endDate' => $iniciative->getEndDate(),
                'hours' => $iniciative->getHours(),
                'schoolYear' => $iniciative->getSchoolYear(),
                'type' => $iniciative->getType(),
                'innovative' => $iniciative->getInnovative(),
                'ods' => []
            ];

            foreach ($iniciative->getIniciativeGoals() as $goal) {
                $ods = $goal->getIdGoal()->getIdOds();
                if ($ods && !in_array($ods->getId(), $iniciativeDTO['ods'])) {
                    $iniciativeDTO['ods'][] = $ods->getId();
                }
            }

            $iniciativeDTOs[] = $iniciativeDTO;
        }

        return $iniciativeDTOs;
    }



    public function getIniciative(int $id): ?array
    {
        $iniciative = $this->entityManager->getRepository(Iniciative::class)->find($id);
        $diffusions = $this->entityManager->getRepository(Diffusion::class)->findBy(['iniciative' => $iniciative]);
        if (!$iniciative) {
            return null;
        }

        $innovative = $iniciative->getInnovative() ? 1 : 0;
        $iniciativeDTO = [
            'id' => $iniciative->getId(),
            'name' => $iniciative->getName(),
            'description' => $iniciative->getDescription(),
            'startDate' => $iniciative->getStartDate(),
            'endDate' => $iniciative->getEndDate(),
            'hours' => $iniciative->getHours(),
            'schoolYear' => $iniciative->getSchoolYear(),
            'type' => $iniciative->getType(),
            'teachers' => [],
            'companies' => [],
            'modules' => [],
            'goals' => [],
            'innovative' => $innovative
        ];


        $iniciativeDTO['teachers'] = [];
        $iniciativeDTO['companies'] = [];
        $iniciativeDTO['modules'] = [];
        $iniciativeDTO['ods'] = [];
        $iniciativeDTO['goals'] = [];
        $iniciativeDTO['diffusions'] = [];

        foreach ($iniciative->getTeacherIniciatives() as $teacher) {
            $iniciativeDTO['teachers'][] = [
                'id' => $teacher->getIdTeacher()->getId(),
                'name' => $teacher->getIdTeacher()->getName(),
            ];
        }

        foreach ($iniciative->getCompanyIniciatives() as $company) {
            $iniciativeDTO['companies'][] = [
                'id' => $company->getIdCompany()->getId(),
                'name' => $company->getIdCompany()->getName(),
            ];
        }

        foreach ($iniciative->getModuleIniciatives() as $module) {
            $iniciativeDTO['modules'][] = [
                'id' => $module->getIdModule()->getId(),
                'name' => $module->getIdModule()->getName(),
                'idDegree' => $module->getIdModule()->getIdDegree()->getId(),
            ];
        }

        foreach ($iniciative->getIniciativeGoals() as $goal) {

            $ods = $goal->getIdGoal()->getIdOds();

            if ($ods) {
                $existingOdsIds = array_column($iniciativeDTO['ods'], 'id');
                if (!in_array($ods->getId(), $existingOdsIds)) {
                    $iniciativeDTO['ods'][] = [
                        "id" => $ods->getId(),
                        "description" => $ods->getDescription()
                    ];
                }
            }


            $iniciativeDTO['goals'][] = [
                'id' => $goal->getIdGoal()->getId(),
                'description' => $goal->getIdGoal()->getDescription(),
                'ods' => $goal->getIdGoal()->getIdOds()->getId()
            ];
        }




        foreach ($diffusions as $diffusion) {
            $iniciativeDTO['diffusions'][] = [
                'idDiffusion' => $diffusion->getId(),
                'type' => $diffusion->getType(),
                'link' => $diffusion->getLink()
            ];
        }

        return $iniciativeDTO;
    }


    public function getCompliteIniciatives(): ?array
    {
        $iniciatives = $this->entityManager->getRepository(Iniciative::class)->findAll();

        $response = [];

        foreach ($iniciatives as $iniciative) {

            $diffusions = $this->entityManager->getRepository(Diffusion::class)->findBy(['iniciative' => $iniciative]);
            if (!$iniciative) {
                return null;
            }


            $innovative = $iniciative->getInnovative() ? 1 : 0;

            $iniciativeDTO = [
                'id' => $iniciative->getId(),
                'name' => $iniciative->getName(),
                'description' => $iniciative->getDescription(),
                'startDate' => $iniciative->getStartDate(),
                'endDate' => $iniciative->getEndDate(),
                'hours' => $iniciative->getHours(),
                'schoolYear' => $iniciative->getSchoolYear(),
                'type' => $iniciative->getType(),
                'teachers' => [],
                'companies' => [],
                'modules' => [],
                'goals' => [],
                "innovative" => $innovative
            ];


            $iniciativeDTO['teachers'] = [];
            $iniciativeDTO['companies'] = [];
            $iniciativeDTO['modules'] = [];
            $iniciativeDTO['ods'] = [];
            $iniciativeDTO['goals'] = [];
            $iniciativeDTO['diffusions'] = [];

            foreach ($iniciative->getTeacherIniciatives() as $teacher) {
                $iniciativeDTO['teachers'][] = [
                    'id' => $teacher->getIdTeacher()->getId(),
                    'name' => $teacher->getIdTeacher()->getName(),
                ];
            }

            foreach ($iniciative->getCompanyIniciatives() as $company) {
                $iniciativeDTO['companies'][] = [
                    'id' => $company->getIdCompany()->getId(),
                    'name' => $company->getIdCompany()->getName(),
                ];
            }

            foreach ($iniciative->getModuleIniciatives() as $module) {
                $iniciativeDTO['modules'][] = [
                    'id' => $module->getIdModule()->getId(),
                    'name' => $module->getIdModule()->getName(),
                    'idDegree' => $module->getIdModule()->getIdDegree()->getId(),
                ];
            }

            foreach ($iniciative->getIniciativeGoals() as $goal) {

                $ods = $goal->getIdGoal()->getIdOds();

                if ($ods) {
                    $existingOdsIds = array_column($iniciativeDTO['ods'], 'id');
                    if (!in_array($ods->getId(), $existingOdsIds)) {
                        $iniciativeDTO['ods'][] = [
                            "id" => $ods->getId(),
                            "description" => $ods->getDescription()
                        ];
                    }
                }


                $iniciativeDTO['goals'][] = [
                    'id' => $goal->getIdGoal()->getId(),
                    'description' => $goal->getIdGoal()->getDescription(),
                    'ods' => $goal->getIdGoal()->getIdOds()->getId()
                ];
            }




            foreach ($diffusions as $diffusion) {
                $iniciativeDTO['diffusions'][] = [
                    'idDiffusion' => $diffusion->getId(),
                    'type' => $diffusion->getType(),
                    'link' => $diffusion->getLink()
                ];
            }

            array_push($response, $iniciativeDTO);
        }


        return $response;
    }



    public function createIniciative(NewIniciativeDTO $dto): array
    {
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            throw new BadRequestHttpException(implode(', ', array_map(fn($e) => $e->getMessage(), iterator_to_array($errors))));
        }

        if ($dto->getEndDate() && $dto->getEndDate() < $dto->getStartDate()) {
            throw new BadRequestHttpException('La fecha de fin debe ser posterior a la fecha de inicio.');
        }

        if ($dto->getHours() <= 0) {
            throw new BadRequestHttpException('La duración de la iniciativa debe ser mayor a 0.');
        }

        if (strtolower($dto->getType()) != "proyecto" && strtolower($dto->getType()) != "taller" && strtolower($dto->getType()) != "charla" && strtolower($dto->getType()) != "otros") {
            throw new BadRequestException('El tipo de iniciativa debe ser proyecto, taller, charla u otros');
        }

        $iniciative = new Iniciative();
        $iniciative->setName($dto->getName());
        $iniciative->setDescription($dto->getDescription());
        $iniciative->setStartDate($dto->getStartDate());
        if ($dto->getEndDate()) {
            $iniciative->setEndDate($dto->getEndDate());
        }
        $iniciative->setHours($dto->getHours());
        $iniciative->setSchoolYear($dto->getSchoolYear());
        $iniciative->setInnovative($dto->getInnovative());
        $iniciative->setType($dto->getType());

        $this->entityManager->persist($iniciative);
        //SE PASAN ODS PERO NO ES NECESARIO PORQUE RELACIONAMOS A PARTIR DE LAS GOALS

        $teachers = [];
        foreach ($dto->getTeachers() as $teacherId) {
            $teacher = $this->entityManager->getRepository(Teacher::class)->find($teacherId);
            if ($teacher) {
                $teacherIniciative = new TeacherIniciative();
                $teacherIniciative->setIdTeacher($teacher);
                $teacherIniciative->setIdIniciative($iniciative);
                $this->entityManager->persist($teacherIniciative);
                $iniciative->addTeacherIniciative($teacherIniciative);
                $teachers[] = ['id' => $teacher->getId(), 'name' => $teacher->getName()];
            }
        }


        $modules = [];
        foreach ($dto->getModules() as $moduleId) {
            $module = $this->entityManager->getRepository(Module::class)->find($moduleId);
            if ($module) {
                $moduleIniciative = new ModuleIniciative();
                $moduleIniciative->setIdModule($module);
                $moduleIniciative->setIdIniciative($iniciative);
                $this->entityManager->persist($moduleIniciative);
                $iniciative->addModuleIniciative($moduleIniciative);
                $modules[] = [
                    'id' => $module->getId(),
                    'name' => $module->getName(),
                    'degree' => $module->getIdDegree()->getId(),
                ];
            }
        }

        $goals = [];
        foreach ($dto->getGoals() as $goalId) {
            $goal = $this->entityManager->getRepository(Goal::class)->find($goalId);
            if ($goal) {
                $iniciativeGoal = new IniciativeGoal();
                $iniciativeGoal->setIdGoal($goal);
                $iniciativeGoal->setIdIniciative($iniciative);
                $this->entityManager->persist($iniciativeGoal);
                $iniciative->addIniciativeGoal($iniciativeGoal);
                $goals[] = ['id' => $goal->getId(), 'description' => $goal->getDescription()];
            }
        }

        $companies = [];
        foreach ($dto->getCompanies() as $companyId) {
            $company = $this->entityManager->getRepository(Company::class)->find($companyId);
            if ($company) {
                $companyIniciative = new CompanyIniciative();
                $companyIniciative->setIdCompany($company);
                $companyIniciative->setIdIniciative($iniciative);
                $this->entityManager->persist($companyIniciative);
                $iniciative->addCompanyIniciative($companyIniciative);
                $companies[] = ['id' => $company->getId(), 'name' => $company->getName()];
            }
        }

        $diffusions = $dto->getDiffusions();
        foreach ($diffusions as $diffusion) {

            $newDiffusion = new Diffusion();
            $newDiffusion->setType($diffusion['type']);
            $newDiffusion->setLink($diffusion['link']);
            $newDiffusion->setIniciative($iniciative);
            $this->entityManager->persist($newDiffusion);
            $iniciative->addDiffusion($newDiffusion);
        }
        $this->entityManager->persist($iniciative);





        $this->entityManager->flush();

        return [
            'id' => $iniciative->getId(),
            'name' => $iniciative->getName(),
            'description' => $iniciative->getDescription(),
            'startDate' => $iniciative->getStartDate()->format('Y-m-d'),
            'endDate' => $iniciative->getEndDate() ? $iniciative->getEndDate()->format('Y-m-d') : null,
            'hours' => $iniciative->getHours(),
            'schoolYear' => $iniciative->getSchoolYear(),
            'innovative' => $iniciative->getInnovative(),
            'type' => $iniciative->getType(),
            'teachers' => $teachers,
            'companies' => $companies,
            'modules' => $modules,
            'goals' => $goals,
            'diffusions' => $iniciative->getDiffusions()->map(fn($diffusion) => [
                'idDiffusion' => $diffusion->getId(),
                'type' => $diffusion->getType(),
                'link' => $diffusion->getLink()
            ])->toArray()
        ];
    }


    public function updateIniciative(int $id, NewIniciativeDTO $dto): array
    {
        $iniciative = $this->entityManager->getRepository(Iniciative::class)->find($id);
        if (!$iniciative) {
            throw new NotFoundHttpException("No se encontró la iniciativa con ID $id.");
        }

        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            throw new BadRequestHttpException(implode(', ', array_map(fn($e) => $e->getMessage(), iterator_to_array($errors))));
        }

        if ($dto->getEndDate() && $dto->getEndDate() < $dto->getStartDate()) {
            throw new BadRequestHttpException('La fecha de fin debe ser posterior a la fecha de inicio.');
        }

        if ($dto->getHours() <= 0) {
            throw new BadRequestHttpException('La duración de la iniciativa debe ser mayor a 0.');
        }

        if (strtolower($dto->getType()) != "proyecto" && strtolower($dto->getType()) != "taller" && strtolower($dto->getType()) != "charla" && strtolower($dto->getType()) != "otros") {
            throw new BadRequestException('El tipo de iniciativa debe ser proyecto, taller, charla u otros');
        }

        $iniciative->setName($dto->getName());
        $iniciative->setDescription($dto->getDescription());
        $iniciative->setStartDate($dto->getStartDate());
        $iniciative->setEndDate($dto->getEndDate());
        $iniciative->setHours($dto->getHours());
        $iniciative->setSchoolYear($dto->getSchoolYear());

        foreach ($iniciative->getTeacherIniciatives() as $teacherIniciative) {
            $this->entityManager->remove($teacherIniciative);
        }
        foreach ($iniciative->getCompanyIniciatives() as $companyIniciative) {
            $this->entityManager->remove($companyIniciative);
        }
        foreach ($iniciative->getModuleIniciatives() as $moduleIniciative) {
            $this->entityManager->remove($moduleIniciative);
        }
        foreach ($iniciative->getIniciativeGoals() as $goalIniciative) {
            $this->entityManager->remove($goalIniciative);
        }

        $this->entityManager->flush();

        $teachers = [];
        foreach ($dto->getTeachers() as $teacherId) {
            $teacher = $this->entityManager->getRepository(Teacher::class)->find($teacherId);
            if ($teacher) {
                $teacherIniciative = new TeacherIniciative();
                $teacherIniciative->setIdTeacher($teacher);
                $teacherIniciative->setIdIniciative($iniciative);
                $this->entityManager->persist($teacherIniciative);
                $teachers[] = ['id' => $teacher->getId(), 'name' => $teacher->getName()];
            }
        }

        $companies = [];
        foreach ($dto->getCompanies() as $companyId) {
            $company = $this->entityManager->getRepository(Company::class)->find($companyId);
            if ($company) {
                $companyIniciative = new CompanyIniciative();
                $companyIniciative->setIdCompany($company);
                $companyIniciative->setIdIniciative($iniciative);
                $this->entityManager->persist($companyIniciative);
                $companies[] = ['id' => $company->getId(), 'name' => $company->getName()];
            }
        }

        $modules = [];
        foreach ($dto->getModules() as $moduleId) {
            $module = $this->entityManager->getRepository(Module::class)->find($moduleId);
            if ($module) {
                $moduleIniciative = new ModuleIniciative();
                $moduleIniciative->setIdModule($module);
                $moduleIniciative->setIdIniciative($iniciative);
                $this->entityManager->persist($moduleIniciative);
                $modules[] = ['id' => $module->getId(), 'name' => $module->getName()];
            }
        }

        $goals = [];
        foreach ($dto->getGoals() as $goalId) {
            $goal = $this->entityManager->getRepository(Goal::class)->find($goalId);
            if ($goal) {
                $iniciativeGoal = new IniciativeGoal();
                $iniciativeGoal->setIdGoal($goal);
                $iniciativeGoal->setIdIniciative($iniciative);
                $this->entityManager->persist($iniciativeGoal);
                $goals[] = ['id' => $goal->getId(), 'description' => $goal->getDescription()];
            }
        }

        $this->entityManager->flush();

        return [
            'id' => $iniciative->getId(),
            'name' => $iniciative->getName(),
            'description' => $iniciative->getDescription(),
            'startDate' => $iniciative->getStartDate()->format('Y-m-d'),
            'endDate' => $iniciative->getEndDate() ? $iniciative->getEndDate()->format('Y-m-d') : null,
            'hours' => $iniciative->getHours(),
            'schoolYear' => $iniciative->getSchoolYear(),
            'teachers' => $teachers,
            'companies' => $companies,
            'modules' => $modules,
            'goals' => $goals,
        ];
    }

    public function deleteIniciative(int $id): bool
    {
        $iniciative = $this->entityManager->getRepository(Iniciative::class)->find($id);

        if (!$iniciative) {
            return false;
        }

        $this->entityManager->remove($iniciative);
        $this->entityManager->flush();

        return true;
    }

    public function countIniciatives(): int
    {
        return $this->entityManager->getRepository(Iniciative::class)->count();
    }

    public function getSchoolYears(): array
    {
        $iniciatives = $this->entityManager->getRepository(Iniciative::class)->findAll();
        $schoolYears = [];

        foreach ($iniciatives as $iniciative) {
            if (!in_array($iniciative->getSchoolYear(), $schoolYears)) {
                $schoolYears[] = $iniciative->getSchoolYear();
            }
        }

        rsort($schoolYears); // Sort the school years in descending order

        return $schoolYears;
    }
}
