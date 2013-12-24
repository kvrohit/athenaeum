define(
  ['jquery', 'underscore', 'backbone', 'text!templates/playlisttrack.html'],
  function($, _, Backbone, TrackTemplate) {
    var TrackView = Backbone.View.extend({
      tagName: 'li',
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

        if (this.model.get("highlighted") === true) {
          this.$el.addClass('track-highlight');
        }
        return this;
      }
    });

    return TrackView;
  }
);
