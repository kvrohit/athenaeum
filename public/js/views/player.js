define(
  ['jquery', 'underscore', 'backbone', 'text!templates/player.html'],
  function($, _, Backbone, PlayerTemplate) {
    var PlayerView = Backbone.View.extend({
      tagName: 'span',
      template: Handlebars.compile(PlayerTemplate),

      events: {
        "click #controlBtn": "playPause",
        "click #btnNext": "next",
        "click #btnPrevious": "previous"
      },

      initialize: function() {
        _.bindAll(this, 'render', 'updateControls', 'playPause', 'next', 'previous');
        this.model.on("change:state", this.updateControls);
      },

      updateControls: function() {
        console.log('in updateControls');

        if (this.model.get('state') === 'playing') {
          this.$('#controlBtn i').attr('class', 'icon-pause');
        } else {
          this.$('#controlBtn i').attr('class', 'icon-play');
        }

      },

      playPause: function() {
        if (this.model.get('state') === 'playing') {
          this.model.pause();
        } else if (this.model.get('state') === 'paused') {
          this.model.play();
        }
      },

      next: function() {
        this.model.next();
      },

      previous: function() {
        this.model.previous();
      },

      render: function() {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);
        return this;
      }
    });

    return PlayerView;
  }
);
