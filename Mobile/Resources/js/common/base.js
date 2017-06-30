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
            $('.j-flow1-foot').css('position','static');
            //或者$('#viewport').height($(window).height()+'px');  
        }).bind('blur',function(){  
            $('.j-flow1-foot').css({'position':'fixed','bottom':'0'});
            //或者$('#viewport').height('auto');  
        }); 
 })

 var menuShowed = false;

 String.prototype.format = function (args) {
     var result = this;
     if (arguments.length > 0) {
         if (arguments.length == 1 && typeof (args) == "object") {
             for (var key in args) {
                 if (args[key] != undefined) {
                     var reg = new RegExp("({" + key + "})", "g");
                     result = result.replace(reg, args[key].toString());
                 }
             }
         }
         else {
             for (var i = 0; i < arguments.length; i++) {
                 if (arguments[i] != undefined) {
                     var reg = new RegExp("({)" + i + "(})", "g");
                     result = result.replace(reg, arguments[i].toString());
                 }
             }
         }
     }
     return result;
 }
 Array.prototype.remove = function (dx) {
     if (isNaN(dx) || dx > this.length) { return false; }
     for (var i = 0, n = 0; i < this.length; i++) {
         if (this[i] != this[dx]) {
             this[n++] = this[i]
         }
     }
     this.length -= 1
 }
 Date.prototype.Format = function (fmt) {
     var o = {
         "M+": this.getMonth() + 1,                 //月份
         "d+": this.getDate(),                    //日
         "h+": this.getHours(),                   //小时
         "m+": this.getMinutes(),                 //分
         "s+": this.getSeconds(),                 //秒
         "q+": Math.floor((this.getMonth() + 3) / 3), //季度
         "S": this.getMilliseconds()             //毫秒
     };
     if (/(y+)/.test(fmt))
         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
     for (var k in o)
         if (new RegExp("(" + k + ")").test(fmt))
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
     return fmt;
 }

 //滑动屏幕事件绑定对象，move_fun委托方法会传入两个坐标参数：移动起始点{X,Y}，移动结束点{X,Y}
 //start_fun(startPos,startTime),move_fun(moveStartPos,moveEndPos),end_fun(startPos,endPos,startTime)
 var TouchEventListener = function (dom, start_fun, move_fun, end_fun) {
     this.StartPos = { X: 0, Y: 0 };
     this.StartTime = new Date();

     this.LastPos = { X: 0, Y: 0 };

     this._Init(dom, start_fun, move_fun, end_fun);
 };
 TouchEventListener.prototype._Init = function (dom, start_fun, move_fun, end_fun) {
     var self = this;
     dom.addEventListener('touchstart', function (e) {
         //e.preventDefault();
         var touch = e.targetTouches[0];
         self.StartTime = new Date();
         self.StartPos.X = touch.pageX;
         self.StartPos.Y = touch.pageY;
         self.LastPos.X = self.StartPos.X;
         self.LastPos.Y = self.StartPos.Y;
         if (start_fun != undefined && typeof start_fun == 'function') {
             start_fun(self.StartPos, self.StartTime);
         }
     }, false);

     var moveOncePos = { X: 0, Y: 0 };
     dom.addEventListener('touchmove', function (e) {
         e.preventDefault();
         var touch = e.changedTouches[0];
         moveOncePos.X = touch.pageX;
         moveOncePos.Y = touch.pageY;

         if (move_fun != undefined && typeof move_fun == 'function') {
             move_fun(self.LastPos, moveOncePos);
         }
         self.LastPos.X = moveOncePos.X;
         self.LastPos.Y = moveOncePos.Y;
     }, false);

     dom.addEventListener('touchend', function (e) {
         //e.preventDefault();
         var touch = e.changedTouches[0];

         self.LastPos.X = touch.pageX;
         self.LastPos.Y = touch.pageY;

         if (end_fun != undefined && typeof end_fun == 'function') {
             end_fun(self.StartPos, self.LastPos, self.StartTime);
         }
     });


 };

 var SelectCurrentOption = function (jdom) {
     this.JDom = null;
     this.Init(jdom);
 };
 SelectCurrentOption.prototype = {
     Init: function (jdom) { this.JDom = jdom; return this; },
     Set: function (value, text) {
         if (this.JDom)
             this.JDom.data('value', value).text(text);
     }
 }

 var SelectOptions = function (jdom) {
     this.JDom = null,
         this.ItemHeight = 0,
         this.ItemCount = 0,
         this.ItemFirst = null,
         this.CurrentMarginTop = 0,
         this.Timer = null,
         this.SelectedItem = { Index: 0, Value: '', Text: '', disabled: '' };//注：Options的SelectedItem只是为了取值用的，并不总是等于Select的SelectedItem
     this.Init(jdom);
 };

 SelectOptions.prototype = {
     Init: function (jdom) {

         var self = this;
         this.JDom = jdom;
         this.ItemFirst = this.JDom.children('li:first-child');
         this.ItemHeight = this.ItemFirst.height();
         //this.JDom.hide();
         this.ItemCount = this.JDom.children().length;

         this.Timer = undefined;
         new TouchEventListener(jdom.get(0), function () {
             if (self.Timer)
                 clearInterval(self.Timer);
         }, function (moveStartPos, moveEndPos) {
             var marginTmp = moveEndPos.Y - moveStartPos.Y;
             self._ChangeItemsMarginTop(marginTmp);
         }, function (startPos, endPos, startTime) {
             var endTime = new Date();

             var t = endTime - startTime;
             if (t < 200) {
                 var s = endPos.Y - startPos.Y; //px
                 var v = s / t;  //触摸结束时的速度 px/ms，，v的范围大约为：0.5-2.5px/ms
                 var a = 1 / 300;  //px/ms2，无论触摸结束时的速度是多少，都要在2000ms内结束，所以a得取这个值
                 var t2 = Math.abs(v) / a;  //最终动画的大约时间,500 - 2500ms


                 var actTime = 0; //ms
                 var timer_span = 10;
                 self.Timer = setInterval(function () {
                     self._ChangeItemsMarginTop(v * timer_span);
                     actTime += timer_span;
                     if (actTime >= t2) {
                         clearInterval(self.Timer);
                         self._AutoAlignItemsMarginTop();
                     }
                     if (v > 0)
                         v -= a * timer_span;
                     else if (v < 0)
                         v += a * timer_span;

                 }, timer_span); //以10ms为单位去设置动画效果

             }
             else {
                 self._AutoAlignItemsMarginTop();
             }

         });
     },
     _AutoAlignItemsMarginTop: function () {
         var self = this;
         var overMargin = Math.abs(self.CurrentMarginTop) % self.ItemHeight;  //超出整数的边距大小
         var overRate = Math.round(self.CurrentMarginTop / self.ItemHeight);
         var v = 0.5;
         var timer_span = 10;
         var t2 = overMargin / v;
         var actTime = 0;
         if (overMargin >= 0.5 * self.ItemHeight) {
             v = -v;
         }
         self.Timer = setInterval(function () {
             self._ChangeItemsMarginTop(v * timer_span);
             actTime += timer_span;
             if (actTime + timer_span > t2) {
                 clearInterval(self.Timer);
                 self._SetItemsMarginTop(overRate * self.ItemHeight);//完全进行对齐
             }
         }, timer_span);
     },

     _SetItemsMarginTop: function (marginTop) {
         if (marginTop > this.ItemHeight * 2)
             this.CurrentMarginTop = this.ItemHeight * 2;
         else if (marginTop < this.ItemHeight * (3 - this.ItemCount))
             this.CurrentMarginTop = this.ItemHeight * (3 - this.ItemCount);
         else
             this.CurrentMarginTop = marginTop;
         this.ItemFirst.css('margin-top', this.CurrentMarginTop + 'px');
         this._GetSelectedItem();
     },
     _ChangeItemsMarginTop: function (marginTmp) {
         //var oldMargin = parseFloat(this.ItemFirst.css('margin-top').replace('px', ''));
         //自动对齐功能计算，在一定的条件下自动对齐
         //var rate = marginTmp / this.ItemHeight;
         ////var intRate = Math.floor(rate);
         ////var pointRate = rate - intRate;
         ////if (pointRate < 0.2)
         ////    pointRate = 0;
         ////else if (pointRate > 0.8)
         ////    pointRate = 1;
         ////rate = intRate + pointRate;
         //var newMargin = this.CurrentMarginTop + rate * this.ItemHeight;
         this._SetItemsMarginTop(this.CurrentMarginTop + marginTmp);
     },
     SetCurrentItemByValue: function (item_value) {
         var item_index = -1;
         this.JDom.children().each(function () {

             if ($(this).data('value') == item_value) {
                 item_index = $(this).index();
             }
         });
         if (item_index == -1)
             item_index = 0;
         this.SetCurrentItemByIndex(item_index);
     },
     SetCurrentItemByIndex: function (item_index) {
         this._SetItemsMarginTop(this._GetMarginTopByItemIndex(item_index));
     },
     _GetMarginTopByItemIndex: function (item_index) {
         return -this.ItemHeight * (item_index - 2);
     },
     _GetSelectedItem: function () {
         var self = this;
         this.SelectedItem.Index = -Math.round(this.CurrentMarginTop / this.ItemHeight) + 2;
         var itemJDom = null;
         this.JDom.children().each(function () {
             if ($(this).index() == self.SelectedItem.Index) {
                 itemJDom = $(this);
             }
         });
         itemJDom.addClass('active').siblings().removeClass('active');
         this.SelectedItem.Value = itemJDom.data('value');
         this.SelectedItem.Text = itemJDom.text();
         this.SelectedItem.disabled = itemJDom.is('.disabled');

     },
     Show: function () {
         this.JDom.addClass('slide');
         this.SetCurrentItemByIndex(this.SelectedItem.Index);
     },
     Hide: function () { this.JDom.removeClass('slide'); clearInterval(this.Timer); }
 };

 var Select = function (jdom, defValue, selectedChanged) {
     this.JDom = null;
     this.IsShowOptions = false;
     this.CurrentOption = null;
     this.Options = null;
     this.OverLay = null;
     this.Inited = false;
     this.SelectedItem = { Index: 0, Value: '', Text: '', disabled: '' };

     this.Init(jdom, defValue, selectedChanged);
 }
 Select.prototype = {
     Init: function (jdom, defValue, selectedChanged) {
         var self = this;
         this.JDom = jdom;
         this.JSelect = this.JDom.find('.option-select');
         this.OverLay = $('<div class="over-lay" style="display: none;"></div>');
         this.JDom.before(this.OverLay);
         this.OverLay.click(function () {
             self.HideOptions();
         });
         if (typeof selectedChanged == 'function') {
             this.SelectedChanged = selectedChanged;
         }
         this.CurrentOption = new SelectCurrentOption(this.JDom.children('.current-option'));
         this.Options = new SelectOptions(this.JDom.children('.options'));
         this.JDom.click(function () {
             if (self.JDom.hasClass('disabled')) {
                 return;
             }
             if (self.IsShowOptions) {
                 self.HideOptions();
             }
             else {
                 self.ShowOptions();
             }
         });
         this.JSelect.on("click", function () {
             self.SelectOptions();
             return false;
         });
         if (defValue)
             this.SetValue(defValue);
         this.Inited = true;
     },
     SetValue: function (value) {
         console.log(value);
         this.Options.SetCurrentItemByValue(value);
         if (!this.Inited || this.SelectedChanged(this.Options.SelectedItem) != false) {
             this.SelectedItem.Index = this.Options.SelectedItem.Index;
             this.SelectedItem.Value = this.Options.SelectedItem.Value;
             this.SelectedItem.Text = this.Options.SelectedItem.Text;
             this.CurrentOption.Set(this.SelectedItem.Value, this.SelectedItem.Text);
         }
     },
     ShowOptions: function () {
         this.IsShowOptions = true;
         this.Options.SetCurrentItemByIndex(this.SelectedItem.Index);
         this.Options.Show();
         this.OverLay.show();
     },
     HideOptions: function () {
         this.IsShowOptions = false;
         this.Options.Hide();
         this.OverLay.hide();
         this.JSelect.hide();
         this.SetValue(this.Options.SelectedItem.Value);
     },
     SelectOptions: function () {
         this.HideOptions();
     },
     SelectedChanged: function (selectedItem) {
         return true;
     }
 };

 function autoSetDefFontSize(fontSize) {
     var pageWidth = document.documentElement.offsetWidth;
     switch (window.orientation) { //旋转事件
         case 0:
         case -90:
         case 90:
             pageWidth = document.documentElement.offsetWidth;
             break;
     }
     var rem = (pageWidth * (fontSize || 100)) / 320;
     document.documentElement.style.fontSize = rem + 'px';
 }


 function ShowAdvertExpiresData() {
     $("div[data-expiresdate]").each(function () {
         var self = $(this);
         var expiresdateArr = self.attr("data-expiresdate").split('-');
         var expiresdate = new Date(expiresdateArr[0], expiresdateArr[1] - 1, expiresdateArr[2], 23, 59, 59);
         setInterval(function () {
             var now = new Date();
             var subDate = expiresdate - now;
             var d = Math.floor(subDate / (24 * 60 * 60 * 1000));
             var h = "0" + Math.floor(subDate / 1000 / 60 / 60 % 24);
             var m = "0" + Math.floor(subDate / 1000 / 60 % 60);
             var s = "0" + Math.floor(subDate / 1000 % 60);
             self.html(" " + d + " 天 " + h.substr(-2) + " 时 " + m.substr(-2) + " 分 ");
         }, 1000);
     })
 }

  