<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\ConnectionsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     formats={"json"},
 *     normalizationContext={"groups"={"representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"},"enable_max_depth"=true},
 *     denormalizationContext={"groups"={"representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"},"enable_max_depth"=true},
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
 * @ORM\HasLifecycleCallbacks()
 * @ORM\Entity(repositoryClass=ConnectionsRepository::class)
 */
class Connections
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"})
     * @ORM\Column(type="boolean", options={"default":false})
     */
    private $isAgent;

    /**
     * @Groups({"representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"})
     * @ORM\Column(type="boolean", options={"default":false})
     */
    private $isPublicist;

    /**
     * @Groups({"representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"})
     * @ORM\Column(type="boolean", options={"default":false})
     */
    private $isManager;

    /**
     * @Groups({"representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"})
     * @ORM\ManyToOne(targetEntity=Representative::class, inversedBy="connections")
     * @ORM\JoinColumn(nullable=false)
     */
    private $representative;

    /**
     * @Groups({"representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"})
     * @ORM\ManyToOne(targetEntity=Celebrity::class, inversedBy="connections")
     * @ORM\JoinColumn(nullable=false)
     */
    private $celebrity;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsAgent(): ?bool
    {
        return $this->isAgent;
    }

    public function setIsAgent(bool $isAgent): self
    {
        $this->isAgent = $isAgent;

        return $this;
    }

    public function getIsPublicist(): ?bool
    {
        return $this->isPublicist;
    }

    public function setIsPublicist(bool $isPublicist): self
    {
        $this->isPublicist = $isPublicist;

        return $this;
    }

    public function getIsManager(): ?bool
    {
        return $this->isManager;
    }

    public function setIsManager(bool $isManager): self
    {
        $this->isManager = $isManager;

        return $this;
    }

    public function getRepresentative(): ?Representative
    {
        return $this->representative;
    }

    public function setRepresentative(?Representative $representative): self
    {
        $this->representative = $representative;

        return $this;
    }

    public function getCelebrity(): ?Celebrity
    {
        return $this->celebrity;
    }

    public function setCelebrity(?Celebrity $celebrity): self
    {
        $this->celebrity = $celebrity;

        return $this;
    }
}
