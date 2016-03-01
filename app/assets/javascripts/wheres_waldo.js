"use strict";

$(document).ready(function() {

  var _game,
      _tags,
      _photoTagger,
      _photoTags;

  if ($('#games-show').length) {
    Character.all()
      .done(function(data) {
        _photoTagger = new PhotoTagger({
          container: $('#game'),
          menuItems: data
        });
      })
      .fail(function(xhr, status, error) {
        console.error(error);
      });
  }

});




