App.PrismHighlighterComponent = Ember.Component.extend({
    tagName: 'pre',

    highlighted: function() {
        var code = this.get('code');
        var language = this.get('language');
        if (language === 'markup') {
            // Prism's markup grammar expects only "<" chars to be escaped.
            code = code.replace(/</g, '&lt;');
        }
        var highlighted = Prism.highlight(code, Prism.languages[language]);
        return highlighted;
    }.property('code'),

    changeExercise: function() {
        this.rerender();
    }.observes('exercise')
});
