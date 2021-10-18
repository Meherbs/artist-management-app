<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     formats={"json"},
 *     attributes={"order"={"createdAt"="DESC"}},
 *     normalizationContext={"groups"={"logs_read","logs_details_read"},"enable_max_depth"=true},
 *     denormalizationContext={"groups"={"logs_read","logs_details_read"},"enable_max_depth"=true},
 *     collectionOperations={
 *      "get"={},
 *      "post"={},
 *     },
 *     itemOperations={
 *       "get"={},
 *       "patch"={},
 *       "put"={},
 *       "delete"={},
 *     }
 * )
 * @ORM\Entity(repositoryClass="App\Repository\LogRepository")
 * @ORM\HasLifecycleCallbacks
 */
class Log
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"logs_read","logs_details_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"logs_read","logs_details_read"})
     */
    private $message;

    /**
     * @Groups({"logs_read","logs_details_read"})
     * @ORM\Column(type="array")
     */
    private $context = [];

    /**
     * @Groups({"logs_read","logs_details_read"})
     * @ORM\Column(type="smallint")
     */
    private $level;

    /**
     * @Groups({"logs_read","logs_details_read"})
     * @ORM\Column(type="string", length=50)
     */
    private $levelName;

    /**
     * @Groups({"logs_read","logs_details_read"})
     * @ORM\Column(type="array", nullable=true)
     */
    private $extra = [];

    /**
     * @Groups({"logs_read","logs_details_read"})
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @Groups({"logs_read","logs_details_read"})
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="logs")
     */
    private $user;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(string $message): self
    {
        $this->message = $message;

        return $this;
    }

    public function getContext(): ?array
    {
        return $this->context;
    }

    public function setContext(array $context): self
    {
        $this->context = $context;

        return $this;
    }

    public function getLevel(): ?int
    {
        return $this->level;
    }

    public function setLevel(int $level): self
    {
        $this->level = $level;

        return $this;
    }

    public function getLevelName(): ?string
    {
        return $this->levelName;
    }

    public function setLevelName(string $levelName): self
    {
        $this->levelName = $levelName;

        return $this;
    }

    public function getExtra(): ?array
    {
        return $this->extra;
    }

    public function setExtra(?array $extra): self
    {
        $this->extra = $extra;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @ORM\PrePersist
     *
     * @return void
     */
    public function onPrePersist()
    {
        $this->createdAt = new DateTime();
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}