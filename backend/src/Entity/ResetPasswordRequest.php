<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ResetPasswordRequestRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=ResetPasswordRequestRepository::class)
 */
class ResetPasswordRequest
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateAdd;

    /**
     * @ORM\Column(type="datetime")
     */
    private $expireAt;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $token;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="resetPasswordRequests")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $requestedBy;

    /**
     * ResetPasswordRequest constructor.
     */
    public function __construct()
    {
        $this->dateAdd = new \DateTime();
        $this->expireAt = new \DateTime();
        $this->expireAt->add(new \DateInterval('PT' . 15 . 'M'));
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateAdd(): ?\DateTimeInterface
    {
        return $this->dateAdd;
    }

    public function setDateAdd(\DateTimeInterface $dateAdd): self
    {
        $this->dateAdd = $dateAdd;

        return $this;
    }

    public function getExpireAt(): ?\DateTimeInterface
    {
        return $this->expireAt;
    }

    public function setExpireAt(\DateTimeInterface $expireAt): self
    {
        $this->expireAt = $expireAt;

        return $this;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): self
    {
        $this->token = $token;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
        $this->setRequestedBy($user->getUsername());
        return $this;
        //$token = sha1(uniqid($user->getUsername(), true));
        //$this->setToken($token);
    }

    /**
     * @return mixed
     */
    public function getRequestedBy()
    {
        return $this->requestedBy;
    }

    /**
     * @param mixed $requestedBy
     */
    public function setRequestedBy($requestedBy): void
    {
        $this->requestedBy = $requestedBy;
    }
}
