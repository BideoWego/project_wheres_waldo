"use strict";

var APP = APP || {};


// ----------------------------------------
// PhotoTagPositionable
// ----------------------------------------

APP.PhotoTagPositionable = (function($) {


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


  var PhotoTagPositionable = function(options) {
    this.x = options['x'] || 0;
    this.y = options['y'] || 0;

    this.$element = options['element'];
    this.$container = options['container'];
    this.borderWidth = options['borderWidth'] || 8;

    this.$element.css({ "border-width": this.borderWidth + 'px' });
    this.$container.prepend(this.$element);

    _bindShowHideOnHoverTo(this);
  };


  // ----------------------------------------
  // Tag Positioning
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

  var PhotoTag = function(options) {
    options['element'] = $('<div class="tag"></div>');
    
    PhotoTagPositionable.call(this, options);

    for (var key in options['tag']) {
      this.$element.data(key, options['tag'][key]);
    }
  };

  PhotoTag.prototype = Object.create(PhotoTagPositionable.prototype);
  PhotoTag.prototype.constructor = PhotoTag;

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
  // Show Hide PhotoTagger on Hover
  // ----------------------------------------
  var _bindShowHideOnHoverTo = function(object) {
    object.$container.hover(function(e) {
      object.$element.show();
    }, function(e) {
      if (!object.$element.hasClass('locked')) {
        object.$element.hide();
      }
    });
  };


  // ----------------------------------------
  // Toggle PhotoTagger Lock on Click
  // ----------------------------------------
  var _bindClickTo = function(object) {
    object.$container.on('click', function(e) {
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
      $a.attr('href', '#');
      $a.attr('data-id', index);
      $a.text(menuItem.name);
      var $li = $('<li></li>');
      $li.append($a);
      $ul.append($li);
    });

    object.$element.append($ul);

    _setMenuAnchorClickEventsOn(object);
  };


  // ----------------------------------------
  // Menu Anchor Click
  // ----------------------------------------
  var _setMenuAnchorClickEventsOn = function(object) {
    object.$element.find('.menu a').click(function(e) {
      e.preventDefault();

      var $a = $(e.target);
      var tag = new PhotoTag({
        container: object.$container,
        tag: object.menuItems[~~$a.data('id')]
      });
      var $p = $('<p>' + $a.text() + '</p>');
      tag.$element.append($p);
      object.menuItems.splice(~~$a.attr('data-id'), 1);
      console.log(object);
      tag.moveTo(object.x, object.y);
      object.$element.removeClass('locked');

      return false;
    });
  };


  var PhotoTagger = function(options) {
    options['element'] = $('<div id="tagger" class="tag"></div>');

    PhotoTagPositionable.call(this, options);

    this.menuItems = options['menuItems'];

    _bindMouseMoveTo(this);
    _bindShowHideOnHoverTo(this);
    _bindClickTo(this);
  };

  PhotoTagger.prototype = Object.create(PhotoTagPositionable.prototype);
  PhotoTagger.prototype.constructor = PhotoTagger;

  PhotoTagger.prototype.update = function(e) {
    this.x = e.pageX;
    this.y = e.pageY;
    if (!this.$element.hasClass('locked')) {
      this.moveTo(e.pageX, e.pageY);
    }
  };

  return PhotoTagger;

})($, APP.PhotoTag, APP.PhotoTagPositionable);












