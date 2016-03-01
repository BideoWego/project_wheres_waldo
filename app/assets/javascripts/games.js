"use strict";


var APP = APP || {};


APP.Game = (function($) {

  var Game = function() {};


  Game.current = function() {
    if ($('#game').length) {
      return $.ajax({
        url: '/games/' + $('#game').data('id'),
        dataType: 'json'
      });
    }
  };


  return Game;

})($);




