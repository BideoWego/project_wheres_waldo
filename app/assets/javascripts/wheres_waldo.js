"use strict";


var APP = APP || {};


APP.WheresWaldo = (function($) {

  var _photoTagger,
      _characters = [],
      _tags = [],
      _photoTags = [],
      _menuItems = [];

  // ----------------------------------------
  // Get Characters
  // ----------------------------------------
  var _getCharacters = function() {
    Character.all()
      .done(function(characters) {
        _characters = characters;
        _getTags();
      })
      .fail(function(xhr, status, error) {
        flash('error', 'Characters: ' + error);
        console.error(error);
      });
  };


  // ----------------------------------------
  // Get Tags
  // ----------------------------------------
  var _getTags = function() {
    Tag.all()
      .done(function(tags) {
        _tags = tags;
        _menuItems = [];
        _createMenuItems();
        _createPhotoTags();

      })
      .fail(function(xhr, status, error) {
        flash('error', 'Tags: ' + error);
        console.log(error);
      });
  };


  // ----------------------------------------
  // Create Tagger Menu Items
  // ----------------------------------------
  var _createMenuItems = function() {
    var taggedCharacterIds = _tags.map(function(tag) {
      return tag.character_id;
    });

    for (var i = 0; i < _characters.length; i++) {
      var character = _characters[i];

      for (var j = 0; j < _tags.length; j++) {
        var tag = _tags[j];
        if (tag.character_id == character.id) {
          tag.character = character;
        }
      }

      if (!(taggedCharacterIds.indexOf(character.id) > -1)) {
        _menuItems.push(character);
      }
    }
  };


  // ----------------------------------------
  // Create Photo Tags
  // ----------------------------------------
  var _createPhotoTags = function() {
    var $container = $('#game');

    if (_menuItems.length) {
      _photoTagger = new PhotoTagger({
        container: $container,
        menuItems: _menuItems
      });
    }

    for (var i = 0; i < _tags.length; i++) {
      var photoTag = new PhotoTag({
        container: $container,
        tag: _tags[i]
      });
      _photoTags.push(photoTag);
    }

    if (!($('#game:hover').length)) {
      $('.tag').hide();
    }
  };


  // ----------------------------------------
  // Initialize
  // ----------------------------------------
  var WheresWaldo = {};

  WheresWaldo.init = function() {
    $('#tagger').remove();
    $('.tag').remove();
    _getCharacters();
  };


  return WheresWaldo;

})($, APP.Character, APP.Tag, APP.PhotoTagger, APP.PhotoTag);


// ----------------------------------------
// Run the Game
// ----------------------------------------

$(document).ready(function() {

  if ($('#games-show').length) {
    WheresWaldo.init();
  }

});







