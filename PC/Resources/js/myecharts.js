/*
 id:ehcarts初始化ID
 xdata:横坐标
 data:series数据
 rotate:横坐标旋转角度
 */
function setBar(id,xdata,data,rotate){
    var rotate=rotate||0;
    var option = {
        title : {
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


function setPie(id,data) {
    var option = {
        title : {
          
            textStyle:{
                color:'#333',
                fontWeight:'normal',
                fontSize:14
            },
            top:15,
            left:0
        },
        grid:{
            left:'2%'
        },
        color:['#fe4a51','#64d286'],
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:data,
                label:{
                    normal:{
                        position:'inside'
                    }
                },
                radius : '70%'
            }
        ]
    };
    id.setOption(option);
}