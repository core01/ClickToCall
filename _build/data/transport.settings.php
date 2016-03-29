<?php

    $settings = array();

    $tmp = array(
        'force'        => array(
            'xtype' => 'combo-boolean',
            'value' => false,
            'area'  => 'clicktocall_main',
        ),
        'mobiledetect' => array(
            'xtype' => 'combo-boolean',
            'value' => true,
            'area'  => 'clicktocall_main',
        ),
        'phone' => array(
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
