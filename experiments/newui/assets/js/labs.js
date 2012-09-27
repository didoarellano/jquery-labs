define(
[
    'jquery',
    'codemirror',
    'cm-runmode',
    'cm-jsmode',
    'cm-xmlmode'
],

function($, CodeMirror) {

    "use strict";

    // HERE BE SPAGHETTI DRAGONS

    $(window).on('hashchange', function(e) {
        var hash = window.location.hash.split('/');
        hash = {
            category: hash[1],
            exercise: hash[2]
        };

        var klass = 'on' + (hash.category ? 'exercise' : 'index');

        document.body.className = klass;

        if (hash.exercise) {
            $('.exercise').addClass('started');
            $('.sidebar').addClass('show');
        } else {
            $('.exercise').removeClass('started');
            $('.sidebar').removeClass('show');
        }

    }).trigger('hashchange');

    var sidebarWidth = $('.sidebar').innerWidth();

    setDimensions();
    $(window).on('resize', setDimensions);

    // var bottom = $('.controls').outerHeight(true);
    // bottom = $('.controls').offset().top + bottom;
    // var footerHeight = $('.sidebar footer').outerHeight(true);

    function setDimensions() {
        var width = $(window).width() - sidebarWidth;
        var height = $('body').height();
        $('.sidebar').height(height);

        $('.views').css({
            height: height,
            width: width
        });
    }

    var $form = $('.command');
    var $command = $form.find('label');
    var contextWidth = $('.context').width();
    var $input = $command.find('input');

    // $input.width( $command.width() - contextWidth - 10);

    // http://stackoverflow.com/questions/7347241/caret-text-cursor-stops-when-translate3d-is-applied/7493054#7493054 
    $input.on('keydown', function() {
        this.className = '';
    });

    $form.on('submit', function(e) {
        e.preventDefault();
        $form.addClass('error');
    }).on('webkitAnimationEnd', function() {
        setTimeout(function() {
            $form.removeClass('error');
        }, 1000);
    });

    $(window).on('load', function() {
        var html = $('iframe').contents()[0].body.innerHTML;
        var pre = $('.code pre')[0];
        CodeMirror.runMode(html, 'xml', pre);
    });

    var $views = $('.views');
    $('.labels').on('click', 'a', function(e) {
        e.preventDefault();
        if (!$views.hasClass('codemirror')) {
            return;
        }

        $(this).addClass('current').siblings().removeClass('current');

        $views
            .find('.code, .live')
            .hide()
            .filter('.' + $(this).attr('href').slice(1))
            .show();
    });


    var codemirror = null;
    var cmConfig = {
        lineNumbers: true,
        value: '// Write your code here \n',
        mode: 'javascript'
    };
    var editor = $('.editor')[0];

    $('#toggletype').on('click', function(e) {
        e.preventDefault();
        $views.toggleClass('codemirror');

        if ($views.hasClass('codemirror') && !codemirror) {
            codemirror = CodeMirror(editor, cmConfig);
        }

    });

}

);
