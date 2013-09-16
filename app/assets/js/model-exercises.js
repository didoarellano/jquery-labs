App.Exercise = Ember.Object.extend({
    answer: function(key, value) {
        if (arguments.length > 1) {
            this.set('userData.answer', value);
        }
        return this.get('userData.answer');
    }.property('userData.answer'),

    html: function(key, value) {
        if (arguments.length > 1) {
            this.set('userData.htmlResult', value);
        }
        var html = this.get('userData.htmlResult');
        if (html == null) {
            html = this.get('htmlStart');
        }
        return html;
    }.property('userData.htmlResult'),

    state: function(key, value) {
        if (arguments.length > 1) {
            this.set('userData.state', this.getStateText(value));
        }
        return this.get('userData.state');
    }.property('userData.state'),

    getStateText: function(state) {
        switch (state) {
        case true:
            state = 'correct';
            break;
        case false:
            state = 'incorrect';
            break;
        case 'error':
            state = state;
            break;
        default:
            state = null;
            break;
        }
        return state;
    }
});
