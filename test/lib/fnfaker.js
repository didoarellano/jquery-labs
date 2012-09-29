function FnFaker(extra) {

    "use strict";

    function fn() {
        fn.called = true;
        fn.args = Array.prototype.slice.call(arguments);
        return fn;
    }

    for (var i in extra) {
        if (extra.hasOwnProperty(i)) {
            fn[i] = extra[i];
        }
    }

    fn.called = false;
    return fn;

}
