App.ExerciseView = Ember.View.extend({
    templateName: 'exercise',
    classNames: ['exercise-container', 'clearfix'],
    $sidebar: null,

    didInsertElement: function() {
        this.setHeight();
        App.WindowWrapper.on('resize', this, 'setHeight');
    },

    willDestroyElement: function() {
        App.WindowWrapper.off('resize', this, 'setHeight');
    },

    setHeight: function() {
        var $sidebar = this.$sidebar;
        if (!$sidebar) {
            $sidebar = this.$sidebar = this.$('.sidebar');
        }

        var height = Math.max(window.innerHeight, $sidebar.height());
        this.$().height(height);
    }
});
