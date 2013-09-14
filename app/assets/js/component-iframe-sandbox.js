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
        var preCommand = this.get('preCommand');
        var command = this.get('command');
        var firstAssert = this.get('firstAssert');
        var postCommand = this.get('postCommand');
        var window = this.window;
        var body = this.body;
        var result = {};
        var firstAssertResult;

        if (this.get('doNoEval')) { return; }

        try {
            window.eval(preCommand);
            window.eval(command);

            firstAssertResult = window.eval(firstAssert);
            if (!firstAssertResult.passed) {
                throw new Error(firstAssertResult.message);
            }

            window.eval(postCommand);

            result.state = window.isCorrect;
            result.html = body.innerHTML;
        } catch (err) {
            result.state = 'error';
            result.errorMessage = err.name + ': ' + err.message;
        }

        this.sendAction('action', result);
    }.observes('command')
});
