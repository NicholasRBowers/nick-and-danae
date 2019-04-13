import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;
window.jQuery = $;
var oneShot = false;

require('./lib/jquery.countdown');
require('./lib/jquery.pjax');

import Foundation from 'foundation-sites';

$(document).foundation();

$(document).ready(function() {
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
    //console.log('STARTING');
  });
  $(document).on('pjax:complete', function() {
    //console.log('COMPLETE');
    $('.content').fadeIn();
  });
  $(document).on('pjax:error', function(event) {
    //console.log('ERROR');
  });
  $(document).on('pjax:click', function(event) {
    //console.log('CLICKED');
  });
  $(document).on('pjax:timeout', function(event) {
    //console.log('TIMEOUT');
  });

  $(document).trigger('pjax:end');
  $('#quantity').trigger('change');
});

$(window).on('load', function() {
  if (!oneShot && (window.location.href == 'https://www.nickanddanae.com/'
    || window.location.href == 'http://localhost:8000/')) {
      $('#home').fadeIn('slow');
      oneShot = true;
  }
});

$(document).on('pjax:end', function() {
  $('.countdown').countdown("2019/07/13 17:00:00", function(event) {
    $(this).text(
      event.strftime('%D day%!D %-H hour%!H %-M minute%!M  %-S second%!S')
    );
  });

  switch (window.location.search.substr(1)) {
    case 'success':
      $('#payment-success').removeClass('hidden');
      break;
    case 'error':
      $('#payment-error').removeClass('hidden');
      break;
  }

  var key = '';
  var busSku = '';
  var bunkSku = '';
  var basket = [];
  var qty = parseInt($('#quantity').val());

  if (window.location.hostname === 'localhost') {
    key = 'pk_test_YJ8UjQbbFbcZB3ewsz51ahnB';
    busSku = 'sku_EqOspbEI1cfKQd';
    bunkSku = 'sku_EqS8Dyuh3vpYCi';
  } else {
    key = 'pk_live_uWiEuQDHxQaCFnPMtzN6AY0L';
    busSku = 'sku_EqRcMhVhVh8FJt';
    bunkSku = 'sku_EqRdG79RHCrTsN';
  }

  var stripe = Stripe(key, { betas: ['checkout_beta_4'] });

  $('#bus-box, #bunk-box, #quantity').on('change keyup', function() {
    $('#checkout-button').off('click');
    $('#checkout-button').prop('disabled', true);

    qty = parseInt($('#quantity').val());
    var unitPrice = 0;
    basket = [];

    if (isNaN(qty) === false && qty > 0) {
      if ($('#bus-box').prop('checked')) { unitPrice += 40; basket.push({sku: busSku, quantity: qty});}
      if ($('#bunk-box').prop('checked')) { unitPrice += 85; basket.push({sku: bunkSku, quantity: qty});}

      $('#total-amount').html(qty * unitPrice);

      $('#checkout-button').click(function() {
        stripe.redirectToCheckout({
          items: basket,
          successUrl: window.location.origin + '/reserve.html?success',
          cancelUrl: window.location.origin + '/reserve.html?error',
        })
        .then(function (result) {
          if (result.error) {
            var displayError = document.getElementById('error-message');
            displayError.textContent = result.error.message;
          }
        });
      });
      $('#checkout-button').prop('disabled', false);
    }
  });
});