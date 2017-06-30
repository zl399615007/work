$(document).ready(function () {
    // 新增、编辑岗位的添加更多
    if ($('.j-addPost-box').length > 0) {
        postManagementMgr.initAddMoreEvent();
    }
    // 新增、编辑岗位的岗位类别和行业选择框
    if($('.j-select-btn[data-act="select"]').length>0){
        postManagementMgr.initSelectEvent();
    }
    // 新增、编辑岗位的急招弹框
    if($('.j-recruit-btn').length>0){
        postManagementMgr.initRecruitEvent();
    }
});

var postManagementMgr = {
    initAddMoreEvent: function () {
        $('.j-addPost-box').on('click', '.j-more-btn', function () {
            $(this).hide();
            $('.j-more-content').show();
        });
    },

    initSelectEvent: function () {
        var self = this;
        var $selectBtn = $('.j-select-btn[data-act="select"]');

        $selectBtn.each(function (index,item) {
            var select = new Select($(item), $(item).children('.j-select-idx').data('value'), function (selectItem) {
                $(item).find('.j-select-idx').text(selectItem.Text);
            });
        })

    },

    initRecruitEvent: function () {
        $('.j-recruit-lay').on('click',function (event) {

           if(!$(event.target).hasClass('j-recruit-bg')){
               $('.j-recruit-lay').hide();
           }
        });
        $('.j-recruit-btn').on('click',function () {
            $('.j-recruit-lay').show();
        });
    }
}