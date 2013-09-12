App.IframeSandboxComponent = Ember.Component.extend({
    tagName: 'iframe',
    attributeBindings: ['src'],
    src: 'src',
    window: null,
    body: null,

    didInsertElement: function() {
        var iframe = this.$()[0];
        var html = this.get('html');

        iframe.onload = function() {
            var body = iframe.contentDocument.body;
            body.innerHTML = html;
            this.set('window', iframe.contentWindow);
            this.set('body', body);
            iframe.onload = null;
        }.bind(this);
    },

    changeExercise: function() {
        this.rerender();
    }.observes('exercise'),

    evaluate: function() {
        var cmd = this.get('command');
        var window = this.window;
        var body = this.body;
        var result = {};

        try {
            window.eval(cmd);
            result.state = window.isCorrect;
            result.html = body.innerHTML;
        } catch (err) {
            result.state = 'error';
            result.errorMsg = err.name + ': ' + err.message;
        }

        this.sendAction('action', result);
    }.observes('command')
});
