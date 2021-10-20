<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\EmailAdressRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

/**
/**
 * @ApiResource(
 *     formats={"json"},
 *     normalizationContext={"groups"={"connections_read", "connections_details_read", "representative_read", "representative_details_read"},"enable_max_depth"=true},
 *     denormalizationContext={"groups"={"connections_read", "connections_details_read", "representative_read", "representative_details_read"},"enable_max_depth"=true},
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
 *
 * @ORM\Entity(repositoryClass=EmailAdressRepository::class)
 */
class EmailAdress
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"connections_read", "connections_details_read", "representative_read", "representative_details_read"})
     * @ORM\Column(type="string", length=255)
     */
    private $adress;

    /**
     * @ORM\ManyToOne(targetEntity=Representative::class, inversedBy="emails", cascade={"all"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $representative;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress(string $adress): self
    {
        $this->adress = $adress;

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

    public function __toString()
    {
        return $this->adress;
    }


}
