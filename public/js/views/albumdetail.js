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
        console.log(this.model);
        console.log(this.model.attributes[0].songs);
      },

      render: function() {
        var content = this.template(this.model.toJSON()[0]);
        this.$el.html(content);
        return this;
      }
    });

    return AlbumDetail;
  }
);
