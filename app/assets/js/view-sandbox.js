App.SandboxView = Ember.View.extend({
    tagName: 'iframe',
    attributeBindings: ['src'],
    src: 'assets/sandbox/sandbox.html',
    window: null,
    body: null,

    didInsertElement: function() {
        var iframe = this.$()[0];
        var html = this.get('content.html');

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
    }.observes('exercise')
});
