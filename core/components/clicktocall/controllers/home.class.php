<?php

    /**
     * The home manager controller for ClickToCall.
     *
     */
    class ClickToCallHomeManagerController extends ClickToCallMainController
    {
        /* @var ClickToCall $ClickToCall */
        public $ClickToCall;


        /**
         * @param array $scriptProperties
         */
        public function process(array $scriptProperties = array())
        {
        }


        /**
         * @return null|string
         */
        public function getPageTitle()
        {
            return $this->modx->lexicon('clicktocall');
        }


        /**
         * @return void
         */
        public function loadCustomCssJs()
        {
            $this->addCss($this->ClickToCall->config['cssUrl'] . 'mgr/main.css');
            $this->addCss($this->ClickToCall->config['cssUrl'] . 'mgr/bootstrap.buttons.css');
            $this->addJavascript($this->ClickToCall->config['jsUrl'] . 'mgr/misc/utils.js');
            $this->addJavascript($this->ClickToCall->config['jsUrl'] . 'mgr/widgets/days.grid.js');
            $this->addJavascript($this->ClickToCall->config['jsUrl'] . 'mgr/widgets/home.panel.js');
            $this->addJavascript($this->ClickToCall->config['jsUrl'] . 'mgr/sections/home.js');
            $this->addHtml('<script type="text/javascript">
		Ext.onReady(function() {
			MODx.load({ xtype: "clicktocall-page-home"});
		});
		</script>');
        }


        /**
         * @return string
         */
        public function getTemplateFile()
        {
            return $this->ClickToCall->config['templatesPath'] . 'home.tpl';
        }
    }