App.ExerciseController = Ember.ObjectController.extend({
    needs: ['categories', 'exercises'],
    actions: {
        gotoExercise: function(id) {
            this.transitionToRoute('exercise', this.getExercise(id));
        },

        buildCommand: function(answer) {
            var preCommand = this.get('preCommand') || '';
            var suffix = this.get('commandSuffix');
            var postCommand = this.get('postCommand') || '';
            var command = preCommand + answer + suffix + postCommand;

            this.set('doNoEval', false);
            this.set('answer', answer);
            this.set('command', command);
        },

        handleEvalResult: function(result) {
            console.log(result);
        }
    },

    getExercise: function(id) {
        return this.get('controllers.categories.model').findExerciseById(id);
    },

    preventEval: function() {
        this.set('doNoEval', true);
    }.observes('model'),

    answer: function(key, value) {
        if (arguments.length > 1) {
            this.set('userData.answer', value);
        }
        return this.get('userData.answer');
    }.property('model'),

    html: function() {
        var html = this.get('userData.htmlResult');
        if (html == null) {
            html = this.get('htmlStart');
        }
        return html;
    }.property('model'),

    htmlFiltered: function() {
        return this.get('html').replace(/\sdata-correct="?true"?/g, '');
    }.property('html'),

    allExercises: function() {
        return this.get('controllers.exercises.exercises');
    }.property('controllers.exercises.exercises'),

    prevExercise: function() {
        return this.getExercise(this.get('id') - 1);
    }.property('id'),

    nextExercise: function() {
        return this.getExercise(this.get('id') + 1);
    }.property('id')
});
