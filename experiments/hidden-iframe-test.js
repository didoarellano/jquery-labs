(function($) {

    var testhtml = '<h1>Inserted mother biash!</h1>\n';
    var replacehtml = '<h1>Replaced foo!</h1>';

    var $iframe = $('#sandbox');
    var $exer = $('#exercise');

    $iframe.on('load', function() {

        $('form').on('submit', function(e) {

            e.preventDefault();

            var iframeDoc = $iframe.contents()[0];
            var iframeWin = $iframe[0].contentWindow;
            var iframeBody = iframeDoc.body;

            iframeBody.innerHTML = testhtml + testhtml + testhtml + testhtml+ testhtml + testhtml + testhtml + testhtml + testhtml;
            iframeWin.eval('$("h1").attr("s", "✓").filter(":even").attr("s", "x")');

            var height = iframeDoc.documentElement.offsetHeight;
            var html = iframeBody.innerHTML;
            var pre = document.createElement('pre');
            var code = document.createElement('code');
            var live = document.createElement('div')
            live.className = 'liveview';

            live.innerHTML = html;
            code.innerHTML = html.replace(/[<>]/g, function(m) { return { '<': '&lt;', '>': '&gt;' }[m]; });

            pre.appendChild(code);

            $exer.detach().append(live).append(pre).insertBefore('.progress');


        });

    });


})(jQuery);
