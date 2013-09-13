App.CommandLineComponent = Ember.Component.extend({
    tagName: 'form',
    classNames: ['command-line'],
    classNameBindings: 'exerciseState',

    didInsertElement: function() {
        this.$input = this.$('input');
        this.focus();
    },

    focus: function() {
        this.$input
            // FF23 doesn't support autofocus yet. We also want to refocus the
            // input on exercise change which using only the autofocus attribute
            // won't accomplish for us.
            .trigger('focus')
             // Unselect the text on render by re-applying value.
            .val(this.get('value'));
    }.observes('exercise'),

    submit: function(e) {
        e.preventDefault();
        var newValue = this.$input.val().trim();
        var previousValue = this.get('value');
        if (!newValue || newValue === previousValue) { return; }
        this.sendAction('action', newValue);
    },

    doStateAnimation: function() {
        if (this.get('dontAnimate')) { return; }
        var duration = this.get('exerciseState') === 'error' ? 1500 : 500;
        this.$el = this.$el || this.$();
        this.$el.addClass('animate');
        Ember.run.later(this, function() {
            this.$el.removeClass('animate');
        }, duration);
    }.observes('exerciseState')
});
