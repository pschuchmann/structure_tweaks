<?php

$plugin = rex_plugin::get('structure_tweaks', 'last_changes');

$form = rex_config_form::factory($plugin->getPackageId(), null, true);

$field = $form->addFieldset($plugin->i18n('options'));

$field = $form->addCheckboxField('show_category');
$field->setLabel($plugin->i18n('show_category'));
$field->addOption('', '1');

$field = $form->addCheckboxField('show_article');
$field->setLabel($plugin->i18n('show_article'));
$field->addOption('', '1');

$field = $form->addTextField('width_user');
$field->setLabel($plugin->i18n('width_user'));

$field = $form->addTextField('width_date');
$field->setLabel($plugin->i18n('width_date'));

$fragment = new rex_fragment();
$fragment->setVar('class', 'edit', false);
$fragment->setVar('title', $plugin->i18n('title'), false);
$fragment->setVar('body', $form->get(), false);
echo $fragment->parse('core/page/section.php');

