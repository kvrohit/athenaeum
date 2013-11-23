define(['underscore', 'backbone', 'models/tvshow', 'collections/items'], function(_, Backbone, TVShow, ItemsCollection) {
  var TVShows = ItemsCollection.extend({
    url: '/tvshows',
    model: TVShow
  });

  return TVShows;
});
