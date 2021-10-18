<?php

namespace App\Entity\traits;

use Symfony\Component\Serializer\Annotation\Groups;

trait Timer {
    /**
     * @Groups({"celebrity_read", "celebrity_details_read","representative_read", "representative_details_read",  "user_read", "user_details_read"})
     * @ORM\Column(type="datetime")
     */
    private $createdAt;
    /**
     * @Groups({"celebrity_read", "celebrity_details_read","representative_read", "representative_details_read", "user_read", "user_details_read"})
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeInterface $updatedAt): self
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    /**
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function updateTimer(){
        if ($this->getCreatedAt() == null){
            $this->setCreatedAt(new \DateTimeImmutable());
        }else{
            $this->setUpdatedAt(new \DateTimeImmutable());
        }
    }
}