$(document).ready(function(){
    $('.region').click(function(){
        var region = $(this).data('region');
        if(region==='region1'){
            window.location.href = 'https://javascript.info/';
        } else if(region=== 'region2'){
            window.location.href = 'https://css3.info/';
        } else if(region=== 'region3'){
            window.location.href = 'https://html.spec.whatwg.org/multipage/';
        } else if(region=== 'region4'){
            window.location.href = 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics';
        } else if(region=== 'region5'){
            window.location.href = 'https://www.codecademy.com/learn/learn-html';
        } else {
            window.location.href = 'https://www.youtube.com/watch?v=qz0aGYrrlhU';
        }
    });
});
