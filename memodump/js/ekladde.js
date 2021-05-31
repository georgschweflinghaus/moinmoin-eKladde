/*
 * Copyright 2021.
 * Licensed under GPL.
 */

if (typeof jQuery === 'undefined') { throw new Error('jQuery is required') }

  /* Re-style the standard MoinMoin Page Edit Save button */
+function ($) {
  $('input[name=button_save]').removeClass('button').addClass('btn').addClass('btn-primary');
  $('input[name=button_cancel]').removeClass('button').addClass('btn').addClass('btn-outline-danger');
  $('input[name=button_preview]').removeClass('button').addClass('btn').addClass('btn-outline-secondary');
  $('input[name=button_spellcheck]').removeClass('button').addClass('btn').addClass('btn-outline-secondary');
  $('input[name=button_switch]').removeClass('button').addClass('btn').addClass('btn-outline-secondary');

}(jQuery);

// Re-sort the edit view
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

// Add functions to the formatting buttons in the edit view
+function ($) {
function typeInTextarea(el, newBeforeText, newAfterText) {
  console.log("typeInTextarea called!!");
  var start = el.prop("selectionStart");
  var end = el.prop("selectionEnd");
  var text = el.val();
  var before = text.substring(0, start);
  var after  = text.substring(end, text.length);
  var selected = text.substring(start, end);
  el.val(before + newBeforeText + selected + newAfterText + after);
  el.prop("selectionStart", end);
  el.prop("selectionEnd", end);
  return false
}
  $("#h1_button").on("click", function() {
    typeInTextarea($("#editor-textarea"), "= ", " =");
  $("#editor-textarea").focus();
  return false
  })

  $("#h2_button").on("click", function() {
    typeInTextarea($("#editor-textarea"), "== ", " ==");
  $("#editor-textarea").focus();
  return false
  })

  $("#h3_button").on("click", function() {
    typeInTextarea($("#editor-textarea"), "=== ", " ===");
  $("#editor-textarea").focus();
  return false
  })

  $("#code_button").on("click", function() {
    typeInTextarea($("#editor-textarea"), "\n{{{#!highlight python,js,html,bash\n", "\n}}}\n");
  $("#editor-textarea").focus();
  return false
  })

  $("#link_button").on("click", function() {
    typeInTextarea($("#editor-textarea"), "[[", "]]");
  $("#editor-textarea").focus();
  return false
  })

// <<TableOfContents()>>
//  __underline__
//  '''bold'''
//  ''italic''
//
//  ^super^script
//
//  ,,sub,,script
//
//  ~-smaller-~
//
//  ~+larger+~
//
//  --(stroke)--
//
//  {{{#!wiki caution
//  '''Don't overuse admonitions'''
//
//  Admonitions should be used with care. A page riddled with admonitions will look restless and will be harder to follow than a page where admonitions are used sparingly.
//  }}}

}(jQuery);
