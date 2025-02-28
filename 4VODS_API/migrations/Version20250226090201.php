<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250226090201 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE diffusion (id INT AUTO_INCREMENT NOT NULL, iniciative_id INT NOT NULL, type VARCHAR(255) NOT NULL, link VARCHAR(255) NOT NULL, INDEX IDX_5938415B6E0F0DE0 (iniciative_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE diffusion ADD CONSTRAINT FK_5938415B6E0F0DE0 FOREIGN KEY (iniciative_id) REFERENCES iniciative (id)');
        $this->addSql('ALTER TABLE company ADD _active TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE company_iniciative ADD _active TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE degree ADD _active TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE goal ADD _active TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE iniciative ADD _active TINYINT(1) NOT NULL, ADD school_year VARCHAR(10) NOT NULL, ADD innovative TINYINT(1) NOT NULL, ADD type VARCHAR(255) NOT NULL, CHANGE end_date end_date DATETIME DEFAULT NULL, CHANGE start_day start_date DATETIME NOT NULL');
        $this->addSql('ALTER TABLE iniciative_goal ADD _active TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE module ADD _active TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE module_iniciative ADD _active TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE ods ADD _active TINYINT(1) NOT NULL, ADD dimension VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE teacher ADD _active TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE teacher_iniciative ADD _active TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE teacher_module ADD _active TINYINT(1) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE diffusion DROP FOREIGN KEY FK_5938415B6E0F0DE0');
        $this->addSql('DROP TABLE diffusion');
        $this->addSql('ALTER TABLE company DROP _active');
        $this->addSql('ALTER TABLE company_iniciative DROP _active');
        $this->addSql('ALTER TABLE degree DROP _active');
        $this->addSql('ALTER TABLE goal DROP _active');
        $this->addSql('ALTER TABLE iniciative DROP _active, DROP school_year, DROP innovative, DROP type, CHANGE end_date end_date DATETIME NOT NULL, CHANGE start_date start_day DATETIME NOT NULL');
        $this->addSql('ALTER TABLE iniciative_goal DROP _active');
        $this->addSql('ALTER TABLE module DROP _active');
        $this->addSql('ALTER TABLE module_iniciative DROP _active');
        $this->addSql('ALTER TABLE ods DROP _active, DROP dimension');
        $this->addSql('ALTER TABLE teacher DROP _active');
        $this->addSql('ALTER TABLE teacher_iniciative DROP _active');
        $this->addSql('ALTER TABLE teacher_module DROP _active');
    }
}
