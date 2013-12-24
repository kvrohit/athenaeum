define(
  ['jquery', 'underscore', 'backbone', 'text!templates/track.html'],
  function($, _, Backbone, TrackTemplate) {
    var TrackView = Backbone.View.extend({
      tagName: 'tr',
      template: Handlebars.compile(TrackTemplate),

      initialize: function() {
        _.bindAll(this, 'highlight');
        this.model.on('change:highlighted', this.highlight);
      },

      highlight: function() {
        var hl = this.model.get("highlighted");

        if (hl) {
          this.$el.addClass('track-highlight');
        } else {
          this.$el.removeClass('track-highlight');
        }
      },

      render: function() {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);

        // Highlight the current playing track
        if (this.model.get("highlighted") === true) {
          this.$el.addClass('track-highlight');
        }
        return this;
      }
    });

    return TrackView;
  }
);
