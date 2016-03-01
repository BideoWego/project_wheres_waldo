"use strict";


var APP = APP || {};


APP.Character = (function($) {

  var Character = function() {};


  Character.all = function() {
    return $.ajax({
      url: '/characters',
      dataType: 'json'
    });
  };


  return Character;

})($);

