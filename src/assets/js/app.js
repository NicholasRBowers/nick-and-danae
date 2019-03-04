import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;
window.jQuery = $;
var oneShot = false;

require('./lib/jquery.countdown');
require('./lib/jquery.pjax');

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

$(document).foundation();

$(document).ready(function() {
    $(window).bind('load', function() {
        if (!oneShot && (window.location.href == 'https://www.nickanddanae.com/' || window.location.href == 'http://localhost:8000/')) {
            $('#home').fadeIn('slow');
            oneShot = true;
        }
    });

    $('.countdown').countdown("2019/07/13 17:00:00", function(event) {
        $(this).text(
            event.strftime('%D day%!D %-H hour%!H %-M minute%!M  %-S second%!S')
        );
    });

    if ($.support.pjax) {
        $(document).on('click', 'a', function(event) {
            var url = $(this).attr('href');
            event.preventDefault();
            $('.content').fadeOut().promise().done(function() {
                $.pjax({url: url, container: '.content', fragment: '.content'});
            });
        });
    }

    $(document).on('pjax:send', function() {
        console.log('STARTING');
    });
    $(document).on('pjax:complete', function() {
        console.log('COMPLETE');
        $('.content').fadeIn();
    });
    $(document).on('pjax:error', function(event) {
        console.log('ERROR');
    });
    $(document).on('pjax:click', function(event) {
        console.log('CLICKED');
    });
    $(document).on('pjax:timeout', function(event) {
        console.log('TIMEOUT');
    });
});