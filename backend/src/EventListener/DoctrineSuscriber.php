<?php

namespace App\EventListener;

use App\Entity\Log;
use App\Entity\ResetPasswordRequest;
use App\Entity\User;
use Doctrine\ORM\Events;
use Psr\Log\LoggerInterface;
use Doctrine\Common\EventSubscriber;
use Doctrine\Persistence\Event\LifecycleEventArgs;

class DoctrineSuscriber implements EventSubscriber
{
    private $logger;

    public function __construct(LoggerInterface $dbLogger)
    {
        $this->logger = $dbLogger;
    }

    public function getSubscribedEvents()
    {
        return [
            Events::postPersist,
            Events::postUpdate,
            Events::postRemove
        ];
    }

    public function postPersist(LifecycleEventArgs $args)
    {
        $this->log('created', $args);
    }

    public function postUpdate(LifecycleEventArgs $args)
    {
        $this->log('updated', $args);
    }

    public function postRemove(LifecycleEventArgs $args)
    {
        $this->log('deleted', $args);
    }

    public function log($message, $args)
    {
        $entity = $args->getEntity();
        $message = $this->getNameClass($entity)." with id ".$entity->getId()." has been ".$message." by ";
        if (!($entity instanceof Log)) {
            if($entity instanceof ResetPasswordRequest ){
                $message = "A reset password request has been asked by ";
                $this->logger->info($message,[
                    'requestedBy' => $entity->getRequestedBy()
                ]);
            }else{
                if($entity instanceof User){
                    $this->logger->info($message,[
                        'requestedBy' => $entity->getUsername()
                    ]);
                }else
                    $this->logger->info($message);
            }
        }
    }

    private function getNameClass($obj){
        $tab = explode("\\", get_class($obj));
        return $tab[count($tab)-1];
    }

}