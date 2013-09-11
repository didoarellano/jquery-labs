App.PrismHighlighterComponent = Ember.Component.extend({
    tagName: 'pre',
    didInsertElement: function() {
        var code = this.get('code');
        var language = this.get('language');
        if (language === 'markup') {
            // Prism's markup grammar expects only "<" chars to be escaped.
            code = code.replace(/</g, '&lt;');
        }
        var highlighted = Prism.highlight(code, Prism.languages[language]);
        this.set('highlighted', highlighted);
    },

    changeExercise: function() {
        this.rerender();
    }.observes('exercise')
});
