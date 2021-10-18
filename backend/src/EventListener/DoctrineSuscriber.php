<?php

namespace App\EventListener;

use App\Entity\Log;
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
        $message = $this->getNameClass($entity)." with id ".$entity->getId()." ".$message;
        if (!($entity instanceof Log)) {
            $this->logger->info($message);
        }
    }

    private function getNameClass($obj){
        $tab = explode("\\", get_class($obj));
        return $tab[count($tab)-1];
    }

}