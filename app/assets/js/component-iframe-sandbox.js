App.IframeSandboxComponent = Ember.Component.extend({
    tagName: 'iframe',
    attributeBindings: ['src'],
    src: 'src',
    iframe: null,
    sandbox: null,

    // '*' is for development and class use only. Replace with proper value when
    // we deploy to the web.
    targetOrigin: '*',

    // messageHandlers methods' context is set to the component like the actions
    // hash.
    messageHandlers: {
        loaded: function(data) {
            this.sandbox = this.iframe.contentWindow;
            this.setIframeContent();
            this.iframe.className = 'active';
        },
        evalFinished: function(data) {
            this.sendAction('action', data);
        }
    },

    didInsertElement: function() {
        this.iframe = this.$()[0];
        window.addEventListener('message', function(e) {
            var data = JSON.parse(e.data);
            this.messageHandlers[data.type].call(this, data.data);
        }.bind(this), false);
    },

    postMessage: function(type, data) {
        // this.sandbox guard is a temporary(?) workaround to prevent thrown
        // exception when navigating back to exercise from exercise index. More
        // details in org-file.
        this.sandbox && this.sandbox.postMessage(JSON.stringify({
            type: type,
            data: data
        }), this.targetOrigin);
    },

    setIframeContent: function() {
        this.postMessage('setContent', this.get('html'));
    }.observes('exercise'),

    evaluate: function() {
        if (this.get('doNoEval')) { return; }

        var commands = this.getProperties([
            'preCommand',
            'command',
            'firstAssert',
            'postCommand'
        ]);

        this.postMessage('evaluate', commands);
    }.observes('command')
});
