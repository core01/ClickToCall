<?php

    /**
     * Update an Item
     */
    class ClickToCallHoursUpdateProcessor extends modObjectUpdateProcessor
    {
        public $objectType = 'ClickToCallHours';
        public $classKey = 'ClickToCallHours';
        public $languageTopics = array('clicktocall');

        //public $permission = 'save';

        public function initialize()
        {

            $data = $this->getProperties();
            if (is_array($data['data'])) {
                $data = $data['data'];
            } else {
                $data = $this->modx->fromJSON($data['data']);
            }
            foreach ($data as $key => $prop) {
                $this->setProperty($key, $prop);
            }


            return parent::initialize();
        }

        /**
         * We doing special check of permission
         * because of our objects is not an instances of modAccessibleObject
         *
         * @return bool|string
         */
        public function beforeSave()
        {
            if (!$this->checkPermissions()) {
                return $this->modx->lexicon('access_denied');
            }
            return true;
        }


        /**
         * @return bool
         */
        public function beforeSet()
        {
            $id = (int)$this->getProperty('id');
            if (empty($id)) {
                return $this->modx->lexicon('clicktocall_item_err_ns');
            }

            return parent::beforeSet();
        }
    }

    return 'ClickToCallHoursUpdateProcessor';
