App.ExerciseController = Ember.ObjectController.extend({
    needs: ['categories', 'exercises'],
    actions: {
        gotoExercise: function(id) {
            this.transitionToRoute('exercise', this.getExercise(id));
        },

        buildCommand: function(answer) {
            var commands = this.get('commands');
            this.setProperties({
                answer: answer,
                preCommand: commands.pre,
                firstAssert: commands.firstAssert,
                postCommand: commands.post + commands.finalAssert,
                safetyIsOn: false,
                command: commands.prefix + answer
            });
        },

        handleEvalResult: function(result) {
            this.setProperties({
                state: result.state,
                errorMessage: result.errorMessage
            });
            if (result.html) {
                this.set('html', result.html);
            }
            Ember.run.schedule('actions', this.get('model'), 'saveUserData');
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
