<?php
    /** @var array $scriptProperties */
    /** @var ClickToCall $ClickToCall */
    if (!$ClickToCall = $modx->getService('clicktocall', 'ClickToCall', $modx->getOption('clicktocall_core_path', null,
            $modx->getOption('core_path') . 'components/clicktocall/') . 'model/clicktocall/', $scriptProperties)
    ) {
        return 'Could not load ClickToCall class!';
    }

    $force = $modx->getOption('force', $scriptProperties, 0);
    $elementId = $modx->getOption('elementId', $scriptProperties, 'ClickToCall');
    $tpl = $modx->getOption('tpl', $scriptProperties, 'ClickToCall.tpl');
    $defaultPhone = $modx->getOption('clicktocall_phone');
    $phone = $modx->getOption('phone', $scriptProperties, $defaultPhone);

    if (!$timezone = $modx->getOption('date_timezone')) {
        date_default_timezone_set('Europe/Moscow');
    }
    $today = date("l");
    if ($force != 0) {
        return $ClickToCall->clickToCallShow($tpl, $phone, $elementId);
    }
    if ($dbDay = $modx->getObject('ClickToCallHours', array('weekday' => $today, 'work' => 1))) {
        if (!$startTime = $dbDay->get('start_time')) {
            $startTime = "00:00";
        }
        if (!$endTime = $dbDay->get('end_time')) {
            $endTime = "23:59";
        }
        $startTime = strtotime($startTime);
        $endTime = strtotime($endTime);
        $time = time();
        if ($time >= $startTime and $time <= $endTime) {
            return $ClickToCall->clickToCallShow($tpl, $phone, $elementId);
        }
    }

