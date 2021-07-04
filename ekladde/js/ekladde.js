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

// Re-sort the edit view main parts
// Edit view has usualy the order:
// 1. Textedit
// 2. Editor Help
// 3. Preview
// but we need
// 1. Textedit
// 2. Preview
// 3. Editor Help
+function ($) {
  $('#preview').insertBefore('#editor-help');//TXT edito
  $('#previewbelow').insertBefore('#editor-help');//GUI editor
}(jQuery);


if (!document.getElementById("preview")) {
  $('<div id="preview">Press "Preview" button to see a preview.</div>').insertAfter( '#editor' );
}


+function ($) {
  $('#editor-textarea').insertBefore('input[name=button_save]');
}(jQuery);

// Add functions to the formatting buttons in the edit view
+function ($) {

  function findStartOfLine(text, start) {
    var line_start = 0;
    for (var i = start; i>0; i--) {
      if (text[i] == '\n') {
        return i+1;
      }
    }
    return line_start;
  }

  function findEndOfLine(text, end) {
    var line_end = text.length;
    for (var i = end; i<line_end; i++) {
      if (text[i] == '\n') {
        return i;
      }
    }
    return line_end;
  }

function typeInTextarea(el, newBeforeText, newAfterText) {
  console.log("typeInTextarea called!!");
  var start = el.prop("selectionStart");
  var end = el.prop("selectionEnd");
  var text = el.val();

  start = findStartOfLine(text, start);
  end = findEndOfLine(text, end)

  var before = text.substring(0, start);
  var after  = text.substring(end, text.length);
  var selected = text.substring(start, end);
  el.val(before + newBeforeText + selected + newAfterText + after);
  additional_chars = newBeforeText.length + newAfterText.length
  el.prop("selectionStart", end + additional_chars);
  el.prop("selectionEnd", end + additional_chars);
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

  $("#bold_button").on("click", function() {
    typeInTextarea($("#editor-textarea"), "'''", "'''");
  $("#editor-textarea").focus();
  return false
  })

  $("#italic_button").on("click", function() {
    typeInTextarea($("#editor-textarea"), "''", "''");
  $("#editor-textarea").focus();
  return false
  })

  $("#underline_button").on("click", function() {
    typeInTextarea($("#editor-textarea"), "__", "__");
  $("#editor-textarea").focus();
  return false
  })

  $("#table_button").on("click", function() {
    typeInTextarea($("#editor-textarea"), "|| Head || Head ||\n|| Row || Row ||", "");
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

  $("#toc_button").on("click", function() {
    typeInTextarea($("#editor-textarea"), "<<TableOfContents()>>", "");
  $("#editor-textarea").focus();
  return false
  })

  $("#childtree_button").on("click", function() {
    typeInTextarea($("#editor-textarea"), "<<Navitree(childtree,2)>>", "");
  $("#editor-textarea").focus();
  return false
  })

//
//  __underline__
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
