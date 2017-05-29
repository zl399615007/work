 function SetDefaultFontSize(pageWidth)        {           
     var clientWidth = document.documentElement.clientWidth;           
     switch (window.orientation) { //旋转事件                
        case 0:               
        case -90:                
        case 90:                    
        clientWidth = document.documentElement.clientWidth;                   
         break;            
    }           
     clientWidth = clientWidth > 1280 ?750: clientWidth;            
    pageWidth = pageWidth ||750;           
     var rem = (clientWidth * (100)) / (pageWidth);            
    document.documentElement.style.fontSize = rem + 'px';       
 }       
 SetDefaultFontSize(750);

//横向滑动计算ul的宽
 $(function () {
     var liWidth=0;
    $(".nav-tabs li").each(function (input,index) {
        liWidth+=$(index).width();

     });
     $('.nav-tabs').width(liWidth)

 });

 //解决ios手机底部用fixed定位问题
 $(function(){
    $('textarea,input').bind('focus',function(){  
            $('.u-flow1-foot').css('position','static');  
            //或者$('#viewport').height($(window).height()+'px');  
        }).bind('blur',function(){  
            $('.u-flow1-foot').css({'position':'fixed','bottom':'0'});  
            //或者$('#viewport').height('auto');  
        }); 
 })
  