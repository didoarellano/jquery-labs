var jQLabsData = jQLabsData || {};
jQLabsData["exercises-selecting"] = {
    "exercises": [
        {
            "category": "selecting",
            "id": 1,
            "instructions": "<h2>1. Selecting. Lorem ipsum dolor sit amet</h2><p>Selecting: Nullam lorem orci, faucibus nec elit in, scelerisque fringilla erat. Nunc aliquet posuere neque a imperdiet. Fusce accumsan velit nec blandit volutpat.</p>",
            "htmlStart": "<h1 data-correct=\"true\" class=\"klass\">First selecting exercise</h1>\n<ul class=\"nav\">\n  <li>\n    <a href=\"#\">Section 1</a>\n    <ul>\n      <li><a href=\"#\">Section 1a</a></li>\n      <li>\n        <a href=\"#\">Section 1b</a>\n        <ul>\n          <li><a href=\"#\">Section 1b1</a></li>\n          <li><a href=\"#\">Section 1b2</a></li>\n          <li><a href=\"#\">Section 1b3</a></li>\n        </ul>\n      </li>\n      <li><a href=\"#\">Section 1c</a></li>\n      <li><a href=\"#\">Section 1d</a></li>\n      <li><a href=\"#\">Section 1e</a></li>\n    </ul>\n  </li>\n  <li><a href=\"#\">Section 2</a></li>\n</ul>\n\n<h1 data-correct=\"true\" class=\"klass\">First selecting exercise</h1>\n<ul class=\"nav\">\n  <li>\n    <a href=\"#\">Section 1</a>\n    <ul>\n      <li><a href=\"#\">Section 1a</a></li>\n      <li>\n        <a href=\"#\">Section 1b</a>\n        <ul>\n          <li><a href=\"#\">Section 1b1</a></li>\n          <li><a href=\"#\">Section 1b2</a></li>\n          <li><a href=\"#\">Section 1b3</a></li>\n        </ul>\n      </li>\n      <li><a href=\"#\">Section 1c</a></li>\n      <li><a href=\"#\">Section 1d</a></li>\n      <li><a href=\"#\">Section 1e</a></li>\n    </ul>\n  </li>\n  <li><a href=\"#\">Section 2</a></li>\n</ul>\n<h1 data-correct=\"true\" class=\"klass\">First selecting exercise</h1>\n<ul class=\"nav\">\n  <li>\n    <a href=\"#\">Section 1</a>\n    <ul>\n      <li><a href=\"#\">Section 1a</a></li>\n      <li>\n        <a href=\"#\">Section 1b</a>\n        <ul>\n          <li><a href=\"#\">Section 1b1</a></li>\n          <li><a href=\"#\">Section 1b2</a></li>\n          <li><a href=\"#\">Section 1b3</a></li>\n        </ul>\n      </li>\n      <li><a href=\"#\">Section 1c</a></li>\n      <li><a href=\"#\">Section 1d</a></li>\n      <li><a href=\"#\">Section 1e</a></li>\n    </ul>\n  </li>\n  <li><a href=\"#\">Section 2</a></li>\n</ul>\n\n<h1 data-correct=\"true\" class=\"klass\">First selecting exercise</h1>\n<ul class=\"nav\">\n  <li>\n    <a href=\"#\">Section 1</a>\n    <ul>\n      <li><a href=\"#\">Section 1a</a></li>\n      <li>\n        <a href=\"#\">Section 1b</a>\n        <ul>\n          <li><a href=\"#\">Section 1b1</a></li>\n          <li><a href=\"#\">Section 1b2</a></li>\n          <li><a href=\"#\">Section 1b3</a></li>\n        </ul>\n      </li>\n      <li><a href=\"#\">Section 1c</a></li>\n      <li><a href=\"#\">Section 1d</a></li>\n      <li><a href=\"#\">Section 1e</a></li>\n    </ul>\n  </li>\n  <li><a href=\"#\">Section 2</a></li>\n</ul>",
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
            "category": "selecting",
            "id": 2,
            "instructions": "<h2>2 Selecting.. Lorem ipsum dolor sit amet</h2><p>Selecting: Nunc aliquet posuere neque a imperdiet. Nullam lorem orci, faucibus nec elit in, scelerisque fringilla erat. Fusce accumsan velit nec blandit volutpat.</p>",
            "htmlStart": "<h1 class=\"klass\">Second selecting exercise</h1>\n<h2 data-correct=\"true\">This one yo.</h2",
            "commands": {
                "pre": "$('[s]').removeAttr('s');",
                "prefix": "window.$s=",
                "firstAssert": "(function($s, $) {if (!($s instanceof $)) {throw new Error('Input is not a jQuery object');}}(window.$s, jQuery));",
                "post": "$s.attr('s', function() {return $(this).data('correct') ? '✓' : 'x';});",
                "finalAssert": "(function(window, $) {var expected = $('h2').get(); window.isCorrect = (function(a, b) {var l = a.length; if (l !== b.length) return false; while (l--) {if (a[l] !== b[l]) return false;} return true;}(window.$s.get().sort(), expected));}(window, jQuery));"
            },
            "userData": {
                "answer": null,
                "html": null,
                "timestamp": 0
            }
        },
        {
            "category": "selecting",
            "id": 3,
            "instructions": "<h2>3. Selecting. Lorem ipsum dolor sit amet</h2><p>Selecting: Nullam lorem orci, faucibus nec elit in, scelerisque fringilla erat. Fusce accumsan velit nec blandit volutpat. Posuere neque a imperdiet.</p>",
            "htmlStart": "<h1 class=\"klass\">Third selecting exercise</h1>\n<ul>\n  <li data-correct=\"true\">List item 1</li>\n  <li data-correct=\"true\">List item 2</li>\n  <li data-correct=\"true\">List item 3</li>\n</ul>",
            "commands": {
                "pre": "$('[s]').removeAttr('s');",
                "prefix": "window.$s=",
                "firstAssert": "(function($s, $) {if (!($s instanceof $)) {throw new Error('Input is not a jQuery object');}}(window.$s, jQuery));",
                "post": "$s.attr('s', function() {return $(this).data('correct') ? '✓' : 'x';});",
                "finalAssert": "(function(window, $) {var expected = $('li').get(); window.isCorrect = (function(a, b) {var l = a.length; if (l !== b.length) return false; while (l--) {if (a[l] !== b[l]) return false;} return true;}(window.$s.get().sort(), expected));}(window, jQuery));"
            },
            "userData": {
                "answer": null,
                "html": null,
                "timestamp": 0
            }
        }
    ]
};