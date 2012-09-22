function FnFaker() {
    function fn() {
        fn.called = true;
        fn.args = Array.prototype.slice.call(arguments);
    }
    fn.called = false;
    return fn;
}
