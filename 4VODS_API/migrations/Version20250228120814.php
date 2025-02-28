<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250228120814 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE company (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, _active TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE company_iniciative (id INT AUTO_INCREMENT NOT NULL, id_iniciative_id INT NOT NULL, id_company_id INT NOT NULL, _active TINYINT(1) NOT NULL, INDEX IDX_FEE29528D027DC85 (id_iniciative_id), INDEX IDX_FEE2952832119A01 (id_company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE degree (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, _active TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE diffusion (id INT AUTO_INCREMENT NOT NULL, iniciative_id INT NOT NULL, type VARCHAR(255) NOT NULL, link VARCHAR(255) NOT NULL, INDEX IDX_5938415B6E0F0DE0 (iniciative_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE goal (id INT AUTO_INCREMENT NOT NULL, id_ods_id INT DEFAULT NULL, description VARCHAR(255) NOT NULL, _active TINYINT(1) NOT NULL, INDEX IDX_FCDCEB2EE26F6B1C (id_ods_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE iniciative (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, start_date DATETIME NOT NULL, end_date DATETIME DEFAULT NULL, hours INT NOT NULL, _active TINYINT(1) NOT NULL, school_year VARCHAR(10) NOT NULL, innovative TINYINT(1) NOT NULL, type VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE iniciative_goal (id INT AUTO_INCREMENT NOT NULL, id_iniciative_id INT NOT NULL, id_goal_id INT DEFAULT NULL, _active TINYINT(1) NOT NULL, INDEX IDX_B57E1CE6D027DC85 (id_iniciative_id), INDEX IDX_B57E1CE6B8E0B38E (id_goal_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE module (id INT AUTO_INCREMENT NOT NULL, id_degree_id INT NOT NULL, name VARCHAR(255) NOT NULL, _active TINYINT(1) NOT NULL, INDEX IDX_C2426283369EB71 (id_degree_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE module_iniciative (id INT AUTO_INCREMENT NOT NULL, id_module_id INT NOT NULL, id_iniciative_id INT NOT NULL, _active TINYINT(1) NOT NULL, INDEX IDX_D68957232FF709B6 (id_module_id), INDEX IDX_D6895723D027DC85 (id_iniciative_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE ods (id INT AUTO_INCREMENT NOT NULL, description VARCHAR(255) NOT NULL, _active TINYINT(1) NOT NULL, dimension VARCHAR(50) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE teacher (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, _active TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE teacher_iniciative (id INT AUTO_INCREMENT NOT NULL, id_teacher_id INT NOT NULL, id_iniciative_id INT NOT NULL, _active TINYINT(1) NOT NULL, INDEX IDX_C973DE1EE40AFECA (id_teacher_id), INDEX IDX_C973DE1ED027DC85 (id_iniciative_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE teacher_module (id INT AUTO_INCREMENT NOT NULL, id_module_id INT NOT NULL, id_teacher_id INT NOT NULL, _active TINYINT(1) NOT NULL, INDEX IDX_19AFF4DD2FF709B6 (id_module_id), INDEX IDX_19AFF4DDE40AFECA (id_teacher_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE company_iniciative ADD CONSTRAINT FK_FEE29528D027DC85 FOREIGN KEY (id_iniciative_id) REFERENCES iniciative (id)');
        $this->addSql('ALTER TABLE company_iniciative ADD CONSTRAINT FK_FEE2952832119A01 FOREIGN KEY (id_company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE diffusion ADD CONSTRAINT FK_5938415B6E0F0DE0 FOREIGN KEY (iniciative_id) REFERENCES iniciative (id)');
        $this->addSql('ALTER TABLE goal ADD CONSTRAINT FK_FCDCEB2EE26F6B1C FOREIGN KEY (id_ods_id) REFERENCES ods (id)');
        $this->addSql('ALTER TABLE iniciative_goal ADD CONSTRAINT FK_B57E1CE6D027DC85 FOREIGN KEY (id_iniciative_id) REFERENCES iniciative (id)');
        $this->addSql('ALTER TABLE iniciative_goal ADD CONSTRAINT FK_B57E1CE6B8E0B38E FOREIGN KEY (id_goal_id) REFERENCES goal (id)');
        $this->addSql('ALTER TABLE module ADD CONSTRAINT FK_C2426283369EB71 FOREIGN KEY (id_degree_id) REFERENCES degree (id)');
        $this->addSql('ALTER TABLE module_iniciative ADD CONSTRAINT FK_D68957232FF709B6 FOREIGN KEY (id_module_id) REFERENCES module (id)');
        $this->addSql('ALTER TABLE module_iniciative ADD CONSTRAINT FK_D6895723D027DC85 FOREIGN KEY (id_iniciative_id) REFERENCES iniciative (id)');
        $this->addSql('ALTER TABLE teacher_iniciative ADD CONSTRAINT FK_C973DE1EE40AFECA FOREIGN KEY (id_teacher_id) REFERENCES teacher (id)');
        $this->addSql('ALTER TABLE teacher_iniciative ADD CONSTRAINT FK_C973DE1ED027DC85 FOREIGN KEY (id_iniciative_id) REFERENCES iniciative (id)');
        $this->addSql('ALTER TABLE teacher_module ADD CONSTRAINT FK_19AFF4DD2FF709B6 FOREIGN KEY (id_module_id) REFERENCES module (id)');
        $this->addSql('ALTER TABLE teacher_module ADD CONSTRAINT FK_19AFF4DDE40AFECA FOREIGN KEY (id_teacher_id) REFERENCES teacher (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE company_iniciative DROP FOREIGN KEY FK_FEE29528D027DC85');
        $this->addSql('ALTER TABLE company_iniciative DROP FOREIGN KEY FK_FEE2952832119A01');
        $this->addSql('ALTER TABLE diffusion DROP FOREIGN KEY FK_5938415B6E0F0DE0');
        $this->addSql('ALTER TABLE goal DROP FOREIGN KEY FK_FCDCEB2EE26F6B1C');
        $this->addSql('ALTER TABLE iniciative_goal DROP FOREIGN KEY FK_B57E1CE6D027DC85');
        $this->addSql('ALTER TABLE iniciative_goal DROP FOREIGN KEY FK_B57E1CE6B8E0B38E');
        $this->addSql('ALTER TABLE module DROP FOREIGN KEY FK_C2426283369EB71');
        $this->addSql('ALTER TABLE module_iniciative DROP FOREIGN KEY FK_D68957232FF709B6');
        $this->addSql('ALTER TABLE module_iniciative DROP FOREIGN KEY FK_D6895723D027DC85');
        $this->addSql('ALTER TABLE teacher_iniciative DROP FOREIGN KEY FK_C973DE1EE40AFECA');
        $this->addSql('ALTER TABLE teacher_iniciative DROP FOREIGN KEY FK_C973DE1ED027DC85');
        $this->addSql('ALTER TABLE teacher_module DROP FOREIGN KEY FK_19AFF4DD2FF709B6');
        $this->addSql('ALTER TABLE teacher_module DROP FOREIGN KEY FK_19AFF4DDE40AFECA');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE company_iniciative');
        $this->addSql('DROP TABLE degree');
        $this->addSql('DROP TABLE diffusion');
        $this->addSql('DROP TABLE goal');
        $this->addSql('DROP TABLE iniciative');
        $this->addSql('DROP TABLE iniciative_goal');
        $this->addSql('DROP TABLE module');
        $this->addSql('DROP TABLE module_iniciative');
        $this->addSql('DROP TABLE ods');
        $this->addSql('DROP TABLE teacher');
        $this->addSql('DROP TABLE teacher_iniciative');
        $this->addSql('DROP TABLE teacher_module');
    }
}
