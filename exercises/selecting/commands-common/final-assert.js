(function(window, $) {
    var expected = $('[data-correct="true"]').get();
    var answer = window.$s.get();
    window.isCorrect = (function(a, b) {
        var l = a.length;
        if (l !== b.length) return false;
        while (l--) {
            if (a[l] !== b[l]) return false;
        }
        return true;
    }($.unique(answer), $.unique(expected)));
}(window, jQuery));
