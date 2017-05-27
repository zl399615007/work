/*
id:ehcarts初始化ID
xdata:横坐标
data:series数据
title:图表标题
rotate:横坐标旋转角度
*/
function setBar(id,xdata,data,title,rotate){
  var rotate=rotate||0;
  option = {
    title : {
        text: title,
        textStyle:{
          color:'#444',
          fontWeight:'normal',
          fontSize:15
        },
        top:15
       
    },
   
   
    xAxis : [
        {
            type : 'category',
            data : xdata,
           
            axisLabel:{
              interval:0,
              rotate:rotate
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            
            type:'bar',
            data:data,
           itemStyle: {
                normal: {
                    color: function(params) {
                        // build a color map as your need.
                        var colorList = [
                          '#F96768','#50C3F2','#F96768','#50C3F2','#F96768','#50C3F2'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'top',
                }
            },
        }
    ]
};
id.setOption(option);
}