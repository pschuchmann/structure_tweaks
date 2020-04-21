/**
 * @author Friends Of Redaxo
 */
var structureTweaksLastChanges = function () {
    /**
     * lastModfiedCategories
     * @returns {structureTweaksLastChanges}
     */
    this.lastModifiedCategories = function () {

        var handleData = function (data) {

            this.lastModifiedCategories = $.parseJSON(data);

            var clangId = $.makeArray(this.getUrlVars('clang'));
            clangId = clangId[0]['clang'];
            if (clangId === undefined) {
                clangId = 1;
            }
            var articleId = $.makeArray(this.getUrlVars('article_id'));
            articleId = articleId[0]['article_id'];
            if (articleId === undefined) {
                articleId = 0;
            }

            for (var i = 0; i < this.lastModifiedCategories.length; i++) {

                var search = 'index.php?page=structure&category_id=' + this.lastModifiedCategories[i]['article_id'] + '&article_id=0&clang=' + clangId;
                var $categoryRow = $('a[href="' + search + '"]');
                var datewidth = this.lastModifiedCategories[i]['datewidth'];
                var userwidth = this.lastModifiedCategories[i]['userwidth'];

                // Insert splitter
                if ($categoryRow.length) {
                    // skip level up
                    if ($categoryRow.parents('tr').find('td.rex-table-id').html() != "-")
                        $categoryRow.parents('tr').find('td.rex-table-priority').before('<td class="rex-table-lastmodified" width="' + datewidth + '">' + this.lastModifiedCategories[i]['updatedate'] + '</td><td class="rex-table-lastmodified-user"  width="' + userwidth + '"> ' + this.lastModifiedCategories[i]['updateuser'] + '</td>');

                }
            }

            // Addmode
            if (jQuery('.rex-page-section tr.mark').find('td:nth-child(3) input').val() == "") {
                jQuery('.rex-page-section tr.mark').find('td.rex-table-priority').before('<td class="rex-table-lastmodified" width=""></td><td class="rex-table-lastmodified-user"  width=""></td>');
            }

            // fill empty td
            jQuery('.rex-page-section tr').find('td.rex-table-priority').each(function (index) {
                if (jQuery(this).html() == " ") {
                    jQuery(this).parents('tr').find('td.rex-table-priority').before('<td class="rex-table-lastmodified" width=""></td><td class="rex-table-lastmodified-user"  width=""></td>');
                }
            });

            // fill first row (rex-icon rex-icon-open-category)
            jQuery('.rex-page-section tr').find('td.rex-table-icon i.rex-icon-open-category').parents('tr').find('td.rex-table-priority').before('<td class="rex-table-lastmodified" width=""></td><td class="rex-table-lastmodified-user"  width=""></td>');

            jQuery('.rex-page-section tr.structure-tweaks-splitter').find('td:nth-child(3)').attr('colspan', 6);

            // set head
            jQuery('.rex-page-section').first().find('table thead tr').find('th.rex-table-priority').before('<th class="rex-table-lastmodified" colspan="2"  >Letzte Änderung</th>');

            return this;

        };

        getData();

        function getData() {
            $.ajax({
                url: '/index.php?rex-api-call=last_changes',
                data: {
                    category_id: articleId,
                    clang : clangId
                },
                cache: false,
                success: function (data) {
                    handleData(data);
                }
            })
        }
    };


    /**
     * lastModfiedArticles
     * @returns {structureTweaksLastChanges}
     */
    this.lastModifiedArticles = function () {

        var handleArticleData = function (data) {

            this.lastModifiedArticles = $.parseJSON(data);

            var clangId = $.makeArray(this.getUrlVars('clang'));
            clangId = clangId[0]['clang'];
            if (clangId === undefined) {
                clangId = 1;
            }

            var articleId = $.makeArray(this.getUrlVars('article_id'));
            articleId = articleId[0]['article_id'];
            if (articleId === undefined) {
                articleId = 0;
            }

            var categoryId = $.makeArray(this.getUrlVars('category_id'));
            categoryId = categoryId[0]['category_id'];
            if (categoryId === undefined) {
                categoryId = 0;
            }

            for (var i = 0; i < this.lastModifiedArticles.length; i++) {

                var datewidth = this.lastModifiedArticles[i]['datewidth'];
                var userwidth = this.lastModifiedArticles[i]['userwidth'];

                // start article
                var search = 'index.php?page=content/edit&category_id=' + this.lastModifiedArticles[i]['article_id'] + '&article_id=' + this.lastModifiedArticles[i]['article_id'] + '&clang=' + clangId + '&mode=edit';
                var $articleRow = $('.rex-page-section tr.rex-startarticle a[href="' + search + '"]');

                if ($articleRow.length) {
                    $articleRow.parents('tr').find('td.rex-table-priority').before('<td class="rex-table-lastmodified" width="' + datewidth + '">' + this.lastModifiedArticles[i]['updatedate'] + '</td><td class="rex-table-lastmodified-user"  width="' + userwidth + '"> ' + this.lastModifiedArticles[i]['updateuser'] + '</td>');
                }

                // not startarticle
                var search = 'index.php?page=content/edit&category_id=' + categoryId + '&article_id=' + this.lastModifiedArticles[i]['article_id'] + '&clang=' + clangId + '&mode=edit';
                var $articleRow = $('.rex-page-section tr:not(.rex-startarticle) a[href="' + search + '"]');

                if ($articleRow.length) {
                    $articleRow.parents('tr').find('td.rex-table-priority').before('<td class="rex-table-lastmodified" width="' + datewidth + '">' + this.lastModifiedArticles[i]['updatedate'] + '</td><td class="rex-table-lastmodified-user"  width="' + userwidth + '"> ' + this.lastModifiedArticles[i]['updateuser'] + '</td>');
                }

                // edit
                if ($('.rex-page-section').first().next().find('tr.mark td.rex-table-id').html() == this.lastModifiedArticles[i]['article_id']) {
                    var $articleRowEdit = $('tr.mark td.rex-table-id');
                    if ($articleRowEdit.length) {
                        $articleRowEdit.parents('tr.mark').find('td.rex-table-priority').before('<td class="rex-table-lastmodified" width="' + datewidth + '">' + this.lastModifiedArticles[i]['updatedate'] + '</td><td class="rex-table-lastmodified-user"  width="' + userwidth + '"> ' + this.lastModifiedArticles[i]['updateuser'] + '</td>');
                    }
                }

            }

            // Addmode
            if ($('.rex-page-section').first().next().find('tr.mark').find('td:nth-child(3) input').val() == "") {
                $('.rex-page-section').first().next().find('tr.mark').find('td.rex-table-priority').before('<td class="rex-table-lastmodified" width=""></td><td class="rex-table-lastmodified-user"  width=""></td>');
            }

            //article
            jQuery('.rex-page-section').first().next().find('table thead tr').find('th.rex-table-priority').before('<th class="rex-table-lastmodified" colspan="2"  >Letzte Änderung</th>');

            return this;

        } // handleArticleData

        getArticleData();

        function getArticleData() {
            $.ajax({
                url: '/index.php?rex-api-call=last_changes',
                data: {
                    category_id: articleId,
                    clang : clangId
                },
                cache: false,
                success: function (data) {
                    handleArticleData(data);
                }
            })
        }; // getArticleData


    }; // lastModifiedArticlesFkt
};
