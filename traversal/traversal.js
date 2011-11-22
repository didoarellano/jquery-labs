$(function() {

    var config = [
        {
            instructions: 'Make <strong>all</strong> the divs go green.',
            src:          'next',
            formText:     '$("h3")'
        }
    ];

    $('iframe').load(function() {
        var height = $(this.contentDocument.documentElement).height();
        $(this).height(height);
    });

    var $markup = $('<div id="markup">').insertAfter($('iframe'));

    function updateMarkupView() {
        var markup = $('iframe')[0].contentDocument.body.innerHTML
        .replace(/[<>]/g, function(m) {
            return {
                '<': '&lt;',
                '>': '&gt;'
            }[m];
        });
        $markup.empty().append('<pre><code>' +markup+ '</code></pre>');
    }
    updateMarkupView();

    var $cmdLine = $('form input');

    $('form').on('submit', function(e) {
        e.preventDefault();
        $($('iframe')[0].contentDocument).find('.you-are-here').removeClass('you-are-here');

        var input  = $.trim( $cmdLine.val() );
        var method = input.match(/\.(\w+)\(/)[1];
        var param  = input.match(/\((.*)\)/i)[1];

        if (!method in $.fn) return;

        var command = config[0].formText + input + '.addClass("you-are-here")';

        var whatisreturned = $('iframe')[0].contentWindow.eval(command);
        console.log(whatisreturned);

        updateMarkupView();

    });

    $.equalizeHeight = function($el1, $el2) {
        var heightiest = 0;
        $el1.add($el2)
            .each(function() {
                var height = $(this).height();
                heightiest = height > heightiest ? height : heightiest;
            })
            .height(heightiest);
    };

    window.onload = function() {
        $.equalizeHeight($('iframe'), $markup);
    };

});
