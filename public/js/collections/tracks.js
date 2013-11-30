define(
  ['underscore', 'backbone', 'models/track', 'collections/items'],
  function(_, Backbone, Track, ItemsCollection) {
    var Tracks = ItemsCollection.extend({
      model: Track
    });

    return Tracks;
  }
);
