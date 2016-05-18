"use strict";

var APP = APP || {};


// ----------------------------------------
// PhotoTagPositionable
// ----------------------------------------

APP.PhotoTagPositionable = (function($) {

  // ----------------------------------------
  // Constructor
  // ----------------------------------------
  var PhotoTagPositionable = function(options) {
    this.x = options['x'] || 0;
    this.y = options['y'] || 0;

    this.$element = options['element'];
    this.$container = options['container'];
    this.borderWidth = options['borderWidth'] || 8;

    this.$element.css({ "border-width": this.borderWidth + 'px' });
    this.$container.prepend(this.$element);

    this.moveTo(this.x, this.y);
  };


  // ----------------------------------------
  // Move To
  // ----------------------------------------
  PhotoTagPositionable.prototype.moveTo = function(x, y) {
    var offset = this.$container.offset();
    var width = this.$container.width();
    var height = this.$container.height();

    y = y - offset.top;
    x = x - offset.left;

    var w = this.$element.width() + this.borderWidth * 2;
    var h = this.$element.height() + this.borderWidth * 2;

    y -= h / 2;
    x -= w / 2;

    y = (y < 0) ? 0 : y;
    x = (x < 0) ? 0 : x;

    var maxHeight = height - h;
    var maxWidth = width - w;

    y = (y > maxHeight) ? maxHeight : y;
    x = (x > maxWidth) ? maxWidth : x;

    this.$element.css({
      "z-index": 100,
      "position": 'absolute',
      "top": y + 'px',
      "left": x + 'px'
    });
  };


  return PhotoTagPositionable;

})($);




// ----------------------------------------
// PhotoTag
// ----------------------------------------

APP.PhotoTag = (function($, PhotoTagPositionable) {

  // ----------------------------------------
  // Show Hide PhotoTagger on Hover
  // ----------------------------------------
  var _bindShowHideOnHoverTo = function(object) {
    object.$container.hover(function(e) {
      object.$element.show();
    }, function(e) {
      object.$element.hide();
    });
  };


  // ----------------------------------------
  // Add a Delete Link to Photo Tag
  // ----------------------------------------
  var _addDeleteLinkTo = function(object, tag) {
    var $a = $('<a></a>');
    var params = $.param({
      tag: {
        game_id: tag.game_id
      }
    });
    $a.attr('href', '/tags/' + tag.id + '?' + params);
    $a.attr('class', 'delete-link');
    $a.attr('data-confirm', 'Are you sure?');
    $a.attr('data-remote', true);
    $a.attr('data-method', 'delete');
    $a.html('&times;');
    object.$element.append($a);
  };

  // ----------------------------------------
  // Add Characer Name to Photo Tag
  // ----------------------------------------
  var _addCharacterNameTo = function(object, tag) {
    object.$element.append($('<p>' + tag.character.name + '</p>'));
  };


  // ----------------------------------------
  // Constructor
  // ----------------------------------------
  var PhotoTag = function(options) {
    options['element'] = $('<div class="tag"></div>');

    var tag = options['tag'];

    for (var key in tag) {
      options[key] = tag[key];
    }

    PhotoTagPositionable.call(this, options);

    for (var key in tag) {
      this.$element.data(key, tag[key]);
    }

    _bindShowHideOnHoverTo(this);
    _addCharacterNameTo(this, tag);
    _addDeleteLinkTo(this, tag);
  };

  PhotoTag.prototype = Object.create(PhotoTagPositionable.prototype);
  PhotoTag.prototype.constructor = PhotoTag;


  PhotoTag.prototype.removeDeleteLink = function() {
    this.$element.find('.delete-link').remove();
  };

  return PhotoTag;

})($, APP.PhotoTagPositionable);





// ----------------------------------------
// PhotoTagger
// ----------------------------------------

APP.PhotoTagger = (function($, PhotoTag, PhotoTagPositionable) {


  // ----------------------------------------
  // Position Tagger on Mouse Move
  // ----------------------------------------
  var _bindMouseMoveTo = function(object) {
    object.$container
      .find('img')
      .bind('mousemove', $.proxy(object.update, object));
  };


  // ----------------------------------------
  // Toggle PhotoTagger Lock on Click
  // ----------------------------------------
  var _bindClickTo = function(object) {
    object.$container.on('click', function(e) {
      object.$element.toggle();
      object.$element.toggleClass('locked');
      if (object.$element.hasClass('locked')) {
        _addMenuTo(object);
      }
    });
  };


  // ----------------------------------------
  // Add Menu to PhotoTagger
  // ----------------------------------------
  var _addMenuTo = function(object) {
    object.$element.find('ul.menu').remove();
    var $ul = $('<ul class="menu"></ul>');

    object.menuItems.forEach(function(menuItem, index) {
      var $a = $('<a></a>');
      $a.attr('data-remote', true);
      $a.attr('data-method', 'post');

      var params = $.param({
        tag: {
          game_id: object.$container.data('id'),
          character_id: menuItem.id,
          x: object.x,
          y: object.y
        }
      });

      $a.attr('href', '/tags?' + params);
      $a.text(menuItem.name);
      var $li = $('<li></li>');
      $li.append($a);
      $ul.append($li);
    });

    object.$element.append($ul);
  };


  // ----------------------------------------
  // Constructor
  // ----------------------------------------
  var PhotoTagger = function(options) {
    options['element'] = $('<div id="tagger" class="tag"></div>');

    PhotoTagPositionable.call(this, options);

    this.$element.hide();

    this.menuItems = options['menuItems'];

    _bindMouseMoveTo(this);
    _bindClickTo(this);
  };

  PhotoTagger.prototype = Object.create(PhotoTagPositionable.prototype);
  PhotoTagger.prototype.constructor = PhotoTagger;


  // ----------------------------------------
  // Update
  // ----------------------------------------
  PhotoTagger.prototype.update = function(e) {
    this.x = e.pageX;
    this.y = e.pageY;
    if (!this.$element.hasClass('locked')) {
      this.moveTo(e.pageX, e.pageY);
    }
  };

  return PhotoTagger;

})($, APP.PhotoTag, APP.PhotoTagPositionable);












