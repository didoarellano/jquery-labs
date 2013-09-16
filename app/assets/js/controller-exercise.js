App.ExerciseController = Ember.ObjectController.extend({
    needs: ['categories', 'exercises'],
    actions: {
        gotoExercise: function(id) {
            this.transitionToRoute('exercise', this.getExercise(id));
        },

        buildCommand: function(answer) {
            var commands = this.get('commands');

            this.set('answer', answer);
            this.set('preCommand', commands.pre);
            this.set('firstAssert', commands.firstAssert);
            this.set('postCommand', commands.post + commands.finalAssert);

            this.set('safetyIsOn', false);
            this.set('command', commands.prefix + answer);
        },

        handleEvalResult: function(result) {
            this.set('state', result.state);
            this.set('errorMessage', result.errorMessage);
            if (result.html) {
                this.set('html', result.html);
            }
        }
    },

    getExercise: function(id) {
        return this.get('controllers.categories.model').findExerciseById(id);
    },

    toggleSafety: function() {
        this.set('safetyIsOn', true);
    }.observes('model'),

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
