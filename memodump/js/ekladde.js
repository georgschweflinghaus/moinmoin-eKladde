/*
 * Copyright 2021.
 * Licensed under GPL.
 */

if (typeof jQuery === 'undefined') { throw new Error('jQuery is required') }

+function ($) {
  /* Re-style the standard MoinMoin Page Edit Save button */
  $('input[name=button_save]').removeClass('button').addClass('btn').addClass('btn-primary');
  $('input[name=button_cancel]').removeClass('button').addClass('btn').addClass('btn-outline-danger');
  $('input[name=button_preview]').removeClass('button').addClass('btn').addClass('btn-outline-secondary');
  $('input[name=button_spellcheck]').removeClass('button').addClass('btn').addClass('btn-outline-secondary');
  $('input[name=button_switch]').removeClass('button').addClass('btn').addClass('btn-outline-secondary');

}(jQuery);

// Edit view has usualy the order:
// 1. Textedit
// 2. Editor Help
// 3. Preview
// but we need
// 1. Textedit
// 2. Preview
// 3. Editor Help
+function ($) {
  $('#previewbelow').insertBefore('#editor-help');
}(jQuery);
