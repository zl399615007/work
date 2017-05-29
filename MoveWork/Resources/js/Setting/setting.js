$(document).ready(function ()
{
   if($('.j-manager-box').length>0){
       settingMgr.intManagerEvent();
   }
    if($('.j-principal-box').length>0){
        settingMgr.intPrincipalEvent();
    }
});

var settingMgr = {
    intManagerEvent: function () {
        $('.j-manager-box').on('click','.j-open-btn', function () {
                $(this).text('关闭');
        });
    },

    intPrincipalEvent: function () {
        $('.j-principal-box').on('click','.j-open-btn', function () {
            $(this).text('关闭');
        });
    }
}