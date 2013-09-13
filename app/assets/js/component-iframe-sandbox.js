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
            iframe.onload = null;
        }.bind(this);
    },

    setIframeContent: function() {
        this.body.innerHTML = this.get('html');
    }.observes('exercise'),

    evaluate: function() {
        var cmd = this.get('command');
        var window = this.window;
        var body = this.body;
        var result = {};

        if (this.get('doNoEval')) { return; }

        try {
            window.eval(cmd);
            result.state = window.isCorrect;
            result.html = body.innerHTML;
        } catch (err) {
            result.state = 'error';
            result.errorMessage = err.name + ': ' + err.message;
        }

        this.sendAction('action', result);
    }.observes('command')
});
