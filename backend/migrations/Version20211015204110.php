<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211015204110 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE connections CHANGE is_agent is_agent TINYINT(1) DEFAULT \'0\' NOT NULL, CHANGE is_publicist is_publicist TINYINT(1) DEFAULT \'0\' NOT NULL, CHANGE is_manager is_manager TINYINT(1) DEFAULT \'0\' NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE connections CHANGE is_agent is_agent TINYINT(1) NOT NULL, CHANGE is_publicist is_publicist TINYINT(1) NOT NULL, CHANGE is_manager is_manager TINYINT(1) NOT NULL');
    }
}
