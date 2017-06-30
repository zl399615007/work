$(document).ready(function ()
{
   if($('.j-manager-box').length>0){
       settingMgr.initManagerEvent();
   }
    if($('.j-principal-box').length>0){
        settingMgr.initPrincipalEvent();
    }
    if( $('.j-exchange-btn').length>0){
        settingMgr.initExchangeEvent();
    }
});

var settingMgr = {
    // 管理员-开启关闭按钮
    initManagerEvent: function () {
        $('.j-manager-box').on('click','.j-open-btn', function () {
            if($(this).attr('data-value')=='true'){
                $(this).attr('data-value','false');
                $(this).text('关闭');
            }else{
                $(this).attr('data-value','true');
                $(this).text('开启');
            }
        });
    },
    // 负责人-开启关闭按钮
    initPrincipalEvent: function () {
        $('.j-principal-box').on('click','.j-open-btn', function () {
            if($(this).attr('data-value')=='true'){
                $(this).attr('data-value','false');
                $(this).text('关闭');
            }else{
                $(this).attr('data-value','true');
                $(this).text('开启');
            }
        });
    },

    // 积分兑换不足弹框
    initExchangeEvent: function () {
        $('.j-exchange-btn').on('click',function () {
            $('#modal-exchange').modal('hide');
        });
    }
}