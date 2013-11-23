require.config({
  baseUrl: 'js/',
  paths: {
    jquery: 'libs/jquery/jquery.min',
    underscore: 'libs/underscore/lodash.min',
    backbone: 'libs/backbone/backbone-min',
    text: 'libs/require/text',
  }
});

require(['jquery', 'underscore', 'backbone', 'router'], function($, _, Backbone, Router) {
  $(function() {
    var router    = new Router();
    window.player = new Audio();
    window.timer  = null;

    $('ul.nav li a').on('click', function() {
      $('ul.nav li').removeClass('active');
      $(this).parent().toggleClass('active');
    });

    $('ul.nav li a').on('click', function(e) {
      e.preventDefault();
      var href = $(this).attr('href');
      router.navigate(href, { trigger: true });
    });

    $('#controlBtn').on('click', function(e) {
      e.preventDefault();
      $i = $('#controlBtn i');

      if (window.player.paused) {
        window.player.play();
        $i.attr('class', 'icon-pause');
      } else {
        window.player.pause();
        $i.attr('class', 'icon-play');
      }
    });

    Backbone.history.start({ pushState: true });
  });
});
