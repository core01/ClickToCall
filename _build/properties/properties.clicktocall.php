<?php

$properties = array();

$tmp = array(
	'force' => array(
		'type' => 'combo-boolean',
		'value' => 'false',
	),
	'tpl' => array(
		'type' => 'textfield',
		'value' => 'ClickToCall.tpl',
	)
);

foreach ($tmp as $k => $v) {
	$properties[] = array_merge(
		array(
			'name' => $k,
			'desc' => PKG_NAME_LOWER . '_prop_' . $k,
			'lexicon' => PKG_NAME_LOWER . ':properties',
		), $v
	);
}

return $properties;