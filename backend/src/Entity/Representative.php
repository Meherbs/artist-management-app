<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\traits\Timer;
use App\Repository\RepresentativeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     formats={"json"},
 *     normalizationContext={"groups"={"representative_read", "representative_details_read"},"enable_max_depth"=true},
 *     denormalizationContext={"groups"={"representative_read", "representative_details_read"},"enable_max_depth"=true},
 *     collectionOperations={
 *      "get"={},
 *      "post"={},
 *      "create_representative"={
 *          "method"="POST",
 *          "path"="/representatives/create",
 *          "controller"=App\Controller\Api\CreateRepresentative::class
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
 * @ORM\Entity(repositoryClass=RepresentativeRepository::class)
 */
class Representative
{
    use Timer;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"representative_read", "representative_details_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"representative_read", "representative_details_read"})
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"representative_read", "representative_details_read"})
     */
    private $company;

    /**
     * @Groups({"representative_read", "representative_details_read"})
     * @ORM\OneToMany(targetEntity=EmailAdress::class, mappedBy="representative", orphanRemoval=true)
     */
    private $emails;

    /**
     * @ORM\OneToMany(targetEntity=Connections::class, mappedBy="representative", orphanRemoval=true)
     */
    private $celebrities;

    public function __construct()
    {
        $this->emails = new ArrayCollection();
        $this->celebrity = new ArrayCollection();
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

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(string $company): self
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection|EmailAdress[]
     */
    public function getEmails(): Collection
    {
        return $this->emails;
    }

    public function addEmail(EmailAdress $email): self
    {
        if (!$this->emails->contains($email)) {
            $this->emails[] = $email;
            $email->setRepresentative($this);
        }

        return $this;
    }

    /**
     * @param mixed $emails
     */
    public function setEmails($emails): void
    {
        $this->emails = $emails;
    }

    public function removeEmail(EmailAdress $email): self
    {
        if ($this->emails->removeElement($email)) {
            // set the owning side to null (unless already changed)
            if ($email->getRepresentative() === $this) {
                $email->setRepresentative(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Connections[]
     */
    public function getCelebrities(): Collection
    {
        return $this->celebrities;
    }

    public function addCelebrities(Connections $celebrity): self
    {
        if (!$this->celebrities->contains($celebrity)) {
            $this->celebrities[] = $celebrity;
            $celebrity->setRepresentative($this);
        }

        return $this;
    }

    public function removeCelebrities(Connections $celebrity): self
    {
        if ($this->celebrities->removeElement($celebrity)) {
            // set the owning side to null (unless already changed)
            if ($celebrity->getRepresentative() === $this) {
                $celebrity->setRepresentative(null);
            }
        }

        return $this;
    }
}
