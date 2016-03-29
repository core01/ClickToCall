<?php

/**
 * Class ClickToCallMainController
 */
abstract class ClickToCallMainController extends modExtraManagerController {
	/** @var ClickToCall $ClickToCall */
	public $ClickToCall;


	/**
	 * @return void
	 */
	public function initialize() {
		$corePath = $this->modx->getOption('clicktocall_core_path', null, $this->modx->getOption('core_path') . 'components/clicktocall/');
		require_once $corePath . 'model/clicktocall/clicktocall.class.php';

		$this->ClickToCall = new ClickToCall($this->modx);
		//$this->addCss($this->ClickToCall->config['cssUrl'] . 'mgr/main.css');
		$this->addJavascript($this->ClickToCall->config['jsUrl'] . 'mgr/clicktocall.js');
		$this->addHtml('
		<script type="text/javascript">
			ClickToCall.config = ' . $this->modx->toJSON($this->ClickToCall->config) . ';
			ClickToCall.config.connector_url = "' . $this->ClickToCall->config['connectorUrl'] . '";
		</script>
		');

		parent::initialize();
	}


	/**
	 * @return array
	 */
	public function getLanguageTopics() {
		return array('clicktocall:default');
	}


	/**
	 * @return bool
	 */
	public function checkPermissions() {
		return true;
	}
}


/**
 * Class IndexManagerController
 */
class IndexManagerController extends ClickToCallMainController {

	/**
	 * @return string
	 */
	public static function getDefaultController() {
		return 'home';
	}
}