/*
 * Copyright 2021 Georg Schweflinghaus.
 * Licensed under GPL.
 */

if (typeof jQuery === 'undefined') { throw new Error('jQuery is required') }

/*
 * Re-style the standard MoinMoin Page Edit Save button
 */
+function ($) {
  $('input[name=button_save]').removeClass('button').addClass('btn').addClass('btn-primary');
  $('input[name=button_cancel]').removeClass('button').addClass('btn').addClass('btn-outline-danger');
  $('input[name=button_preview]').removeClass('button').addClass('btn').addClass('btn-outline-secondary');
  $('input[name=button_spellcheck]').removeClass('button').addClass('btn').addClass('btn-outline-secondary');
  $('input[name=button_switch]').removeClass('button').addClass('btn').addClass('btn-outline-secondary');

}(jQuery);

/*
 * Re-sort the edit view main parts
 *
 * Edit view has usualy the order:
 * 1. Textedit 2. Editor Help 3. Preview
 * but we need
 * 1. Textedit 2. Preview 3. Editor Help
 */
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


/*
 * Add functions to the formatting buttons in the edit view
 */
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

  /*
  * Apply before the selection the newBeforeText and after the selection the
  * newAfterText. Alternative if operate_on_whole_line is true apply this to
  * the whole line the selection is in.
  */
function applyToSelectedText(el, newBeforeText, newAfterText, operate_on_whole_line) {
  console.log("applyToSelectedText called!!");
  var start = el.prop("selectionStart");
  var end = el.prop("selectionEnd");
  var text = el.val();

  if(operate_on_whole_line) {
    start = findStartOfLine(text, start);
    end = findEndOfLine(text, end);
  }
  var before = text.substring(0, start);
  var after  = text.substring(end, text.length);
  var selected = text.substring(start, end);
  el.val(before + newBeforeText + selected + newAfterText + after);
  additional_chars = newBeforeText.length + newAfterText.length
  el.prop("selectionStart", end + additional_chars);
  el.prop("selectionEnd", end + additional_chars);
  return false
}

/*
* Apply the new text to enter before or after to each line of the selected lines
*/
function applyToSelectedLines(el, newBeforeText, newAfterText) {
  console.log("applyToSelectedLines called!!");
  var start = el.prop("selectionStart");
  var end = el.prop("selectionEnd");

  var current_line = start;
  var line_start = start;
  var line_end = start;
  var text = el.val();
  while(current_line < end) {
    console.log("INITIAL: line_start: "+line_start+" line_end: "+line_end);
    line_start = findStartOfLine(text, current_line);
    line_end = findEndOfLine(text, current_line);
    console.log("MIDDLE: line_start: "+line_start+" line_end: "+line_end);
    var before = text.substring(0, line_start);
    var after  = text.substring(line_end, text.length);
    var selected = text.substring(line_start, line_end);
    el.val(before + newBeforeText + selected + newAfterText + after);
    end = end + newBeforeText.length + newAfterText.length//move selection end
    text = el.val();
    current_line = line_end+newBeforeText.length+newAfterText.length+1
  }
  return false
}


  $("#h1_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "= ", " =", true );
  $("#editor-textarea").focus();
  return false
  })

  $("#h2_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "== ", " ==", true);
  $("#editor-textarea").focus();
  return false
  })

  $("#h3_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "=== ", " ===", true  );
  $("#editor-textarea").focus();
  return false
  })

  $("#bold_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "'''", "'''", false);
  $("#editor-textarea").focus();
  return false
  })

  $("#italic_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "''", "''", false);
  $("#editor-textarea").focus();
  return false
  })

  $("#underline_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "__", "__", false);
  $("#editor-textarea").focus();
  return false
  })

  $("#strikethrough_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "--", "--", false);
  $("#editor-textarea").focus();
  return false
  })

  $("#subscript_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), ",,", ",,", false);
  $("#editor-textarea").focus();
  return false
  })

  $("#superscript_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "^", "^", false);
  $("#editor-textarea").focus();
  return false
  })

  $("#table_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "|| Head || Head ||\n|| Row || Row ||", "", false);
  $("#editor-textarea").focus();
  return false
  })

  $("#code_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "\n{{{#!highlight python,js,html,bash\n", "\n}}}\n", false);
  $("#editor-textarea").focus();
  return false
  })

  $("#link_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "[[", "]]", false);
  $("#editor-textarea").focus();
  return false
  })

  $("#toc_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "<<TableOfContents()>>", "", false);
  $("#editor-textarea").focus();
  return false
  })

  $("#childtree_button").on("click", function() {
    applyToSelectedText($("#editor-textarea"), "<<Navitree(childtree,2)>>", "", false);
  $("#editor-textarea").focus();
  return false
  })

  $("#list_ul_button").on("click", function() {
    applyToSelectedLines($("#editor-textarea"), " * ", "");
  $("#editor-textarea").focus();
  return false
  })

  $("#list_ol_button").on("click", function() {
    applyToSelectedLines($("#editor-textarea"), " 1. ", "");
  $("#editor-textarea").focus();
  return false
  })
//
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
