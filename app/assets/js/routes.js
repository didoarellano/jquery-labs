App.Router.map(function() {
    this.resource('categories', { path: ':category_id' }, function() {
        this.route('category', { path: '' });
    });
});

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return App.Category.find();
    }
});

App.CategoriesRoute = Ember.Route.extend({
    model: function(params) {
        return App.Category.find(parmas.category_id);
    }
});

App.CategoriesCategoryRoute = Ember.Route.extend({
    model: function() {
        return this.modelFor('categories');
    }
});
