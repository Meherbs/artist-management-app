<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\traits\Timer;
use App\Repository\CelebrityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     formats={"json"},
 *     normalizationContext={"groups"={"connections_read", "connections_details_read", "celebrity_read", "celebrity_details_read"},"enable_max_depth"=true},
 *     denormalizationContext={"groups"={"connections_read", "connections_details_read", "celebrity_read", "celebrity_details_read"},"enable_max_depth"=true},
 *     collectionOperations={
 *      "get"={},
 *      "post"={}
 *     },
 *     itemOperations={
 *       "get"={},
 *       "patch"={},
 *       "put"={},
 *       "delete"={},
 *     }
 * )
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Entity(repositoryClass=CelebrityRepository::class)
 */
class Celebrity
{
    use Timer;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @Groups({"celebrity_read", "celebrity_details_read"})
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"celebrity_read", "celebrity_details_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="date")
     * @Groups({"celebrity_read", "celebrity_details_read"})
     */
    private $birthday;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"celebrity_read", "celebrity_details_read"})
     */
    private $bio;

    /**
     * @ORM\OneToMany(targetEntity=Connections::class, mappedBy="celebrity", orphanRemoval=true)
     */
    private $representatives;

    public function __construct()
    {
        $this->connections = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getBirthday(): ?\DateTimeInterface
    {
        return $this->birthday;
    }

    public function setBirthday(\DateTimeInterface $birthday): self
    {
        $this->birthday = $birthday;

        return $this;
    }

    public function getBio(): ?string
    {
        return $this->bio;
    }

    public function setBio(string $bio): self
    {
        $this->bio = $bio;

        return $this;
    }

    /**
     * @return Collection|Connections[]
     */
    public function getConnections(): Collection
    {
        return $this->representatives;
    }

    public function addConnection(Connections $connection): self
    {
        if (!$this->representatives->contains($connection)) {
            $this->representatives[] = $connection;
            $connection->setCelebrity($this);
        }

        return $this;
    }

    public function removeConnection(Connections $connection): self
    {
        if ($this->representatives->removeElement($connection)) {
            // set the owning side to null (unless already changed)
            if ($connection->getCelebrity() === $this) {
                $connection->setCelebrity(null);
            }
        }

        return $this;
    }
}
