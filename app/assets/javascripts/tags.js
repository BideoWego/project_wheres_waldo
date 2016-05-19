"use strict";


var APP = APP || {};


APP.Tag = (function($) {

  var Tag = function() {};


  Tag.all = function(params) {
    return $.ajax({
      url: '/tags',
      data: {
        tag: params
      },
      dataType: 'json'
    });
  };


  return Tag;

})($);




