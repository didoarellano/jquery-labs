App.ExerciseView = Ember.View.extend({
    templateName: 'exercise',
    classNames: ['exercise-container', 'clearfix'],
    $sidebar: null,

    didInsertElement: function() {
        Ember.run.schedule('afterRender', this, 'setupWorkspace');
        App.WindowWrapper.on('resize', this, 'setHeight');
    },

    willDestroyElement: function() {
        App.WindowWrapper.off('resize', this, 'setHeight');
    },

    setupWorkspace: function() {
        this.$sidebar = this.$('.sidebar');
        this.setHeight();
        this.$sidebar.addClass('active');
    },

    setHeight: function() {
        var height = Math.max(window.innerHeight, this.$sidebar.height());
        this.$().height(height);
    }
});
