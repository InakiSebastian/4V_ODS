<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250228111518 extends AbstractMigration
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
        $this->addSql('ALTER TABLE iniciative ADD type VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE diffusion DROP FOREIGN KEY FK_5938415B6E0F0DE0');
        $this->addSql('DROP TABLE diffusion');
        $this->addSql('ALTER TABLE iniciative DROP type');
    }
}
