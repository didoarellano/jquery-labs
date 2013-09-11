// http://stackoverflow.com/questions/10843362/how-should-i-bind-to-a-window-function-in-an-ember-view
App.WindowWrapper = Ember.Object.createWithMixins(Ember.Evented, {
    timeout: null,

    init: function() {
        $(window).on('resize', function() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.triggerEvt, 100);
        }.bind(this));
    },

    triggerEvt: function() {
        App.WindowWrapper.trigger('resize');
    }
});
