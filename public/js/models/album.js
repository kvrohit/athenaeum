define(
  ['underscore', 'backbone'],
  function(_, Backbone) {
    var Album = Backbone.Model.extend({
      urlRoot: '/albums'
    });

    return Album;
  }
);
