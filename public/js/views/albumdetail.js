define(
  ['jquery', 'underscore', 'backbone', 'text!templates/albumdetail.html'],
  function($, _, Backbone, AlbumDetailTemplate) {
    var AlbumDetail = Backbone.View.extend({
      // className: 'mosaic-block',
      template: Handlebars.compile(AlbumDetailTemplate),

      events: {
        "click a": "open",
        "click i": "open"
      },

      open: function(evt) {
        evt.preventDefault();
        var trackIndex = $(evt.srcElement).data('track-index');
        var trackUrl   = this.model.trackUrlAtIndex(trackIndex);
        console.log(trackUrl);

        window.player.src = undefined;
        window.player.src = trackUrl;
        clearInterval(window.timer);

        var $slider = $('#slider');
        $slider.attr('min', 0);

        window.player.addEventListener('loadedmetadata', function() {
          $slider.attr('max', window.player.duration);
          console.log(window.player.duration);

          window.timer = setInterval(function() {
            $slider.attr('value', window.player.currentTime);
          }, 1000);

          window.player.play();

          $('#controlBtn i').attr('class', 'icon-pause');
        });

      },

      render: function() {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);
        return this;
      }
    });

    return AlbumDetail;
  }
);
