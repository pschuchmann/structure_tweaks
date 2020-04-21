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

        $qry = rex_sql::factory();
        $results = $qry
          ->setDebug(false)
          ->setTable(rex::getTable('article'))
          ->setWhere(['clang_id' => $clang, 'parent_id' => $category_id])
          ->select('id, clang_id, updatedate, updateuser')
          ;
        $results = $results->getArray();

        $format = $plugin->getConfig('format_date');
        if ($format == '') {
            $format = "d.m.Y";
        }

        $datewidth = $plugin->getConfig('width_date');
        if ($datewidth == '') {
            $datewidth = "80px";
        }

        $userwidth = $plugin->getConfig('width_user');
        if ($userwidth == '') {
            $userwidth = "80px";
        }

        foreach ($results as $result) {
            $item = [
                'article_id' => $result['id'],
                'updatedate' => rex_formatter::format($result['updatedate'], 'strftime', $format),
                'updateuser' => $result['updateuser'],
                'datewidth' => $datewidth,
                'userwidth' => $userwidth,
            ];

            $return[] = $item;
        }

        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($return);
        exit;
    }
}
