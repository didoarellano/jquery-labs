(function($) {

    var exercise = {
        instructions: 'This is what you should do',
        selector: '#helement',
        iframehtml: '<div>\n\t<h2> Heading2 1 </h2>\n\t<p> Paragraph 2</p>\n\t<h2> Heading2 2 </h2>\n\t<p> Paragraph 2</p>\n</div>\n<div>\n\t<h2> Heading2 1 </h2>\n\t<p> Paragraph 2</p>\n\t<h2> Heading2 2 </h2>\n\t<p> Paragraph 2</p>\n</div>\n<div>\n\t<h2> Heading2 1 </h2>\n\t<p> Paragraph 2</p>\n\t<h2> Heading2 2 </h2>\n\t<p> Paragraph 2</p>\n</div>'
    };
    var fakeCmd = '$("h2").attr("s", "✓")';

    var $exercise = $('#exercise');
    var $iframe = $('#sandbox');
    var $instructions = $('#instructions')
    var $code = $exercise.find('code');
    var $pre = $code.parent();
    var $loader = $('.loader');
    var $input = $('input');
    var $form = $('form');
    var iframeDoc, iframeWin, iframeBody;

    function render(exer) {
        var iframeHeight;
        var preHeight;
        var height;
        $instructions.text(exer.instructions);
        iframeBody.innerHTML = exer.iframehtml;
        renderCodeView(exer.iframehtml);

        iframeHeight = iframeDoc.documentElement.offsetHeight;
        preHeight = $pre.outerHeight(true);

        height = Math.max(iframeHeight, preHeight);

        $exercise.height(height);
        toggleLoader();
        $input.trigger('focus');
    }

    function renderCodeView(html) {
        // Fake situation where codeview overflows (codeview element becomes
        // taller than iframe). Exercises with nested HTML lists are very
        // susceptible to this.
        var extra = '<div>\n\t<h2> Heading2 1 </h2>\n\t<p> Paragraph 2</p>\n\t<h2> Heading2 2 </h2>\n\t<p> Paragraph 2</p>\n</div>';
        $code.text(html + extra);
    }
    function toggleLoader() {
        $loader.fadeToggle(200);
    }

    function start() {
        iframeDoc = $iframe.contents()[0];
        iframeWin = $iframe[0].contentWindow;
        iframeBody = iframeDoc.body;

        // Mock latency
        setTimeout(function() {
            render(exercise);
        }, 1000);
    }

    function runCommand(e) {
        e.preventDefault();
        iframeWin.eval(fakeCmd);
        var html = iframeBody.innerHTML;
        renderCodeView(html);
    }

    $iframe.on('load', start);
    $form.on('submit', runCommand);

    return;

})(jQuery);
