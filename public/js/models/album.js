define(
  ['underscore', 'backbone'],
  function(_, Backbone) {
    var Album = Backbone.Model.extend({
      urlRoot: '/albums',

      trackUrlAtIndex: function(index) {
        return this.get('tracks')[index].uri;
      },

      trackAtIndex: function(index) {
        return this.get('tracks')[index];
      }

    });

    return Album;
  }
);
