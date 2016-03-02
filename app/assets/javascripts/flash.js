"use strict";

var APP = APP || {};

APP.flash = function(type, message) {
  type = {
    error: 'danger',
    notice: 'info'
  }[type] || type;

  $('#flash').html('<div class="main-flash alert alert-' + type + ' style="border-radius: 0;">' +
    message +
  '</div>');
};




