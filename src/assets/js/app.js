import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

require('./lib/jquery.countdown');

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

$(document).foundation();

$(document).ready(function() {
    $('.countdown').countdown("2019/07/13 17:00:00", function(event) {
        $(this).text(
            event.strftime('%D day%!D %-H hour%!H %-M minute%!M  %-S second%!S')
        );
    });

    $('#save-the-date-button').click(function() {
        $('#home').fadeOut(function() {
            $('#save-the-date').fadeIn();
        });
    });
});