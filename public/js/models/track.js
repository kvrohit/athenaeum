define(
  ['underscore', 'backbone'],
  function(_, Backbone) {
    var Track = Backbone.Model.extend({
      defaults: {
        "highlighted": false
      }
    });

    return Track;
  }
);
