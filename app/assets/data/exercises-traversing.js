var jQLabsData = jQLabsData || {};
jQLabsData["exercises-traversing"] = {
    "exercises": [
        {
            "category": "traversing",
            "id": 1,
            "instructions": "<h2>1. Traversing. Lorem ipsum dolor sit amet</h2><p>Traversing: Nullam lorem orci, faucibus nec elit in, scelerisque fringilla erat. Nunc aliquet posuere neque a imperdiet. Fusce accumsan velit nec blandit volutpat.</p>",
            "htmlStart": "<h1 data-correct=\"true\" class=\"klass\">First traversing exercise</h1>\n<p>Hello</p>",
            "commands": {
                "pre": "$('[s]').removeAttr('s');",
                "prefix": "window.$s=",
                "firstAssert": "(function($s, $) {if (!($s instanceof $)) {throw new Error('Input is not a jQuery object');}}(window.$s, jQuery));",
                "post": "$s.attr('s', function() {return $(this).data('correct') ? '✓' : 'x';});",
                "finalAssert": "(function(window, $) {var expected = $('h1').get(); window.isCorrect = (function(a, b) {var l = a.length; if (l !== b.length) return false; while (l--) {if (a[l] !== b[l]) return false;} return true;}(window.$s.get().sort(), expected));}(window, jQuery));"
            },
            "userData": {
                "answer": null,
                "html": null,
                "timestamp": 0
            }
        },
        {
            "category": "traversing",
            "id": 2,
            "instructions": "<h2>2. Traversing. Lorem ipsum dolor sit amet</h2><p>Traversing: Nunc aliquet posuere neque a imperdiet. Nullam lorem orci, faucibus nec elit in, scelerisque fringilla erat. Fusce accumsan velit nec blandit volutpat.</p>",
            "htmlStart": "<h1 data-correct=\"true\" class=\"klass\">Second traversing exercise</h1>",
            "commands": {
                "pre": "$('[s]').removeAttr('s');",
                "prefix": "window.$s=",
                "firstAssert": "(function($s, $) {if (!($s instanceof $)) {throw new Error('Input is not a jQuery object');}}(window.$s, jQuery));",
                "post": "$s.attr('s', function() {return $(this).data('correct') ? '✓' : 'x';});",
                "finalAssert": "(function(window, $) {var expected = $('h1').get(); window.isCorrect = (function(a, b) {var l = a.length; if (l !== b.length) return false; while (l--) {if (a[l] !== b[l]) return false;} return true;}(window.$s.get().sort(), expected));}(window, jQuery));"
            },
            "userData": {
                "answer": null,
                "html": null,
                "timestamp": 0
            }
        },
        {
            "category": "traversing",
            "id": 3,
            "instructions": "<h2>3. Traversing. Lorem ipsum dolor sit amet</h2><p>Traversing: Nullam lorem orci, faucibus nec elit in, scelerisque fringilla erat. Fusce accumsan velit nec blandit volutpat. Posuere neque a imperdiet.</p>",
            "htmlStart": "<h1 data-correct=\"true\" class=\"klass\">Third traversing exercise</h1>",
            "commands": {
                "pre": "$('[s]').removeAttr('s');",
                "prefix": "window.$s=",
                "firstAssert": "(function($s, $) {if (!($s instanceof $)) {throw new Error('Input is not a jQuery object');}}(window.$s, jQuery));",
                "post": "$s.attr('s', function() {return $(this).data('correct') ? '✓' : 'x';});",
                "finalAssert": "(function(window, $) {var expected = $('h1').get(); window.isCorrect = (function(a, b) {var l = a.length; if (l !== b.length) return false; while (l--) {if (a[l] !== b[l]) return false;} return true;}(window.$s.get().sort(), expected));}(window, jQuery));"
            },
            "userData": {
                "answer": null,
                "html": null,
                "timestamp": 0
            }
        }
    ]
};
