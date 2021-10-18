<?php
namespace App\Entity\traits;
use Symfony\Component\Serializer\Annotation\Groups;

trait Tier {

    use Timer;

    /**
     * @ORM\Column(type="string", length=30, unique=false)
     * @Groups({"ouvrier_read", "ouvrier_details_read", "personne_read", "personne_details_read", "user_personne"})
     */
    private $nom;
    /**
     * @Groups({"ouvrier_read", "ouvrier_details_read", "personne_read", "personne_details_read", "user_personne"})
     * @ORM\Column(type="string", length=30, unique=false)
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=8, unique=false)
     * @Groups({"ouvrier_read", "ouvrier_details_read", "personne_read", "personne_details_read", "user_personne"})
     */
    private $cin;

    /**
     * @ORM\Column(type="string", length=30, unique=false)
     * @Groups({"ouvrier_read", "ouvrier_details_read", "personne_read", "personne_details_read", "user_personne"})
     */
    private $mobile;

    /**
     * @Groups({"ouvrier_read", "ouvrier_details_read", "personne_read", "personne_details_read", "user_personne"})
     * @ORM\Column(type="string", length=255, unique=false)
     */
    private $address;

    /**
     * @return mixed
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * @param mixed $nom
     */
    public function setNom($nom): void
    {
        $this->nom = $nom;
    }

    /**
     * @return mixed
     */
    public function getPrenom()
    {
        return $this->prenom;
    }

    /**
     * @param mixed $prenom
     */
    public function setPrenom($prenom): void
    {
        $this->prenom = $prenom;
    }

    /**
     * @return mixed
     */
    public function getCin()
    {
        return $this->cin;
    }

    /**
     * @param mixed $cin
     */
    public function setCin($cin): void
    {
        $this->cin = $cin;
    }

    /**
     * @return mixed
     */
    public function getMobile()
    {
        return $this->mobile;
    }

    /**
     * @param mixed $mobile
     */
    public function setMobile($mobile): void
    {
        $this->mobile = $mobile;
    }

    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed $address
     */
    public function setAddress($address): void
    {
        $this->address = $address;
    }

}