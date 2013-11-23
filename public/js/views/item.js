define(
  ['jquery', 'underscore', 'backbone', 'text!templates/item.html'],
  function($, _, Backbone, ItemTemplate) {
    var ItemView = Backbone.View.extend({
      className: 'mosaic-block',
      template: Handlebars.compile(ItemTemplate),

      render: function() {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);
        return this;
      }
    });

    return ItemView;
  }
);
