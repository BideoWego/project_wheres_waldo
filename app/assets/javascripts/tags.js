"use strict";


var APP = APP || {};


APP.Tag = (function($) {

  var Tag = function() {};


  Tag.all = function(options) {
    if ($('#game').length) {
      return $.ajax({
        url: '/tags',
        data: {
          tag: {
            game_id: $('#game').data('id')
          }
        },
        dataType: 'json'
      });
    }
  };


  return Tag;

})($);




