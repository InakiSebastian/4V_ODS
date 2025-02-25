<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250225095004 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE module_iniciative (id INT AUTO_INCREMENT NOT NULL, id_module_id INT NOT NULL, id_iniciative_id INT NOT NULL, INDEX IDX_D68957232FF709B6 (id_module_id), INDEX IDX_D6895723D027DC85 (id_iniciative_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE module_iniciative ADD CONSTRAINT FK_D68957232FF709B6 FOREIGN KEY (id_module_id) REFERENCES module (id)');
        $this->addSql('ALTER TABLE module_iniciative ADD CONSTRAINT FK_D6895723D027DC85 FOREIGN KEY (id_iniciative_id) REFERENCES iniciative (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE module_iniciative DROP FOREIGN KEY FK_D68957232FF709B6');
        $this->addSql('ALTER TABLE module_iniciative DROP FOREIGN KEY FK_D6895723D027DC85');
        $this->addSql('DROP TABLE module_iniciative');
    }
}
