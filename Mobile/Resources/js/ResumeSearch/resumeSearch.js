$(document).ready(function ()
{
    if($('.j-u-resume-load').length>0){
        ResumeSearchMgr.initResumeLoadEvent();
    }
});

var ResumeSearchMgr = {
    // 更多简历的加载动画
    initResumeLoadEvent: function () {
        $('.j-u-resume-load').on('click',function () {
            $('.j-resume-item').removeClass('u-hidden');
        });
    }
}