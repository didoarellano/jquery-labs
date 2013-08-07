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


    function mockupExercise() {
        var iframe = document.querySelector('iframe');
        if (!iframe) { return; }
        var htmlSeed = document.querySelector('.sidebar');
        var html = htmlSeed.innerHTML;
        var code = document.querySelector('code');
        iframe.contentDocument.body.innerHTML = html;

        // Firefox srcdoc support starts at v25. Chrome works now. This will
        // make data-binding in Ember templates much easier (I think).
        // iframe.srcdoc = html;

        html = html.replace(/^\s+|\s+$/g, '').split('\n').map(function(str) {
            return str.replace('      ', '')
                .replace(/[<>]/g, function(m) {
                    return {
                        '<': '&lt;',
                        '>': '&gt;'
                    }[m];
                });
        });
        code.innerHTML = html.join('\n');;

        var container = document.querySelector('.exercise-container');
        var height = window.innerHeight;
        container.style.height = height + 'px';
    }

    mockupExercise();


}(window, document));
