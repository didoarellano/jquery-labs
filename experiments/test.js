(function($) {

    var testhtml = '<h1>Inserted mother biash!</h1>\n';
    var replacehtml = '<h1>Replaced foo!</h1>';

    var $iframe = $('iframe');
    var $exer = $('#exercise');

    var dfd = $.Deferred();

    dfd.done(function() {
        console.log('done dfd!');
    });

    $iframe.on('load', function() {

        var iframeDoc = $iframe.contents()[0];
        var iframeWin = $iframe[0].contentWindow;
        var iframeBody = iframeDoc.body;

        iframeBody.innerHTML = testhtml + testhtml + testhtml + testhtml + testhtml + testhtml + testhtml + testhtml + testhtml + testhtml;
        $exer.height(iframeDoc.documentElement.offsetHeight);

        var x;
        try {
            x = iframeWin.eval('$("h1").attr("s", "✓").filter(":even").attr("s", "x")');
        } catch(e) {
            console.log(e);
        }

        var html = iframeBody.innerHTML;
        var pre = document.createElement('pre');
        var code = document.createElement('code');
        code.innerHTML = html.replace(/[<>]/g, function(m) { return { '<': '&lt;', '>': '&gt;' }[m]; });

        pre.appendChild(code);


        setTimeout(function() {
            dfd.resolve();
        }, 3000);

        $exer.find('.codeview').append(pre);

    });


})(jQuery);
