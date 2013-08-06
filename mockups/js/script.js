(function(window, document) {

    function upCaseFirstChar(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    var mockPages = ['index', 'category-index', 'exercise-single-line', 'exercise-multi-line'];
    var mockContainer = document.createElement('div');
    mockContainer.id = 'mockup-nav';
    var links = mockPages.map(function(page) {
        var name = upCaseFirstChar(page.replace(/-/g, ' '));
        return '<a href="' +page+ '.html">' +name+ '</a>';;
    }).join('');
    var mockNav = '<nav>' + links + '</nav>' + '<a href="#" data-icon="&#xe009;"></a>';
    mockContainer.innerHTML = mockNav;
    document.body.appendChild(mockContainer);

}(window, document));
