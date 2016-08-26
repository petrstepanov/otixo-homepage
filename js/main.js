$(".banner h1").fitText(0.8, { minFontSize: '21px', maxFontSize: '67px' });

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $(".banner .video-container").hide();
}

function resizeBanner(){
    $('.banner').css('height', Math.max(480, Math.min($( window ).height(), 710)) + "px");
}

resizeBanner();

$( window ).resize(function() {
    resizeBanner();
});

var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 256,
    'tolerance': 70,
    'side': 'right'
});

slideout.on('beforeopen', function() {
    $('body').addClass('my-slideout-open');
});

slideout.on('beforeclose', function() {
    $('body').removeClass('my-slideout-open');
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
