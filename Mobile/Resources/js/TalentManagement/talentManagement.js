$(document).ready(function () {
    if ($('.j-talent-list').length > 0) {
        talentManagementMgr.initManagerEvent();
    }
    if ($('.j-reverse-choice').length > 0) {
        talentManagementMgr.initReverseEvent();
    }
    if ($('.j-collect-btn').length > 0) {
        talentManagementMgr.initCollectEvent();
    }
});

var talentManagementMgr = {
    // 人才库管理-切换页面排除编辑按钮
    initManagerEvent: function () {
        $('.j-talent-list .j-talent-item').on('click', function (event) {
            var href = $(this).attr('data-href');
            // 不包含编辑按钮
            if (!$(event.target).hasClass('u-aditor-btn') && !$(event.target).hasClass('u-talent-icon-aditor')) {
                window.location.href = href;
            }
        });
    },

    // 收藏的简历-更多-反选按钮
    initReverseEvent: function () {
        $('.j-reverse-choice').on('click', function () {
            var $form = $(this).parents('form');
            $form.find('input').prop("checked", "");
            $form.find('input').attr("checked", "");
            $(this).prop('checked', true);
            $(this).attr('checked', true);
        });

        $('.j-checkbox-choice').on('click', function () {
            var $form = $(this).parents('form');
            $form.find('.j-reverse-choice').prop("checked", "");
            $form.find('.j-reverse-choice').attr("checked", "");
            $(this).prop('checked', true);
            $(this).attr('checked', true);
        })
    },

    // 简历详情页面-收藏状态
    initCollectEvent: function () {
        $('.j-collect-btn').on('click', function () {
            if ($(this).attr('data-value') == "false") {
                $(this).find('.j-collect-text').text('已收藏');
                $(this).find('.j-collect').hide();
                $(this).find('.j-collect-full').show();
                $(this).attr('data-value',true);
            } else {
                $(this).find('.j-collect-text').text('收藏');
                $(this).find('.j-collect').show();
                $(this).find('.j-collect-full').hide();
                $(this).attr('data-value',false);
            }

        });
    }
}