"use strict";


var APP = APP || {};


APP.HighScore = (function($) {

  var HighScore = function() {};


  HighScore.create = function(params) {
    if ($('#game').length) {
      return $.ajax({
        url: '/high_scores',
        dataType: 'json',
        data: params,
        method: 'POST'
      });
    }
  };


  return HighScore;

})($);




