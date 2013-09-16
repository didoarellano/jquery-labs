App.Exercise = Ember.Object.extend({
    _userDataSynced: false,

    _storeKey: function() {
        return this.category + '-exercise-' + this.id + '-userData';
    }.property(),

    answer: function(key, value) {
        if (!this._userDataSynced) {
            this._syncUserData();
        }
        if (arguments.length > 1) {
            this.set('userData.answer', value);
        }
        return this.get('userData.answer');
    }.property('userData.answer'),

    html: function(key, value) {
        if (!this._userDataSynced) {
            this._syncUserData();
        }
        if (arguments.length > 1) {
            this.set('userData.html', value);
        }
        var html = this.get('userData.html');
        if (html == null) {
            html = this.get('htmlStart');
        }
        return html;
    }.property('userData.html'),

    state: function(key, value) {
        if (!this._userDataSynced) {
            this._syncUserData();
        }
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
    },

    saveUserData: function() {
        var key = this.get('_storeKey');
        var data = this.getProperties(['answer', 'html', 'state']);
        data.timestamp = Date.now();
        window.localStorage.setItem(key, JSON.stringify(data));
    },

    _syncUserData: function() {
        var key = this.get('_storeKey');
        var client = JSON.parse(window.localStorage.getItem(key));
        if (client && client.timestamp > this.get('userData.timestamp')) {
            this.setProperties({
                'userData.answer': client.answer,
                'userData.state': client.state,
                'userData.html': client.html
            });
        }
        this._userDataSynced = true;
    }
});
