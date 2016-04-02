<?php

    $settings = array();

    $tmp = array(
        'mobiledetect' => array(
            'xtype' => 'combo-boolean',
            'value' => true,
            'area'  => 'clicktocall_main',
        ),
        'phone'        => array(
            'xtype' => 'textfield',
            'value' => '',
            'area'  => 'clicktocall_main',
        )
    );

    foreach ($tmp as $k => $v) {
        /* @var modSystemSetting $setting */
        $setting = $modx->newObject('modSystemSetting');
        $setting->fromArray(array_merge(
            array(
                'key'       => 'clicktocall_' . $k,
                'namespace' => PKG_NAME_LOWER,
            ), $v
        ), '', true, true);

        $settings[] = $setting;
    }

    unset($tmp);
    return $settings;
