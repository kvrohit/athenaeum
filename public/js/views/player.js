define(
  ['jquery', 'underscore', 'backbone', 'text!templates/player.html'],
  function($, _, Backbone, PlayerTemplate) {
    var PlayerView = Backbone.View.extend({
      tagName: 'span',
      template: Handlebars.compile(PlayerTemplate),
      ctrlBtn: null,

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
          this.ctrlBtn.removeClass('glyphicon-play');
          this.ctrlBtn.addClass('glyphicon-pause');
        } else {
          this.ctrlBtn.removeClass('glyphicon-pause');
          this.ctrlBtn.addClass('glyphicon-play');
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
        this.ctrlBtn = this.$('#controlBtn span');
        return this;
      }
    });

    return PlayerView;
  }
);
