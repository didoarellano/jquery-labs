window.onhashchange = function() {

    var hash = Labs.parseHash(window.location.hash);

    // ...

    if (hash.category !== Labs.currentCategory) {
        Labs.Exercises.fetch(hash.category, path, function() {
            // set Labs.currentCategory and Labs.currentExercise to
            // hash.category and hash.exercise respectively.
            Appview.render(Labs.currentExercise);
        });
    } else {
        // new exercise number; same category
        Appview.render(Labs.currentExercise);
    }

};
