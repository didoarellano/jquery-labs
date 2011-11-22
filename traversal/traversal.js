$(function() {

    var $sandbox = $('#sandbox');
    var $cmdLine = $('form input');
    var $markup = $('<div id="markup">').insertAfter($sandbox);

    function updateMarkupView() {
        var markup = $sandbox
                        .html()
                        .replace(/[<>]/g, function(m) {
                            return {
                                '<': '&lt;',
                                '>': '&gt;'
                            }[m];
                        });

        $markup.empty().append('<pre><code>' +markup+ '</code></pre>');
    }

    updateMarkupView();

    $('form').on('submit', function(e) {
        e.preventDefault();
        $('.you-are-here').removeClass('you-are-here');

        var input  = $.trim( $cmdLine.val() );
        var method = input.match(/\.(\w+)\(/)[1];
        var param  = input.match(/\((.*)\)/i)[1];

        if (!method in $.fn) return;

        $sandbox.find('h3')[method](param).addClass('you-are-here');
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
        $.equalizeHeight($sandbox, $markup);
    };

});
