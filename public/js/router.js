define(
  [
    'jquery',
    'underscore',
    'backbone',
    'collections/movies',
    'collections/tvshows',
    'collections/albums',
    'views/items',
    'views/albums',
    'models/album',
    'views/albumdetail',
    'views/player',
    'models/player',
    'views/seekbar'
  ],

  function($, _, Backbone, Movies, TVShows, Albums, ItemsView, AlbumsView, Album, AlbumDetail, PlayerView, Player, Seekbar) {
    var Router = Backbone.Router.extend({
      routes: {
        ""            : "index",
        "movies"      : "index",
        "tvshows"     : "tvshows",
        "albums"      : "albums",
        "albums/:id"  : "albums2"
      },

      initialize: function() {
        var that = this;

        this.$maincontent = $('#maincontent');
        this.$maincontent.empty();
        this.$search = $('#search');

        this.vent = _.extend({}, Backbone.Events);

        this.$search.on('keyup', function(e) {
          that.vent.trigger('search', $(this).val());
        });

        window.Player = new Player();

        var playerView = new PlayerView({ model: window.Player });
        var seekbar = new Seekbar({ model: window.Player });
        $('#seekbar').html(seekbar.render().el);
        $('#controls').html(playerView.render().el);
      },

      cleanUp: function() {
        this.$maincontent.empty();
        this.$search.val('');
        this.$search.focus();
      },

      index: function() {
        this.cleanUp();

        var movies = new Movies();
        var moviesView = new ItemsView({ collection: movies, vent: this.vent });
        movies.fetch();
      },

      tvshows: function() {
        this.cleanUp();

        var tvShows = new TVShows();
        var tvShowsView = new ItemsView({ collection: tvShows, vent: this.vent });
        tvShows.fetch();
      },

      albums: function() {
        this.cleanUp();

        var albums = new Albums();
        var albumsView = new AlbumsView({ collection: albums, vent: this.vent });
        albums.fetch();
      },

      albums2: function(id) {
        this.cleanUp();

        var album = new Album({id: id});
        var albumDetail = new AlbumDetail({ model: album });
        album.fetch({
          success: function () { $('#maincontent').html(albumDetail.render().el); }
        });
      }
    });

    return Router;
  }
);
