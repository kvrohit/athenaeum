define(
  ['jquery', 'underscore', 'backbone', 'views/album', 'views/items'],
  function($, _, Backbone, AlbumView, ItemsView) {
    var AlbumsView = ItemsView.extend({

      renderItems: function(items) {
        items.forEach(function(model) {
          var albumView = new AlbumView({ model: model });
          $('#maincontent').append(albumView.render().el);
        });

        return this;
      }

    });

    return AlbumsView;
  }
);
