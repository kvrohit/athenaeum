define(
  ['jquery', 'underscore', 'backbone', 'text!templates/playlisttrack.html'],
  function($, _, Backbone, TrackTemplate) {
    var TrackView = Backbone.View.extend({
      tagName: 'li',
      template: Handlebars.compile(TrackTemplate),

      render: function() {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);
        return this;
      }
    });

    return TrackView;
  }
);
