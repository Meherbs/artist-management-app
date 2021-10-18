<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211015201320 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE connections (id INT AUTO_INCREMENT NOT NULL, representative_id INT NOT NULL, celebrity_id INT NOT NULL, is_agent TINYINT(1) NOT NULL, is_publicist TINYINT(1) NOT NULL, is_manager TINYINT(1) NOT NULL, INDEX IDX_BFF6FC15FC3FF006 (representative_id), INDEX IDX_BFF6FC159D12EF95 (celebrity_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE connections ADD CONSTRAINT FK_BFF6FC15FC3FF006 FOREIGN KEY (representative_id) REFERENCES representative (id)');
        $this->addSql('ALTER TABLE connections ADD CONSTRAINT FK_BFF6FC159D12EF95 FOREIGN KEY (celebrity_id) REFERENCES celebrity (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE connections');
    }
}
