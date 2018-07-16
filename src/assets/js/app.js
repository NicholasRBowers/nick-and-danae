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
    $('#countdown').countdown("2019/07/13", function(event) {
        $(this).text(
            event.strftime('%D day%!D %-H hour%!H %-M minute%!M  %-S second%!S')
        );
    });
});