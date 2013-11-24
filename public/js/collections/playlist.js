define(
  ['underscore', 'backbone', 'models/track', 'collections/items'],
  function(_, Backbone, Track, ItemsCollection) {
    var Playlist = ItemsCollection.extend({
      url: '/tracks',
      model: Track
    });

    return Playlist;
  }
);
