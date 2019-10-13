$(document).ready(function(){
    var $test = $("#verbTest");
    const maxWidth = 500;
    var scale;
    $(window).resize(function () {
        if($(window).width() < maxWidth){
            scale = $test.width() / maxWidth;
            $test.css({
                transform: "scale(" + scale + ")"
            });
        }else{
            $test.css({
                transform: "scale(1)"
            });
        }
    });
});

