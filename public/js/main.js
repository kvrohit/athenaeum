require.config({
  baseUrl: 'js/',
  paths: {
    jquery: 'libs/jquery/jquery.min',
    underscore: 'libs/underscore/lodash.min',
    backbone: 'libs/backbone/backbone-min',
    text: 'libs/require/text',
  }
});

require(
  ['jquery', 'underscore', 'backbone', 'router'],
  function($, _, Backbone, Router) {
    $(function() {
      var router = new Router();

      $('#routes a').on('click', function() {
        $('ul.nav li').removeClass('active');
        $(this).parent().toggleClass('active');
      });

      $('#routes a').on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        router.navigate(href, { trigger: true });
      });

      Backbone.history.start({ pushState: true });
    }
  );
});
