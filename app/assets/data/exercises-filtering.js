var jQLabsData = jQLabsData || {};
jQLabsData["exercises-filtering"] = {
    "exercises": [
        {
            "category": "filtering",
            "id": 1,
            "instructions": "<h2>1. Filtering. Lorem ipsum dolor sit amet</h2><p>Filtering: Nullam lorem orci, faucibus nec elit in, scelerisque fringilla erat. Nunc aliquet posuere neque a imperdiet. Fusce accumsan velit nec blandit volutpat.</p>",
            "htmlStart": "<h1 data-correct=\"true\" class=\"klass\">First filtering exercise</h1>",
            "commands": {
                "pre": "$('[s]').removeAttr('s');",
                "prefix": "window.$s=",
                "firstAssert": "(function($s, $) {var ret = { passed: true }; if (!($s instanceof $)) {ret.passed = false; ret.message = 'Input is not a jQuery object';} return ret;}(window.$s, jQuery));",
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
            "category": "filtering",
            "id": 2,
            "instructions": "<h2>2. Filtering. Lorem ipsum dolor sit amet</h2><p>Filtering: Nunc aliquet posuere neque a imperdiet. Nullam lorem orci, faucibus nec elit in, scelerisque fringilla erat. Fusce accumsan velit nec blandit volutpat.</p>",
            "htmlStart": "<h1 data-correct=\"true\" class=\"klass\">Second filtering exercise</h1>",
            "commands": {
                "pre": "$('[s]').removeAttr('s');",
                "prefix": "window.$s=",
                "firstAssert": "(function($s, $) {var ret = { passed: true }; if (!($s instanceof $)) {ret.passed = false; ret.message = 'Input is not a jQuery object';} return ret;}(window.$s, jQuery));",
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
            "category": "filtering",
            "id": 3,
            "instructions": "<h2>3. Filtering. Lorem ipsum dolor sit amet</h2><p>Filtering: Nullam lorem orci, faucibus nec elit in, scelerisque fringilla erat. Fusce accumsan velit nec blandit volutpat. Posuere neque a imperdiet.</p>",
            "htmlStart": "<h1 data-correct=\"true\" class=\"klass\">Third filtering exercise</h1>",
            "commands": {
                "pre": "$('[s]').removeAttr('s');",
                "prefix": "window.$s=",
                "firstAssert": "(function($s, $) {var ret = { passed: true }; if (!($s instanceof $)) {ret.passed = false; ret.message = 'Input is not a jQuery object';} return ret;}(window.$s, jQuery));",
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
