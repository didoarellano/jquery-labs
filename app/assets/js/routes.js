App.Router.map(function() {
    this.resource('categories', { path: ':category_id' }, function() {
        this.route('category', { path: '' });
        this.resource('exercises', function() {
            this.route('index', { path: '' })
        });
    });
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return App.Category.find();
    }
});

App.CategoriesRoute = Ember.Route.extend({
    model: function(params) {
        return App.Category.find(params.category_id);
    }
});

App.CategoriesCategoryRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('categories');
    }
});

App.ExercisesRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('categories').getExercises();
    }
})

App.ExercisesIndexRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('exercises');
    },
})
