$(document).ready(function() {


  if ($('#games-show').length) {


    var _borderWidth = 8;
    var _taggerPosition = {};
    var _people = [
      'Bert',
      'Ernie',
      'Kermit',
      'Miss Piggie',
      'Big Bird',
      'Oscar',
      'Cookie',
      'Grover'
    ];

    // ----------------------------------------
    // Tagger Position
    // ----------------------------------------
    var _setTagPosition = function($tag, x, y) {
      var offset = $('#game').offset();
      var width = $('#game').width();
      var height = $('#game').height();

      y = y - offset.top;
      x = x - offset.left;

      var w = $tag.width() + _borderWidth * 2;
      var h = $tag.height() + _borderWidth * 2;

      y -= h / 2;
      x -= w / 2;

      y = (y < 0) ? 0 : y;
      x = (x < 0) ? 0 : x;

      var maxHeight = height - h;
      var maxWidth = width - w;

      y = (y > maxHeight) ? maxHeight : y;
      x = (x > maxWidth) ? maxWidth : x;

      $tag.css({
        "z-index": 100,
        "position": 'absolute',
        "top": y + 'px',
        "left": x + 'px'
      });
    };

    // ----------------------------------------
    // Add Tagger to Container
    // ----------------------------------------
    var _createTagger = function() {
      $('#game').prepend('<div id="tagger" class="tag"></div>');
      $('#tagger').css('border-width', _borderWidth + 'px');
    };

    // ----------------------------------------
    // Add Menu to Tagger
    // ----------------------------------------
    var _createTaggerMenu = function() {
      $('#tagger .menu').remove();
      var $ul = $('<ul class="menu"></ul>');

      _people.forEach(function(person, index) {
        var $a = $('<a></a>');
        $a.attr('href', '#');
        $a.attr('data-person-id', index);
        $a.text(person);
        var $li = $('<li></li>');
        $li.append($a);
        $ul.append($li);
      });

      $('#tagger').append($ul);

      _setMenuAnchorClickEvents();
    };

    // ----------------------------------------
    // Menu Anchor Click
    // ----------------------------------------
    var _setMenuAnchorClickEvents = function() {
      $('#tagger .menu a').click(function(e) {
        e.preventDefault();

        var $a = $(e.target);
        var $tag = $('<div class="tag"></div>');
        $tag.css('border-width', _borderWidth + 'px');
        var $p = $('<p>' + $a.text() + '</p>');
        $tag.append($p);
        $('#game').prepend($tag);
        _people.splice(~~$a.attr('data-person-id'), 1);
        _setTagPosition($tag, _taggerPosition.x, _taggerPosition.y);

        $('#tagger').removeClass('locked');


        return false;
      });
    };

    // ----------------------------------------
    // Show Hide Tagger
    // ----------------------------------------
    $('#game').hover(function(e) {
      $('#tagger').show();
    }, function(e) {
      if (!$('#tagger').hasClass('locked')) {
        $('#tagger').hide();
      }
    });

    // ----------------------------------------
    // Lock Tagger on Click
    // ----------------------------------------
    $('#game').on('click', function(e) {
      var $tag = $('#tagger');
      $tag.toggleClass('locked');
      if ($tag.hasClass('locked')) {
        _createTaggerMenu();
      }
    });

    // ----------------------------------------
    // Position Tagger on Mouse Move
    // ----------------------------------------
    $('#game img').mousemove(function(e) {
      _taggerPosition.x = e.pageX;
      _taggerPosition.y = e.pageY;
      if (!$('#tagger').hasClass('locked')) {
        _setTagPosition($('#tagger'), e.pageX, e.pageY);
      }
    });

    // ----------------------------------------
    // Init Tagger
    // ----------------------------------------
    _createTagger();


  }

});







