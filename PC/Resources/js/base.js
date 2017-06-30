$(function () {
    // select 下拉
    if ($('.j-select').length > 0) {
        $('.j-select').on('click', function (event) {
            event = event || window.event;
            var $select = '';
            if ($(event.target).hasClass('j-select')) {
                $select = $(event.target);
            } else {
                $select = $(event.target).parents('.j-select');
            }

            if ($select.attr('data-value') == 'false') {
                $select.attr('data-value', true);
                $select.addClass('toggle');
            } else {
                $select.attr('data-value', false);
                $select.removeClass('toggle');
            }

            $select.find('select').text()

        });
        $('.j-select ul>li').on('click', function () {
            var $select = $(this).parents('.j-select');
            $select.find('.select-text').text($(this).text());
        });
        $(document).on('click', function (event) {
            event = event || window.event;
            if (!($(event.target).hasClass('j-select')) && $(event.target).parents('.j-select').length == 0) {
                $('.j-select').attr('data-value', false);
                $('.j-select').removeClass('toggle');
            }
        });
    }

    // 跳转链接
    // 链接跳转
    $('[data-url]').on('click', function () {
        var url = $(this).attr('data-url');
        if ($(this).attr('data-target') == '_blank') {
            window.open(url);
        } else {
            window.location.href = url;
        }

    });
});
