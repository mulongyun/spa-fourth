{/* <div class="box" id="box">
    <div class="slider" id="slider">
        <div class="slide"><img src="img/b5.png" alt=""></div>
        <div class="slide"><img src="img/b1.png" alt=""></div>
        <div class="slide"><img src="img/b2.png" alt=""></div>
        <div class="slide"><img src="img/b3.png" alt=""></div>
        <div class="slide"><img src="img/b4.png" alt=""></div>
        <div class="slide"><img src="img/b5.png" alt=""></div>
        <div class="slide"><img src="img/b1.png" alt=""></div>
    </div>
	<span id="left"><</span>
	<span id="right">></span>
	<ul class="nav" id="navs">
		<li>1</li>
		<li>2</li>
		<li>3</li>
		<li>4</li>
		<li>5</li>
	</ul>		
</div> */}

function Banner() {
    this.show = function (conf) {
        var cfg = {
            arr: ['img/b5.png', 'img/b1.png', 'img/b2.png', 'img/b3.png', 'img/b4.png', 'img/b5.png', 'img/b1.png'],//图片数组
        };
        // 获取dom结点-----------------------------------------------------------------------------------
        var $box = $('#box'),//div框
            $slider = $("<div class='slider' id='slider'></div>"),//slider框
            $left = $('<span id="left"><</span>'),//左图标
            $right = $('<span id="right">></span>'),//右图标
            $navs = $('<ul class="nav" id="navs">');//nav导航
        $.extend(cfg, conf);
        //把轮播图，左右图标，页面数字加入div----------------------------------------------------
        $box.append($slider);
        for (var i = 0; i < cfg.arr.length; i++) {
            var $img = $('<div class="slide"><img src=' + cfg.arr[i] + ' alt=" "></div>');
            $slider.append($img);
        }
        $box.append($left);
        $box.append($right);
        $box.append($navs);
        for (var i = 0; i < 5; i++) {
            var $li = $("<li>" + (i + 1) + "</li>");
            if (i == 0) {
                $($li[i]).addClass("active");
            }
            $navs.append($li);
        }
        // 2.事件-----------------------------------------------------------------------------------
        var $box = $('#box')[0],
            $slider = $('#slider')[0],
            $lef = $('#left')[0],
            $rig = $('#right')[0],
            $lis = $('li'),
            index = 1,//图片下标
            timer,//定时器
            Move = false;
        // 自动播放轮播图-----------------------------------------------------------------------------------
        timer = setInterval(you, 1000);
        function move(obj, json, callback) {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var flag = true;
                for (var attr in json) {
                    (function (attr) {
                        var now = parseInt(getStyle(obj, attr));
                        var dest = json[attr];
                        var speed = (dest - now) / 6;
                        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                        obj.style[attr] = now + speed + "px";
                        if (now != dest) {
                            flag = false;
                        }
                    })(attr);
                }
                if (flag) {
                    clearInterval(obj.timer);
                    callback && callback();
                }
            }, 50);
        }
        function getStyle(obj, attr) { //getStyle 得到现在的left 带px
            if (obj.currentStyle) {
                return obj.currentStyle[attr];
            } else {
                return getComputedStyle(obj, null)[attr];
            }
        }
        // 鼠标移入左右图标显示-----------------------------------------------------------------------------------
        $box.onmouseover = function () {
            clearInterval(timer); //鼠标移入暂停轮播
            $right.css({ opacity: 0.8 });
            $left.css({ opacity: 0.8 });
        }
        // 鼠标移出左右图标消失-----------------------------------------------------------------------------------
        $box.onmouseout = function () {
            timer = setInterval(you, 1000); //鼠标移出恢复轮播
            $right.css({ opacity: 0 });
            $left.css({ opacity: 0 });
        }
        // 点击右图标-----------------------------------------------------------------------------------
        $rig.onclick = you;
        function you() {
            if (Move) { return; }
            Move = true;
            index++;
            navAutoMove();
            move($slider, { left: -1200 * index }, function () {//每张照片宽度1200px
                if (index == 6) {//当index走到b5时回到b1
                    $slider.style.left = -1200 + 'px';
                    index = 1;
                }
                Move = false;
            });
        }
        // 点击左图标（红点和图片都改变）-----------------------------------------------------------------------------------
        $lef.onclick = zuo;
        function zuo() {
            if (Move) { return; }
            Move = true;
            index--;
            navAutoMove();
            move($slider, { left: -1200 * index }, function () {
                if (index == 0) {
                    $slider.style.left = -1200 * 5 + 'px';
                    index = 5;
                }
                Move = false;
            });
        }
        //点击nav圆点切换-----------------------------------------------------------------------------------
        for (var i = 0; i < 5; i++) {
            (function (i) {
                $($lis[i]).click(function () {
                    index = i + 1;
                    move($slider, { left: -1200 * index });
                    navAutoMove();
                })
            })(i);
        }
        //nav圆点样式自动切换-----------------------------------------------------------------------------------
        function navAutoMove() {
            for (var i = 0; i < 5; i++) {
                $($lis[i]).removeClass("active");
            }
            if (index > 5) {//到第五张图片之后红点跳到第一张
                $($lis[0]).addClass("active");
            } else if (index <= 0) {
                $($lis[4]).addClass("active");
            } else {
                $($lis[index - 1]).addClass('active');
            }
        }
    }
}
