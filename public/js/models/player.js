define(
  ['underscore', 'backbone', 'models/track', 'collections/playlist'],
  function(_, Backbone, Track, Playlist) {
    Player = Backbone.Model.extend({
      player: undefined,
      timer: undefined,

      defaults: {
        "state": "stopped",
        "src": undefined,
        "duration": 0,
        "currentPos": 0,
        "currentIndex": -1
      },

      initialize: function() {
        this.player   = new Audio();
        this.playlist = new Playlist();
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

      next: function() {
        var curIndex = this.get('currentIndex');
        curIndex += 1;

        if (curIndex === this.playlist.length) {
          return;
        }

        this.set({currentIndex: curIndex});
        this.src(this.playlist.at(curIndex).get('uri'));
      },

      previous: function() {
        var curIndex = this.get('currentIndex');

        if (curIndex === -1) {
          return;
        }

        curIndex -= 1;

        if (curIndex === -1) {
          return;
        }

        this.set({currentIndex: curIndex});
        this.src(this.playlist.at(curIndex).get('uri'));
      },

      tick: function() {
        this.set({currentPos: this.player.currentTime});

        if (this.player.ended) {
          this.stop();
          this.next();
        }
      },

      queueTrack: function(track) {
        this.playlist.add(track);

        if (this.get('currentIndex') === -1) {
          this.next();
        }
      }

    });

    return Player;
  }
);
