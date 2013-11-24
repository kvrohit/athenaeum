define(
  ['jquery', 'underscore', 'backbone', 'text!templates/albumdetail.html', 'models/track'],
  function($, _, Backbone, AlbumDetailTemplate, Track) {
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

        window.Player.stop();
        window.Player.src(trackUrl);

        window.playlist.add(new Track(this.model.trackAtIndex(trackIndex)), {merge: true});
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
