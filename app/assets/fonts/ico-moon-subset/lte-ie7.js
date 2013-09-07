/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'IcoMoonSubset\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-github' : '&#xf09b;',
			'icon-twitter' : '&#xe000;',
			'icon-semicolon-studios' : '&#x3b;',
			'icon-selecting' : '&#xe007;',
			'icon-traversing' : '&#xf0e8;',
			'icon-filtering' : '&#xf0b0;',
			'icon-correct' : '&#xf00c;',
			'icon-incorrect' : '&#xf00d;',
			'icon-correct-2' : '&#xe006;',
			'icon-correct-3' : '&#xe005;',
			'icon-incorrect-2' : '&#xe004;',
			'icon-incorrect-3' : '&#xe003;',
			'icon-error' : '&#xe002;',
			'icon-error-2' : '&#xe001;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};