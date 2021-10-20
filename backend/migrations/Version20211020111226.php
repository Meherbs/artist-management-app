<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211020111226 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE celebrity (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, birthday DATE NOT NULL, bio VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE connections (id INT AUTO_INCREMENT NOT NULL, representative INT NOT NULL, celebrity INT NOT NULL, is_agent TINYINT(1) DEFAULT \'0\' NOT NULL, is_publicist TINYINT(1) DEFAULT \'0\' NOT NULL, is_manager TINYINT(1) DEFAULT \'0\' NOT NULL, INDEX IDX_BFF6FC152507390E (representative), INDEX IDX_BFF6FC1588B7697 (celebrity), UNIQUE INDEX assignment_unique (representative, celebrity), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE email_adress (id INT AUTO_INCREMENT NOT NULL, representative_id INT NOT NULL, adress VARCHAR(255) NOT NULL, INDEX IDX_2176144EFC3FF006 (representative_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE log (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, message LONGTEXT NOT NULL, context LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', level SMALLINT NOT NULL, level_name VARCHAR(50) NOT NULL, extra LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\', created_at DATETIME NOT NULL, done_by VARCHAR(255) NOT NULL, INDEX IDX_8F3F68C5A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE representative (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, company VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE reset_password_request (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, date_add DATETIME NOT NULL, expire_at DATETIME NOT NULL, token VARCHAR(255) NOT NULL, requested_by VARCHAR(255) NOT NULL, INDEX IDX_7CE748AA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `user` (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, email VARCHAR(188) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE connections ADD CONSTRAINT FK_BFF6FC152507390E FOREIGN KEY (representative) REFERENCES representative (id)');
        $this->addSql('ALTER TABLE connections ADD CONSTRAINT FK_BFF6FC1588B7697 FOREIGN KEY (celebrity) REFERENCES celebrity (id)');
        $this->addSql('ALTER TABLE email_adress ADD CONSTRAINT FK_2176144EFC3FF006 FOREIGN KEY (representative_id) REFERENCES representative (id)');
        $this->addSql('ALTER TABLE log ADD CONSTRAINT FK_8F3F68C5A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE reset_password_request ADD CONSTRAINT FK_7CE748AA76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE connections DROP FOREIGN KEY FK_BFF6FC1588B7697');
        $this->addSql('ALTER TABLE connections DROP FOREIGN KEY FK_BFF6FC152507390E');
        $this->addSql('ALTER TABLE email_adress DROP FOREIGN KEY FK_2176144EFC3FF006');
        $this->addSql('ALTER TABLE log DROP FOREIGN KEY FK_8F3F68C5A76ED395');
        $this->addSql('ALTER TABLE reset_password_request DROP FOREIGN KEY FK_7CE748AA76ED395');
        $this->addSql('DROP TABLE celebrity');
        $this->addSql('DROP TABLE connections');
        $this->addSql('DROP TABLE email_adress');
        $this->addSql('DROP TABLE log');
        $this->addSql('DROP TABLE representative');
        $this->addSql('DROP TABLE reset_password_request');
        $this->addSql('DROP TABLE `user`');
    }
}
