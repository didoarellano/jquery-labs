App.Category = Ember.Object.extend({
    _exercises: null,

    label: function() {
        var name = this.get('id');
        return name.charAt(0).toUpperCase() + name.slice(1);
    }.property('id'),

    getExercises: function() {
        if (this._exercises) { return this._exercises; }
        var collection = this._exercises = jQLabsData.exercises.findBy('category', this.get('id'));
        collection.exercises = collection.exercises.map(function(exercise) {
            return App.Exercise.create(exercise);
        });
        return collection;
    }
});

App.Category.reopenClass({
    findAll: function() {
        if (this._all) { return this._all; }
        var categories = [];
        jQLabsData.categories.forEach(function(category) {
            categories.pushObject(App.Category.create(category));
        });
        this._all = categories;
        return categories;
    },
    find: function(category) {
        if (!category) { return this.findAll(); }
        this._all = this._all || this.findAll();
        return this._all.findBy('id', category);
    }
});
