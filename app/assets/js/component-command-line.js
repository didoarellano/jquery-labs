App.CommandLineComponent = Ember.Component.extend({
    tagName: 'form',
    classNames: ['command-line'],

    didInsertElement: function() {
        this.$input = this.$('input');
        this.focus();
    },

    focus: function() {
        this.$input
            // FF23 doesn't support autofocus yet. We also want to refocus the
            // input on exercise change which using only the autofocus attribute
            // won't accomplish for us.
            .trigger('focus');
    }.observes('exercise')
});
