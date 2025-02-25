<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250225094608 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE company_iniciative (id INT AUTO_INCREMENT NOT NULL, id_iniciative_id INT NOT NULL, id_company_id INT NOT NULL, INDEX IDX_FEE29528D027DC85 (id_iniciative_id), INDEX IDX_FEE2952832119A01 (id_company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE teacher_iniciative (id INT AUTO_INCREMENT NOT NULL, id_teacher_id INT NOT NULL, id_iniciative_id INT NOT NULL, INDEX IDX_C973DE1EE40AFECA (id_teacher_id), INDEX IDX_C973DE1ED027DC85 (id_iniciative_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE teacher_module (id INT AUTO_INCREMENT NOT NULL, id_module_id INT NOT NULL, id_teacher_id INT NOT NULL, INDEX IDX_19AFF4DD2FF709B6 (id_module_id), INDEX IDX_19AFF4DDE40AFECA (id_teacher_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE company_iniciative ADD CONSTRAINT FK_FEE29528D027DC85 FOREIGN KEY (id_iniciative_id) REFERENCES iniciative (id)');
        $this->addSql('ALTER TABLE company_iniciative ADD CONSTRAINT FK_FEE2952832119A01 FOREIGN KEY (id_company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE teacher_iniciative ADD CONSTRAINT FK_C973DE1EE40AFECA FOREIGN KEY (id_teacher_id) REFERENCES teacher (id)');
        $this->addSql('ALTER TABLE teacher_iniciative ADD CONSTRAINT FK_C973DE1ED027DC85 FOREIGN KEY (id_iniciative_id) REFERENCES iniciative (id)');
        $this->addSql('ALTER TABLE teacher_module ADD CONSTRAINT FK_19AFF4DD2FF709B6 FOREIGN KEY (id_module_id) REFERENCES module (id)');
        $this->addSql('ALTER TABLE teacher_module ADD CONSTRAINT FK_19AFF4DDE40AFECA FOREIGN KEY (id_teacher_id) REFERENCES teacher (id)');
        $this->addSql('ALTER TABLE module ADD id_degree_id INT NOT NULL');
        $this->addSql('ALTER TABLE module ADD CONSTRAINT FK_C2426283369EB71 FOREIGN KEY (id_degree_id) REFERENCES degree (id)');
        $this->addSql('CREATE INDEX IDX_C2426283369EB71 ON module (id_degree_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE company_iniciative DROP FOREIGN KEY FK_FEE29528D027DC85');
        $this->addSql('ALTER TABLE company_iniciative DROP FOREIGN KEY FK_FEE2952832119A01');
        $this->addSql('ALTER TABLE teacher_iniciative DROP FOREIGN KEY FK_C973DE1EE40AFECA');
        $this->addSql('ALTER TABLE teacher_iniciative DROP FOREIGN KEY FK_C973DE1ED027DC85');
        $this->addSql('ALTER TABLE teacher_module DROP FOREIGN KEY FK_19AFF4DD2FF709B6');
        $this->addSql('ALTER TABLE teacher_module DROP FOREIGN KEY FK_19AFF4DDE40AFECA');
        $this->addSql('DROP TABLE company_iniciative');
        $this->addSql('DROP TABLE teacher_iniciative');
        $this->addSql('DROP TABLE teacher_module');
        $this->addSql('ALTER TABLE module DROP FOREIGN KEY FK_C2426283369EB71');
        $this->addSql('DROP INDEX IDX_C2426283369EB71 ON module');
        $this->addSql('ALTER TABLE module DROP id_degree_id');
    }
}
