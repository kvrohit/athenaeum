define(
  ['jquery', 'underscore', 'backbone', 'models/track', 'views/track'],
  function($, _, Backbone, Track, TrackView) {
    var PlaylistView = Backbone.View.extend({
      tagName: 'ul',
      className: 'dropdown-menu playlist',

      initialize: function() {
        _.bindAll(this, 'render');
        this.collection.bind('add', this.render);
      },

      render: function() {
        console.log(this.collection);
        var that = this;
        this.$el.html('');

        this.collection.forEach(function(track) {
          var tv = new TrackView({model: track});
          that.$el.append(tv.render().el);
        });

        return this;
      }
    });

    return PlaylistView;
  }
);
