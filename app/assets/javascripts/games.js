"use strict";


var APP = APP || {};


APP.Game = (function($) {

  var Game = function() {};


  Game.find = function(params) {
    return $.ajax({
      url: '/games/' + params.id,
      dataType: 'json'
    });
  };


  return Game;

})($);




