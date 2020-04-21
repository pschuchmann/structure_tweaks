<?php
/**
 * @author Friends of REDAXO
 */

class structure_tweaks_last_changes extends structure_tweaks_base
{
    /**
     * Split categories
     */
    public static function init()
    {
        rex_extension::register('PACKAGES_INCLUDED', function () {
            if (rex_addon::get('structure')->isAvailable() && rex_request('page', 'string') == 'structure') {
                rex_extension::register('PAGE_HEADER', [__CLASS__, 'ep']);
            }
        });
    }

    /**
     * EP CALLBACK
     * @param rex_extension_point $ep
     * @return string
     */
    public static function ep(rex_extension_point $ep)
    {
        $subject = $ep->getSubject();

        $plugin = rex_plugin::get('structure_tweaks', 'last_changes');
        $category_last_changes = (bool) explode('|', $plugin->getConfig('show_category'));
        $article_last_changes =  (bool) explode('|', $plugin->getConfig('show_article'));

        if ($category_last_changes == true) {
            $subject .= '
                <script>
                    $(document).ready(function() {
                        var structureTweaks_category_last_changes = new structureTweaksLastChanges();
                        structureTweaks_category_last_changes.lastModifiedCategories();
                  });
                    $(document).on("pjax:end", function() {
                        var structureTweaks_category_last_changes = new structureTweaksLastChanges();
                        structureTweaks_category_last_changes.lastModifiedCategories();
                    });
                </script>';
        };

        // if ($article_last_changes == true) {
        //     $subject .= '
        //         <script>
        //             $(document).ready(function() {
        //                 var structureTweaks_article_last_changes = new structureTweaksLastChanges();
        //                 structureTweaks_article_last_changes.lastModifiedArticles();
        //             });
        //             $(document).on("pjax:end", function() {
        //                 var structureTweaks_article_last_changes = new structureTweaksLastChanges();
        //                 structureTweaks_article_last_changes.lastModifiedArticles();
        //             });
        //         </script>';
        // }

        return $subject;
    }
}
