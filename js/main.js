$(".banner h1").fitText(0.8, { minFontSize: '21px', maxFontSize: '67px' });

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $(".banner .video-container").hide();
}

$('.banner').css('height', Math.max($( window ).height(), 710) + "px";

var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 256,
    'tolerance': 70,
    'side': 'right'
});

$('#mobile-trigger').click(function(event){
    event.stopPropagation();
    event.preventDefault();
    $(this).find('.hamburger').toggleClass('is-active');
    slideout.toggle();
});

$('body').click(function(){
    $('#mobile-trigger .hamburger').removeClass('is-active');
    slideout.close();
});
