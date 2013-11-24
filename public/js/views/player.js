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
        _.bindAll(this, 'render', 'updateControls', 'setDuration', 'setCurrentPos', 'playPause', 'next', 'previous');
        this.model.on("change:state", this.updateControls);
        this.model.on("change:duration", this.setDuration);
        this.model.on("change:currentPos", this.setCurrentPos);
      },

      updateControls: function() {
        console.log('in updateControls');

        if (this.model.get('state') === 'playing') {
          this.$('#controlBtn i').attr('class', 'icon-pause');
        } else {
          this.$('#controlBtn i').attr('class', 'icon-play');
        }

      },

      setDuration: function() {
        console.log('in setDuration');
        this.$('#slider').attr('max', this.model.get('duration'));
      },

      setCurrentPos: function() {
        this.$('#slider').attr('value', this.model.get('currentPos'));
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
