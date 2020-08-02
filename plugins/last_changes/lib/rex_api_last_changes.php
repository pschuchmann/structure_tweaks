<?php

class rex_api_last_changes extends rex_api_function
{

    protected $published = true;

    public function execute()
    {
        $return = [];
        $plugin = rex_plugin::get('structure_tweaks', 'last_changes');

        $clang = rex_request('clang', 'int', 0);
        $category_id = rex_request('category_id', 'int', 0);

        $config = [];
        $config['width_date'] = $plugin->getConfig('width_date');
        if ($config['width_date'] == '') {
            $config['width_date'] = '80px';
        }

        $config['width_user'] = $plugin->getConfig('width_user');
        if ($config['width_user'] == '') {
            $config['width_user'] = '80px';
        }

        $qry = rex_sql::factory();
        $qry
          ->setDebug(false)
          ->setTable(rex::getTable('article'))
          ->setWhere(['clang_id' => $clang, 'parent_id' => $category_id])
          ->select('id, name, clang_id, updatedate, updateuser');
          $results = $qry->getArray();

       $items = [];
        foreach ($results as $result) {
            $item = [
                'id' => $result['id'],
                'updateuser' => $result['updateuser'],
                'updatedate' => rex_formatter::format($result['updatedate'], 'strftime', rex_i18n::msg('dateformat')),
            ];

            $items[] = $item;
        }

        $return['config'] = $config;
        $return ['items'] = $items;

        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($return, JSON_PRETTY_PRINT);
        exit;
    }
}
