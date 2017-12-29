//spins the logo.
var looper;
var degrees = 0;
function rotateAnimation(el,speed) {
    var elem = document.getElementById(el);
    if(navigator.userAgent.match("Chrome")) {
        elem.style.webkitTransform = "rotate("+degrees+"deg)";
    } else if(navigator.userAgent.match("Firefox")) {
        elem.style.MozTransform = "rotate(" + degrees + "deg)";
    } else if(navigator.userAgent.match("Opera")) {
        elem.style.OTransform = "rotate(" + degrees + "deg)";
    } else if(navigator.userAgent.match("MSIE")) {
        elem.style.msTransform = "rotate(" + degrees + "deg)";
    } else {
        elem.style.transform = "rotate("+degrees+"deg)";
    }
    looper = setTimeout('rotateAnimation(\''+el+'\','+speed+')',speed);
    degrees++;
    if(degrees > 359) {
        degrees = 1;
    }
    document.getElementById("status").innerHTML = "rotate("+degrees+"deg)";
}

//spider animation for idle users
var timeEfecto,timeOpacity,timeKillSpider;
var opacitySpider=0.3;
var blTermino=false;
var timeSlacker=1000;

document.onmousemove = handleMouseMove;
function handleMouseMove(event) {

    if(blTermino===false){

        var eventDoc, docuElemento, body;
        event = event || window.event;

        if (event.pageX === null && event.clientX !== null)
        {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            docuElemento = eventDoc.documentElement;
            bodyDoc = eventDoc.body;

            event.pageX = event.clientX +
                (docuElemento && docuElemento.scrollLeft || bodyDoc && bodyDoc.scrollLeft || 0) -
                (docuElemento && docuElemento.clientLeft || bodyDoc && bodyDoc.clientLeft || 0);
            event.pageY = event.clientY +
                (docuElemento && docuElemento.scrollTop  || bodyDoc && bodyDoc.scrollTop  || 0) -
                (docuElemento && docuElemento.clientTop  || bodyDoc && bodyDoc.clientTop  || 0 );
        }



        clearTimeout(timeEfecto);
        timeEfecto = setTimeout(function(){
            fBlitzspider(event.pageX,event.pageY);
        }, timeSlacker);

        fKillBlitzSpiderMosca();
    }

}


function fBlitzspider(pageX,pageY){

    document.body.style.cursor= "none";

    var mosca = document.createElement('img');
    mosca.id='blitzmosca';
    mosca.src = 'http://blitzhive.com/blitzspider/blitzmosca.png';
    mosca.style.position = 'absolute';
    mosca.style.top =  (pageY-20)+'px';
    mosca.style.left = (pageX-20)+'px';
    document.body.appendChild(mosca);

    var tag = document.createElement('img');
    tag.id='blitzspider';
    tag.src = 'http://blitzhive.com/blitzspider/blitzspider.gif';
    tag.style.opacity = opacitySpider+"";
    tag.style.position = 'absolute';
    tag.style.width = '250px';
    tag.style.height = '107px';
    tag.style.top = (pageY-70)+'px';
    tag.style.left = pageX+'px';
    document.body.appendChild(tag);

    for(x=1;x<8;x++){
        timeOpacity = setTimeout(function(){
            opacitySpider=opacitySpider+0.1;
            tag.style.opacity =opacitySpider+"";
        }, 500*x);
    }

    timeKillSpider = setTimeout(function(){
        blTermino=true;
        fKillBlitzSpiderMosca();
    }, 4000);
}

function fKillBlitzSpiderMosca(){
    document.body.style.cursor= "default";
    if(document.getElementById('blitzspider')){
        var blitzspiderGif = document.getElementById('blitzspider');
        blitzspiderGif.parentNode.removeChild(blitzspiderGif);
        var blitzMosca = document.getElementById('blitzmosca');
        blitzMosca.parentNode.removeChild(blitzMosca);
        clearTimeout(timeKillSpider);
        clearTimeout(timeOpacity);
    }
}