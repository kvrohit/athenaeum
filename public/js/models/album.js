define(
  ['underscore', 'backbone', 'collections/tracks'],
  function(_, Backbone, Tracks) {
    var Album = Backbone.Model.extend({
      urlRoot: '/albums',

      initialize: function() {
        this.tracks = new Tracks();
        this.tracks.url = this.urlRoot + '/' + this.id + '/tracks';
      },

      trackAtIndex: function(index) {
        return this.tracks.at(index);
      }

    });

    return Album;
  }
);
