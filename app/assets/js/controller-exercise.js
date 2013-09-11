App.ExerciseController = Ember.ObjectController.extend({
    needs: ['categories', 'exercises'],

    allExercises: function() {
        return this.get('controllers.exercises.exercises');
    }.property('controllers.exercises.exercises')
});
