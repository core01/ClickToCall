<?php

    /**
     * The base class for ClickToCall.
     */
    class ClickToCall
    {
        /* @var modX $modx */
        public $modx;


        /**
         * @param modX $modx
         * @param array $config
         */
        function __construct(modX &$modx, array $config = array())
        {
            $this->modx =& $modx;

            $corePath = $this->modx->getOption('clicktocall_core_path', $config,
                $this->modx->getOption('core_path') . 'components/clicktocall/');
            $assetsUrl = $this->modx->getOption('clicktocall_assets_url', $config,
                $this->modx->getOption('assets_url') . 'components/clicktocall/');
            $connectorUrl = $assetsUrl . 'connector.php';

            $this->config = array_merge(array(
                'assetsUrl'    => $assetsUrl,
                'cssUrl'       => $assetsUrl . 'css/',
                'jsUrl'        => $assetsUrl . 'js/',
                'imagesUrl'    => $assetsUrl . 'images/',
                'connectorUrl' => $connectorUrl,

                'corePath'       => $corePath,
                'modelPath'      => $corePath . 'model/',
                'chunksPath'     => $corePath . 'elements/chunks/',
                'templatesPath'  => $corePath . 'elements/templates/',
                'chunkSuffix'    => '.chunk.tpl',
                'snippetsPath'   => $corePath . 'elements/snippets/',
                'processorsPath' => $corePath . 'processors/'
            ), $config);

            $this->modx->addPackage('clicktocall', $this->config['modelPath']);
            $this->modx->lexicon->load('clicktocall:default');
        }

        public function clickToCallShow($tpl, $phone, $elementId)
        {
            $mobileDetect = $this->modx->getOption('clicktocall_mobiledetect');
            if ($mobileDetect) {
                $this->modx->regClientScript($this->config['jsUrl'] . "plugins/mobile-detect.min.js");
            }
            $this->modx->regClientScript($this->config['jsUrl'] . "clicktocall.js");
            $this->modx->regClientCSS($this->config['cssUrl'] . "clicktocall.css");
            return $this->modx->parseChunk($tpl, array(
                'phone'     => $phone,
                'elementId' => $elementId,
            ));
        }
    }