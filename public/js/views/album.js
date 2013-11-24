define(
  ['jquery', 'underscore', 'backbone', 'text!templates/albumview.html'],
  function($, _, Backbone, AlbumTemplate) {
    var AlbumView = Backbone.View.extend({
      className: 'mosaic-block alt-size',
      template: Handlebars.compile(AlbumTemplate),

      events: {
        "click a": "open"
      },

      open: function() {
        router = new Backbone.Router();
        router.navigate(this.model.url(), { trigger: true });
      },

      render: function() {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);
        return this;
      }
    });

    return AlbumView;
  }
);
