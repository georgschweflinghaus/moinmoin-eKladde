/*
 * Copyright 2021.
 * Licensed under GPL.
 */

if (typeof jQuery === 'undefined') { throw new Error('jQuery is required for toggle.js!') }

+function ($) {
  /* Re-style the standard MoinMoin Page Edit Save button */
  $('input[name=button_save]').removeClass('button').addClass('btn').addClass('btn-primary');
}(jQuery);
