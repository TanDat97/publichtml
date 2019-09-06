$(function(){
    $(window).scroll(function(){
        if($('html,body').scrollTop()>100) {
            $('.mtren').addClass('nenxam');
            $('.logo').addClass('chucam');
            $('.nutlen').addClass('hienthi');
        } else if($('html,body').scrollTop()<=100){
            $('.mtren').removeClass('nenxam');
            $('.logo').removeClass('chucam');
            $('.nutlen').removeClass('hienthi');
        }
    })

    $('.nutlen').click(function() {
        $('html, body').animate({scrollTop: 0});
        return false;
    })
})