<?php
namespace Neoslive\Hybridsearch\Neos\Demo\Controller;

/*
 * This file is part of the Neoslive.Hybridsearch.Neos.Demo package.
 */

use TYPO3\Flow\Annotations as Flow;

class StandardController extends \TYPO3\Flow\Mvc\Controller\ActionController
{

    /**
     * @return void
     */
    public function indexAction()
    {
        $this->view->assign('foos', array(
            'bar', 'baz'
        ));
    }

}
