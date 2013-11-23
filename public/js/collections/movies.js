define(['underscore', 'backbone', 'models/movie', 'collections/items'], function(_, Backbone, Movie, ItemsCollection) {
  var Movies = ItemsCollection.extend({
    url: '/movies',
    model: Movie
  });

  return Movies;
});
