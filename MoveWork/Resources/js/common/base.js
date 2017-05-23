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