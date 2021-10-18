<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\traits\Timer;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     formats={"json"},
 *     normalizationContext={"groups"={"user_read", "user_details_read"},"enable_max_depth"=true},
 *     denormalizationContext={"groups"={"user_read", "user_details_read"},"enable_max_depth"=true},
 *     collectionOperations={
 *      "get"={},
 *      "post"={},
 *       "create_user"={
 *          "method"="POST",
 *          "path"="/users/create",
 *          "controller"=App\Controller\Api\CreateUser::class
 *       }
 *     },
 *     itemOperations={
 *       "get"={},
 *       "patch"={},
 *       "put"={},
 *       "delete"={},
 *     }
 * )
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 */
class User implements UserInterface
{
    use Timer;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"user_read", "user_details_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user_read", "user_details_read"})
     */
    private $username;

    /**
     * @ORM\Column(type="string", length=188, unique=true)
     * @Groups({"user_read", "user_details_read"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"user_read", "user_details_read"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @Groups({"user_read", "user_details_read"})
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @var string The plain password before hashed
     */
    private $plainPassword;

    /**
     * @ORM\OneToMany(targetEntity=ResetPasswordRequest::class, mappedBy="user")
     */
    private $resetPasswordRequests;

    public function __construct()
    {
        $this->resetPasswordRequests = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    /**
     * @param mixed $plainPassword
     */
    public function setPlainPassword(string $plainPassword): void
    {
        $this->plainPassword = $plainPassword;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        //$this->plainPassword = null;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email): void
    {
        $this->email = $email;
    }

    /**
     * @return Collection|ResetPasswordRequest[]
     */
    public function getResetPasswordRequests(): Collection
    {
        return $this->resetPasswordRequests;
    }

    public function addResetPasswordRequest(ResetPasswordRequest $resetPasswordRequest): self
    {
        if (!$this->resetPasswordRequests->contains($resetPasswordRequest)) {
            $this->resetPasswordRequests[] = $resetPasswordRequest;
            $resetPasswordRequest->setUser($this);
        }

        return $this;
    }

    public function removeResetPasswordRequest(ResetPasswordRequest $resetPasswordRequest): self
    {
        if ($this->resetPasswordRequests->removeElement($resetPasswordRequest)) {
            // set the owning side to null (unless already changed)
            if ($resetPasswordRequest->getUser() === $this) {
                $resetPasswordRequest->setUser(null);
            }
        }

        return $this;
    }

}
