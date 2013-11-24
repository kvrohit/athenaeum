define(
  ['underscore', 'backbone'],
  function(_, Backbone) {
    Player = Backbone.Model.extend({
      player: undefined,
      timer: undefined,

      defaults: {
        "state": "stopped",
        "src": undefined,
        "duration": 0,
        "currentPos": 0
      },

      initialize: function() {
        this.player = new Audio();
        _.bindAll(this, 'play', 'playPause');
        this.on("change:src", this.play);
      },

      src: function(url) {
        var self = this;

        this.player.src = url;
        this.set({src: url});

        // get duration
        this.player.addEventListener('loadedmetadata', function() {
          self.set({duration: self.player.duration});
        });
      },

      play: function() {
        var self = this;
        this.player.play();

        // kick off timer
        this.timer = setInterval(function() { self.tick() }, 1000);
        this.set({state: "playing"});
      },

      pause: function() {
        this.player.pause();
        this.set({state: "paused"});
        clearInterval(this.timer);
      },

      stop: function() {
        this.player.src = undefined;
        this.set({state: "stopped"});
        this.set({currentPos: 0});
        this.set({duration: 0});

        clearInterval(this.timer);
      },

      tick: function() {
        this.set({currentPos: this.player.currentTime});

        if (this.player.ended) {
          this.stop();
        }
      }

    });

    return Player;
  }
);
