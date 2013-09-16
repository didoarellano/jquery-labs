App.IframeSandboxComponent = Ember.Component.extend({
    tagName: 'iframe',
    attributeBindings: ['src'],
    src: 'src',
    window: null,
    body: null,

    didInsertElement: function() {
        var iframe = this.$()[0];

        iframe.onload = function() {
            this.set('window', iframe.contentWindow);
            this.set('body', iframe.contentDocument.body);
            this.setIframeContent();
            iframe.className = 'active';
            iframe.onload = null;
        }.bind(this);
    },

    setIframeContent: function() {
        this.body.innerHTML = this.get('html');
    }.observes('exercise'),

    evaluate: function() {
        if (this.get('doNoEval')) { return; }

        var cmd = this.getProperties([
            'preCommand',
            'command',
            'firstAssert',
            'postCommand'
        ]);
        var window = this.window;
        var body = this.body;
        var result = {};
        var firstAssertResult;

        try {
            window.eval(cmd.preCommand);
            window.eval(cmd.command);

            firstAssertResult = window.eval(cmd.firstAssert);
            if (!firstAssertResult.passed) {
                throw new Error(firstAssertResult.message);
            }

            window.eval(cmd.postCommand);

            result.state = window.isCorrect;
            result.html = body.innerHTML;
        } catch (err) {
            result.state = 'error';
            result.errorMessage = err.name + ': ' + err.message;
        }

        this.sendAction('action', result);
    }.observes('command')
});
