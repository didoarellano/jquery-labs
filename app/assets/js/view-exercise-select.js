App.ExerciseSelectView = Ember.Select.extend({
    options: null,
    select: null,

    didInsertElement: function() {
        this.select = this.$()[0];
        this.options = [].slice.call(this.select.options, 0);
    },

    change: function(e) {
        var id = parseInt(this.options[this.select.selectedIndex].value, 10);
        if (id !== this.get('currentExerciseId')) {
            this.get('controller').send('gotoExercise', id);
        }
        Ember.run.later(this, function() {
            this.options[0].selected = 'selected';
        }, 0)
    }
});
