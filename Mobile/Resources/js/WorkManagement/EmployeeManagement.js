$(document).ready(function () {
    if ($('.j-header-add').length > 0) {
        employeeMgr.initPopoverEvent();
    }
});

var employeeMgr = {
    //  员工管理-右上弹出弹框
    initPopoverEvent: function () {
        $('.j-header-add').popover({html: true,trigger: 'manual'}).on('click',function (event) {
            if($(event.target).hasClass('j-header-add')){
                $('.j-header-add').popover('show');
            }
        });
        $(document).on('click', '.Addmembers', function () {
            window.location = 'AddMembers.html';
        });
        // 员工管理-导入简历
        $(document).on('click', '.j-import-btn', function () {
            $('#import').show();
            $('.j-layout').show();
            $('.j-header-add').popover('hide');
        });
        // 员工管理-导入文件
        $(document).on('click','.j-tips-btn', function () {
            $('.j-header-add').popover('hide');
        });
    }
}