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
        var hl = this.model.get('highlighted');

        if (hl) {
          this.$el.addClass('track-highlight');
        } else {
          this.$el.removeClass('track-highlight');
        }
      },

      render: function() {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);

        var id = JSON.parse(window.localStorage.getItem('hl')).id;
        if (this.model.get('id') === id) {
          this.model.set({'highlighted': true});
        } else {
          this.model.set({'highlighted': false});
        }
        
        return this;
      }
    });

    return TrackView;
  }
);
