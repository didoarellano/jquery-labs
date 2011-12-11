(function($, window, undefined ){

    window.LABS = {

        whereami: '',
        exercises: [],
        current_exercise: 0,
        exercises_dir: '',
        store: window.localStorage,

        // Constructor function for exercises
        Exercise: function(config) {
            var default_suffix = ".addClass('selected')";

            this.iframe_src  = LABS.exercises_dir + config.iframe_name + '.html';
            this.iframe_html = '';
            this.cmd         = '';
            this.cmd_suffix  = ".addClass('selected')";

            $.extend(this, config);
        },

        get_config: function() {
            $.getJSON(this.exercises_dir + 'config.json', function(data) {
                $.publish('config_gotten', data);
            });
        },

        // Kicks off the app by getting config JSON data from the filesystem
        // or from localstorage.
        // Also registers subscribers.
        init: function() {
            var path = window.location.pathname;
            this.whereami = path.substr(path.lastIndexOf('/')+1, path.length).replace('.html','');
            this.exercises_dir = 'exercises/' + this.whereami + '/';

            LABS.get_config();

            var save_point = +this.store.getItem(this.whereami + ':current_exercise') ||
                             this.current_exercise;

            $.subscribe('config_gotten', LABS.create_exercises);

            $.subscribe('templates_rendered', LABS.setup_iframes);

            $.subscribe('exercises_created', function() {
                $(document).ready(LABS.on_ready);
            });

            $.subscribe('iframe_loaded', function(e, context) {
                LABS.render_codeview.call(LABS.exercises[context]);
                LABS.equalize_heights.call(LABS.exercises[context]);
            });

            $.subscribe('iframes_loaded', function() {
                LABS.set_current_exercise(save_point, true);
                LABS.setup_viewport();
                LABS.scroll_to.call(LABS.exercises[LABS.current_exercise], false);
                LABS.$wrapper.animate({opacity: 1});
            });

            $.subscribe('command_executed', function() {
                LABS.render_codeview.call( LABS.exercises[LABS.current_exercise] );
            });

            $.subscribe('current_exercise_changed', function() {
                LABS.set_form_view.call( LABS.exercises[LABS.current_exercise] );
            });
        },

        on_ready: function() {
            // Cache elements for later use
            LABS.$wrapper = $('.wrapper').css('opacity', 0);
            LABS.$tabs = $('.tabs');
            LABS.$form = $('form');

            // Render the templates
            var sections = $('#section-tmpl').jqote( LABS.exercises );
            LABS.$wrapper.html(sections);
            $.publish('templates_rendered');

            var opts = '';
            var ex_num = LABS.exercises.length;
            var i;
            for (var i = 1; i <= ex_num; i++) {
                opts += '<option>' +i+ '</option>';
            }

            LABS.$form.find('select').html(opts).on('change', function() {
                if (LABS.set_current_exercise($(this).val() - 1, true)) {
                    LABS.scroll_to.call(LABS.exercises[LABS.current_exercise]);
                }
            });

            LABS.$form.on('submit', function(e) {
                e.preventDefault();
                var cmd = LABS.$form.find('input').val().trim().replace(';', '');
                if (cmd === '') return;

                LABS.exec_cmd.call( LABS.exercises[LABS.current_exercise], cmd );
            });

            LABS.$form.on('click', 'button', function() {
                var $this = $(this);
                var dir = $this.text().toLowerCase();

                if ( LABS.set_current_exercise(dir, true) ) {
                    $this.prop('disabled', true);
                    LABS.scroll_to.call(
                        LABS.exercises[LABS.current_exercise], function() {
                            $this.prop('disabled', false);
                        }
                    );
                }
            });

            $(window).on({
                resize: function() {
                    LABS.setup_viewport();
                    LABS.scroll_to.call(LABS.exercises[LABS.current_exercise], false);
                },
                hashchange: function() {
                    var hash = window.location.hash.slice(1);
                    var set_hash = true;
                    // console.log( arguments );
                    if (hash === '') {
                        // window.history.replaceState(null, null, window.location.href + '#1');
                        window.location.replace(window.location.href + '#1');
                        // set_hash = false;
                    }
                    hash = parseInt(hash, 10) - 1;
                    LABS.set_current_exercise(hash, set_hash);
                    LABS.scroll_to.call(LABS.exercises[LABS.current_exercise], true);
                }
            });

        },

        setup_iframes: function() {
            function iframe_onload($iframe, index, dfd) {
                $iframe.css({
                    width: $iframe.closest('div').width() - ($iframe.innerWidth() - $iframe.width()),
                    height: $iframe.contents().find('html').height()
                });
                $.publish('iframe_loaded', index);
                dfd.resolve();
            }

            var deferreds = $.map(LABS.$wrapper.find('iframe'), function(el, i) {
                var dfd = $.Deferred();
                var $iframe = $(el);
                var $section = $iframe.closest('section');
                var index = $section.index();

                // The index method works but I am a little uneasy having it
                // tied to the DOM like this.
                // The each method seems a little more robust but will be
                // slower (by how much and does it matter?).
                LABS.exercises[index].sandbox  = $iframe[0].contentWindow;
                LABS.exercises[index].iframe   = $iframe[0];
                LABS.exercises[index].section  = $section[0];
                LABS.exercises[index].code     = $section.find('code')[0];
                // $.each(LABS.exercises, function(i, obj) {
                //     if (obj.iframe_name === $iframe[0].name.trim()) {
                //         obj.sandbox  = $iframe[0].contentWindow;
                //         obj.iframe   = $iframe[0];
                //         obj.section  = $section[0];
                //         obj.code     = $section.find('code')[0];
                //     }
                // });

                $iframe.load(function() { iframe_onload($iframe, index, dfd); });

                return dfd.promise();
            });

            $.when.apply($, deferreds).then(function() {
                $.publish('iframes_loaded');
            });

        },

        setup_viewport: function() {
            LABS.$wrapper.find('section').height(
                $(window).height() - (LABS.$tabs.outerHeight() + LABS.$form.outerHeight())
            );
            LABS.$wrapper.find('iframe').width(function() {
                var $this = $(this);
                return $this.closest('div').width() - ($this.innerWidth() - $this.width());
            });
            $(document.body).height($(window).height());
        },

        scroll_to: function() {
            var arg = arguments[0];
            var posy = $(this.section).position().top;
            var delay_cb = typeof arg === 'function' ?
                function() { setTimeout(arg, 200); } :
                $.noop;
            var duration = arg ? 400 : 0;

            LABS.$wrapper.animate( {top: -posy}, duration, delay_cb );
        },

        set_current_exercise: function(set_to, set_hash) {
            var to = LABS.current_exercise;

            if (typeof set_to === 'number') to = set_to;
            if (set_to === 'next') to++;
            if (set_to === 'prev') to--;

            if (LABS.exercises[to] === undefined) return false;

            LABS.current_exercise = to;
            LABS.store.setItem(this.whereami + ':current_exercise', to);

            if (set_hash) window.location.hash = ++to;

            $.publish('current_exercise_changed');
            return true;

        },

        set_form_view: function() {
            if (LABS.whereami !== 'selecting') {
                LABS.$form.find('code').text("$('" +this.selector+ "')");
            }
            LABS.$form.find('input:text').val(this.cmd).trigger('focus');
            LABS.$form.find('span').text(function(i, txt) {
                return (i === 0) ? LABS.current_exercise + 1: LABS.exercises.length;
            });
            LABS.$form.find('select').val(LABS.current_exercise + 1);
        },

        render_codeview: function() {
            var contents = $(this.iframe).contents().find('body').html();

            contents = $.map(contents.split('\n'), function(str) {
                if (str.trim() === '') return null;
                return str
                    .replace('    ', '')
                    .replace(/[<>]/g,
                             function(m) { return { '<': '&lt;', '>': '&gt;' }[m]; });
            });

            this.code.innerHTML = contents.join('\n');
            prettyPrint();
        },

        equalize_heights: function() {
            var heightiest = 0;
            var $iframeDiv = $(this.iframe).closest('div');
            var $codeDiv = $(this.code).closest('div');
            $iframeDiv.add($codeDiv)
                .each(function() {
                    var height = $(this).height();
                    heightiest = height > heightiest ? height : heightiest;
                })
                .height(heightiest);
        },

        create_exercises: function() {
            $.each(arguments, function(i, obj) {
                (i !== 0) && LABS.exercises.push( new LABS.Exercise(obj) );
            });
            $.publish('exercises_created', LABS.exercises.length);
        },

        exec_cmd: function(cmd) {
            var selecting = LABS.whereami === 'selecting';

            var command = '';
            command += selecting ? '' : "$('" +this.selector+ "')";
            command += this.cmd_prefix || '';
            command += cmd;
            command += this.cmd_suffix || '';

            var save_iframe = true;

            // eval is evil!
            this.sandbox.eval('$(".selected").removeClass("selected")');
            try {
                this.sandbox.eval(command);
            } catch(e) {
                // Perhaps I should insert this into the DOM for better
                // visibility of errors.
                console.error( e );
                save_iframe = false;
            }

            if (save_iframe) {
                this.iframe_html = $(this.iframe).contents().find('body').html();
            }
            this.cmd = cmd;

            $.publish('command_executed');
        }

    };

    window.LABS.init();

}(jQuery,window));
