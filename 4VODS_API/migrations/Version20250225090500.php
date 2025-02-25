<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250225090500 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE iniciative_goal (id INT AUTO_INCREMENT NOT NULL, id_iniciative_id INT NOT NULL, id_goal_id INT DEFAULT NULL, INDEX IDX_B57E1CE6D027DC85 (id_iniciative_id), INDEX IDX_B57E1CE6B8E0B38E (id_goal_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE iniciative_goal ADD CONSTRAINT FK_B57E1CE6D027DC85 FOREIGN KEY (id_iniciative_id) REFERENCES iniciative (id)');
        $this->addSql('ALTER TABLE iniciative_goal ADD CONSTRAINT FK_B57E1CE6B8E0B38E FOREIGN KEY (id_goal_id) REFERENCES goal (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE iniciative_goal DROP FOREIGN KEY FK_B57E1CE6D027DC85');
        $this->addSql('ALTER TABLE iniciative_goal DROP FOREIGN KEY FK_B57E1CE6B8E0B38E');
        $this->addSql('DROP TABLE iniciative_goal');
    }
}
