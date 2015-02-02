var player, totalSec, levels;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '420',
        width: '620',
        videoId: 'ABXPvu-7WTw',
        playerVars: {
            'controls' : 0,
            'modestbranding' : 1,
            'rel' : 0,
            'showinfo' : 0,
            'loop': 0,
            'autoplay':0,
            'autohide':1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    player.stopVideo();
    totalSec = player.getDuration();
}

var t;
function updateSeekBar(){
    var state;
   
    var buffered = player.getVideoLoadedFraction()*100;
    if(buffered > 100) buffered = 100; //for some reason it gets greater than 100
    $('#video #progress .buffered').width(buffered +'%');
    
    var percent = player.getCurrentTime() / player.getDuration() * 100;
    $('#video #progress .played').width(percent+'%');

    state = player.getPlayerState();        
    if(state > 0 && state < 3){
        t = window.setTimeout(updateSeekBar,200);
    }
}

function onPlayerStateChange(){
    updateSeekBar();
    player.setPlaybackQuality('hd720');
    $('#video #overlay').addClass('hide');
}

$(function(){
    var progressWidth = $('#video #progress').width();
    var offset = $('#video #progress').offset(); 

    $('#video #progress div').on('click', function(e){
        var x = e.pageX - offset.left;
        var sec = x/progressWidth * totalSec;
        player.seekTo(sec).playVideo();
    });    

    $('#video #overlay #play').on('click', function(){
        player.playVideo();
    });
});