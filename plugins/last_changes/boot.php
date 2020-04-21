<?php
/**
 * @var rex_plugin $this
 */

if (rex::isBackend() && rex::getUser() && !rex::isSetup()) {
    if (rex_addon::get('metainfo')->isAvailable() || rex_addon::get('structure')->isAvailable()) {
        rex_view::addJsFile($this->getAssetsUrl('script.js'));
    }

    // Add last changes categories
    structure_tweaks_last_changes::init();

}
