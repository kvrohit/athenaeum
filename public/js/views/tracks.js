define(
  ['jquery', 'underscore', 'backbone', 'text!templates/tracks.html', 'views/track'],
  function($, _, Backbone, TracksTemplate, TrackView) {
    var TracksView = Backbone.View.extend({
      template: Handlebars.compile(TracksTemplate),

      initialize: function() {
        _.bindAll(this, 'render', 'l');
        // this.collection.bind('reset', this.render);
        this.collection.bind('reset', this.l);
      },

      l: function() {
        console.log('reset');
        var that = this;
        this.collection.forEach(function(track) {
          var tv = new TrackView({ model: track });
          that.$('#booya').append(tv.render().el);
        });
      },

      render: function() {
        var content = this.template();
        this.$el.html(content);
        return this;
      }

    });

    return TracksView;
  }
);
