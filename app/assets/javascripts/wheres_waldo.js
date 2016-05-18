"use strict";


var APP = APP || {};


APP.WheresWaldo = (function($) {

  var _photoTagger,
      _characters = [],
      _tags = [],
      _photoTags = [],
      _menuItems = [],
      _time,
      _timerId,
      _game;

  // ----------------------------------------
  // Get Game
  // ----------------------------------------
  var _getGame = function() {
    if (!_game) {
      Game.current()
        .done(function(game) {
          _game = game;
          _getCharacters();
        })
        .fail(function(xhr, status, error) {
          flash('error', 'Game: ' + error);
          console.error(error);
        });
    } else {
      _getCharacters();
    }
  };


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
        _checkGameStatus();
      })
      .fail(function(xhr, status, error) {
        flash('error', 'Tags: ' + error);
        console.error(error);
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
  // Create High Score
  // ----------------------------------------
  var _createHighScore = function() {
    console.log('Creating HighScore...');
    HighScore.create({ high_score: { game_id: _game.id } })
      .done(function(response) {
        _game.high_score = response;
        _game.high_score_id = response.id;
        console.log(response);
        clearInterval(_timerId);
        _displayWin();
        _removeDeleteTagLinks();
      })
      .fail(function(xhr, status, error) {
        console.error(error);
        flash('error', 'HighScore: ' + error);
      });
  };


  // ----------------------------------------
  // Check Game Status
  // ----------------------------------------
  var _checkGameStatus = function() {
    if (_isGameOver()) {
      console.log(_isGameOver());
      if (!_game.high_score_id) {
        _createHighScore();
      } else {
        _displayWin();
        _removeDeleteTagLinks();
      }
    } else if (!_timerId) {
      _startTimer(_game.time_remaining);
    }
  };


  // ----------------------------------------
  // Disable Delete Tag Links
  // ----------------------------------------
  var _removeDeleteTagLinks = function() {
    for (var i = 0; i < _photoTags.length; i++) {
      var photoTag = _photoTags[i];
      photoTag.removeDeleteLink();
    }
  };


  // ----------------------------------------
  // Display Win
  // ----------------------------------------
  var _displayWin = function() {
    flash('success', 'You won!');
    $('#time').text(_game.high_score.points);
  };


  // ----------------------------------------
  // Is Game Over?
  // ----------------------------------------
  var _isGameOver = function() {
    return (_tags.length === _characters.length);
  };


  // ----------------------------------------
  // Timer
  // ----------------------------------------
  var _startTimer = function(time) {
    _time = time;
    console.log(_game);
    if (!_game.ended_at) {
      _timerId = setInterval(function() {
        _time--;
        _time = _time > 0 ? _time : 0;
        $('#time').text(_time);
        if (_time === 0) {
          flash('error', 'Game Over!');
        }
      }, 1000);
    }
  };

  // ----------------------------------------
  // Initialize
  // ----------------------------------------
  var WheresWaldo = {};

  WheresWaldo.init = function() {
    $('#tagger').remove();
    $('.tag').remove();
    _getGame();
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







