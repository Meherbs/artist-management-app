<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\traits\Timer;
use App\Repository\ConnectionsRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     formats={"json"},
 *     normalizationContext={"groups"={"connections_read", "connections_details_read", "representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"},"enable_max_depth"=true},
 *     denormalizationContext={"groups"={"connections_read", "connections_details_read", "representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"},"enable_max_depth"=true},
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
    use Timer;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @Groups({"connections_read", "connections_details_read", "representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"})
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"connections_read", "connections_details_read", "representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"})
     * @ORM\Column(type="boolean", options={"default":false})
     */
    private $isAgent;

    /**
     * @Groups({"connections_read", "connections_details_read", "representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"})
     * @ORM\Column(type="boolean", options={"default":false})
     */
    private $isPublicist;

    /**
     * @Groups({"connections_read", "connections_details_read", "representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"})
     * @ORM\Column(type="boolean", options={"default":false})
     */
    private $isManager;

    /**
     * @Groups({"connections_read", "connections_details_read", "representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"})
     * @ORM\ManyToOne(targetEntity=Representative::class, cascade={"all"}, inversedBy="celebrities")
     * @ORM\JoinColumn(name="representative", nullable=false)
     */
    private $representative;

    /**
     * @Groups({"connections_read", "connections_details_read", "representative_read", "representative_details_read", "celebrity_read", "celebrity_details_read"})
     * @ORM\ManyToOne(targetEntity=Celebrity::class, cascade={"all"}, inversedBy="representatives")
     * @ORM\JoinColumn(name="celebrity",nullable=false)
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
