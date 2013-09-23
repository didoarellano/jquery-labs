(function(window, document) {

    var body = null;

    // '*' is for development and class use only. Replace with proper value when
    // we deploy to the web.
    var targetOrigin = '*';

    var messageHandlers = {
        setContent: function(html) {
            body.innerHTML = html;
        },
        evaluate: function(commands) {
            var result = {};
            try {
                window.eval(commands.preCommand);
                window.eval(commands.command);
                window.eval(commands.firstAssert);
                window.eval(commands.postCommand);

                result.state = window.isCorrect;
                result.html = body.innerHTML;
            } catch (err) {
                result.state = 'error';
                result.errorMessage = err.name + ': ' + err.message;
            }

            postMessage('evalFinished', result);
        }
    };

    function postMessage(type, data) {
        window.parent.postMessage(JSON.stringify({
            type: type,
            data: data
        }), targetOrigin);
    }

    window.onload = function() {
        body = document.body;
        postMessage('loaded');
        window.onload = null;
    };

    window.addEventListener('message', function(e) {
        var message = JSON.parse(e.data);
        messageHandlers[message.type](message.data);
    }, false);

}(window, document));
