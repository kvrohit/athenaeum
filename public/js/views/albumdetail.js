define(
  ['jquery', 'underscore', 'backbone', 'text!templates/albumdetail.html', 'models/track', 'views/tracks'],
  function($, _, Backbone, AlbumDetailTemplate, Track, TracksView) {
    var AlbumDetail = Backbone.View.extend({
      // className: 'mosaic-block',
      template: Handlebars.compile(AlbumDetailTemplate),

      events: {
        "click a": "queueTrack",
        "click i": "queueTrack",
        "click #addAll": "queueAllTracks"
      },

      queueAllTracks: function(evt) {
        evt.preventDefault();
        this.model.tracks.forEach(function(track) {
          window.Player.queueTrack(track);
        });
      },

      queueTrack: function(evt) {
        evt.preventDefault();
        var trackIndex = $(evt.target).data('track-index');
        window.Player.queueTrack(this.model.trackAtIndex(trackIndex));
      },

      render: function() {
        var content = this.template(this.model.toJSON());
        var tracksView = new TracksView({ collection: this.model.tracks });
        this.$el.html(content);

        this.$('#tracklist').html(tracksView.render().el);
        this.model.tracks.fetch();

        return this;
      }
    });

    return AlbumDetail;
  }
);
