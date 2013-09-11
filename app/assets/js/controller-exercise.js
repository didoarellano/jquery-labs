App.ExerciseController = Ember.ObjectController.extend({
    needs: ['categories', 'exercises'],

    getExercise: function(id) {
        return this.get('controllers.categories.model').findExerciseById(id);
    },

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
