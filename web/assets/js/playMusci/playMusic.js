(function ($) {
    // Settings
    var repeat = localStorage.repeat || 0,
        shuffle = localStorage.shuffle || 'false',
        continous = true,
        autoplay = true,
        playlist = [
            {
                title: 'Lost Stars',
                artist: 'Adam Levine',
                album: 'Begin Again (Music From and Inspired By the Original Motion Picture)',
                cover: 'img/1.jpg',
                mp3: 'mp3/Adam Levine - Lost Stars.mp3',
                ogg: ''
            },
            {
                title: 'A Thousand Years',
                artist: 'Christina Perri',
                album: 'A Thousand Years',
                cover: 'img/2.jpg',
                mp3: 'mp3/Christina Perri - A Thousand Years.mp3',
                ogg: ''
            },
            {
                title: '幸福特调',
                artist: '罗志祥,裴秀智',
                album: '真人秀？',
                cover: 'img/3.jpg',
                mp3: 'mp3/罗志祥,裴秀智 - 幸福特调.mp3',
                ogg: ''
            },
            {
                title: 'You And Me, Flutter',
                artist: 'Acoustic Collabo ',
                album: 'Unplugged',
                cover: 'img/4.jpg',
                mp3: 'mp3/Acoustic Collabo - You And Me, Flutter.mp3',
                ogg: ''
            },
            {
                title: '早安',
                artist: '刘瑞琦',
                album: '早安，琦',
                cover: 'img/5.jpg',
                mp3: 'mp3/刘瑞琦 - 早安.mp3',
                ogg: ''
            },
            {
                title: '云的舞蹈',
                artist: '曹方',
                album: 'WanderLust',
                cover: 'img/6.jpg',
                mp3: 'mp3/曹方 - 云的舞蹈.mp3',
                ogg: ''
            },
            {
                title: 'Counting Stars',
                artist: 'OneRepublic',
                album: 'Native (Deluxe Version)',
                cover: 'img/7.jpg',
                mp3: 'mp3/OneRepublic - Counting Stars.mp3',
                ogg: ''
            },
            {
                title: 'Color Blind',
                artist: 'Matt B',
                album: 'LOVE AND WAR',
                cover: 'img/8.jpg',
                mp3: 'mp3/Matt B - Color Blind.mp3',
                ogg: ''
            },
        ];

    // Load playlist生成音乐列表
    // for (var i = 0; i < playlist.length; i++) {
    //     var item = playlist[i];
    //     $('#playlist').append('<li>' + item.artist + ' - ' + item.title + '</li>');
    // }

    var time = new Date(),
        currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0,
        trigger = false,
        audio, timeout, isPlaying, playCounts;
    // 音乐播放
    var play = function () {
        audio.play();
        $('.playback').addClass('playing');
        timeout = setInterval(updateProgress, 500);
        isPlaying = true;
    };

    // 音乐暂停
    var pause = function () {
        audio.pause();
        $('.playback').removeClass('playing');
        clearInterval(updateProgress);
        isPlaying = false;
    };

    // Update progress更新进度条
    var setProgress = function (value) {
        var currentSec = parseInt(value % 60) < 10 ? '0' + parseInt(value % 60) : parseInt(value % 60),
            ratio = value / audio.duration * 100;

        // 显示时间
        $('.time').html(parseInt(value / 60) + ':' + currentSec);
        //显示进度条长度
        $('.progress-bar').css('width', ratio + '%');
        $('.progress .slider a').css('left', ratio + '%');
    }


    // 更新进度条
    var updateProgress = function () {
        setProgress(audio.currentTime);
    }

    // Progress slider
    $('.progress').slider({
        step: 0.1, slide: function (event, ui) {
            $(this).addClass('enable');
            setProgress(audio.duration * ui.value / 100);
            clearInterval(timeout);
        }, stop: function (event, ui) {
            audio.currentTime = audio.duration * ui.value / 100;
            $(this).removeClass('enable');
            timeout = setInterval(updateProgress, 500);
        }
    });

    // Volume slider
    var setVolume = function (value) {
        audio.volume = localStorage.volume = value;
        $('.volume .pace').css('width', value * 100 + '%');
        $('.volume .slider a').css('left', value * 100 + '%');
    };

    var volume = localStorage.volume || 0.5;
    $('.volume .slider').slider({
        max: 1, min: 0, step: 0.01, value: volume, slide: function (event, ui) {
            setVolume(ui.value);
            $(this).addClass('enable');
            $('.mute').removeClass('enable');
        }, stop: function () {
            $(this).removeClass('enable');
        }
    }).children('.pace').css('width', volume * 100 + '%');

    // 点击音量图标
    // $('.mute').click(function () {
    //     console.log('mute');
    //     if ($(this).hasClass('enable')) {
    //         // 恢复音量
    //         setVolume($(this).data('volume'));
    //         $(this).removeClass('enable');
    //     } else {
    //         // 静音
    //         $(this).data('volume', audio.volume).addClass('enable');
    //         setVolume(0);
    //     }
    // });

    // Switch track
    var switchTrack = function (i) {
        if (i < 0) {
            track = currentTrack = playlist.length - 1;
        } else if (i >= playlist.length) {
            track = currentTrack = 0;
        } else {
            track = i;
        }

        $('audio').remove();
        loadMusic(track);
        if (isPlaying == true) {
            play();
        }
    };

    // Shuffle
    var shufflePlay = function () {
        var time = new Date(),
            lastTrack = currentTrack;
        currentTrack = time.getTime() % playlist.length;
        if (lastTrack == currentTrack) {
            ++currentTrack;
        }
        switchTrack(currentTrack);
    };

    // Fire when track ended
    var ended = function () {
        console.log('end');
        pause();
        audio.currentTime = 0;
        playCounts++;
        if (continous == true) {
            isPlaying = true;
        }
        if (repeat == 1) {
            play();
        } else {
            if (shuffle === 'true') {
                shufflePlay();
            } else {
                if (repeat == 2) {
                    switchTrack(++currentTrack);
                } else {
                    if (currentTrack < playlist.length) switchTrack(++currentTrack);
                }
            }
        }
    };

    var beforeLoad = function () {
        console.log('progress');
        var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
        $('.progress-bar').css('width', (100 / (this.duration || 1) * endVal) + '%');
    };

    // Fire when track loaded completely
    //自动播放
    var afterLoad = function () {
        console.log('自动播放');
        if (autoplay == true) {
            //自动播放
            play();
        }

    };

    // Load track
    var loadMusic = function (i) {
        var item = playlist[i],
            newaudio = $('<audio>').html('<source src="' + item.mp3 + '"><source src="' + item.ogg + '">').appendTo('.player');
        $('.cover').html('<img src="' + item.cover + '" alt="' + item.album + '">');
        $('.tag').html('<sapn class="title">' + item.title + '</sapn><sapn class="time">' + '</sapn>');
        $('#playlist li').removeClass('playing').eq(i).addClass('playing');
        // console.log(newaudio[0]);
        audio = newaudio[0];
        audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
        audio.addEventListener('progress', beforeLoad, false);
        audio.addEventListener('durationchange', beforeLoad, false);
        audio.addEventListener('canplay', afterLoad, false);
        audio.addEventListener('ended', ended, false);
        // console.log(123);
    };

    //音乐入口
    loadMusic(currentTrack);

    //点击播放按钮
    $('.playback').on('click', function () {
        if ($(this).hasClass('playing')) {
            pause();
        } else {
            //点击播放按钮
            play();
        }
    });

    // 点击上一曲按钮
    $('.rewind').on('click', function () {
        // console.log('上一曲')；
        if (shuffle === 'true') {
            shufflePlay();
        } else {
            switchTrack(--currentTrack);
        }
    });

    // 点击下一曲按钮
    $('.fastforward').on('click', function () {
        // console.log('下一曲');
        if (shuffle === 'true') {
            shufflePlay();
        } else {
            switchTrack(++currentTrack);
        }
    });

    //音乐列表
    // $('#playlist li').each(function (i) {
    //     var _i = i;
    //     // 点击音乐列表
    //     $(this).on('click', function () {
    //         // console.log('点击列表');
    //         console.log(_i);
    //         switchTrack(_i);
    //     });
    // });

    if (shuffle === 'true') {
        $('.shuffle').addClass('enable');
    }

    if (repeat == 1) {
        $('.repeat').addClass('once');
    } else if (repeat == 2) {
        $('.repeat').addClass('all');
    }

    // 循环按钮
    // $('.repeat').on('click', function () {
    //     if ($(this).hasClass('once')) {
    //         repeat = localStorage.repeat = 2;
    //         $(this).removeClass('once').addClass('all');
    //     } else if ($(this).hasClass('all')) {
    //         repeat = localStorage.repeat = 0;
    //         $(this).removeClass('all');
    //     } else {
    //         repeat = localStorage.repeat = 1;
    //         $(this).addClass('once');
    //     }
    // });


    //点击随机按钮
    // $('.shuffle').on('click', function () {
    //     if ($(this).hasClass('enable')) {
    //         shuffle = localStorage.shuffle = 'false';
    //         $(this).removeClass('enable');
    //     } else {
    //         shuffle = localStorage.shuffle = 'true';
    //         $(this).addClass('enable');
    //     }
    // });

})(jQuery);