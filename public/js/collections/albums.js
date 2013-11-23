define(
  ['underscore', 'backbone', 'models/album', 'collections/items'],
  function(_, Backbone, Album, ItemsCollection) {
    var Albums = ItemsCollection.extend({
      url: '/albums',
      model: Album
    });

    return Albums;
  }
);
