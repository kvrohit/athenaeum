define(
  ['jquery', 'underscore', 'backbone', 'views/item'],
  function($, _, Backbone, ItemView) {
    var ItemsView = Backbone.View.extend({

      initialize: function(options) {
        _.bindAll(this, 'render', 'search');
        this.collection.bind('reset', this.render);
        options.vent.bind('search', this.search);
      },

      search: function(value) {
        $('#maincontent').empty();
        return this.renderItems(this.collection.search(value));
      },

      renderItems: function(items) {
        console.log(items);
        items.forEach(function(model) {
          var itemView = new ItemView({ model: model });
          $('#maincontent').append(itemView.render().el);
        });

        return this;
      },

      render: function() {
        return this.renderItems(this.collection);
      }
    });

    return ItemsView;
  }
);
