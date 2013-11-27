define(
  ['jquery', 'underscore', 'backbone', 'text!templates/seekbar.html'],
  function($, _, Backbone, SeekbarTemplate) {
    var Seekbar = Backbone.View.extend({
      tagName: 'span',
      template: Handlebars.compile(SeekbarTemplate),
      slider: null,

      initialize: function() {
        _.bindAll(this, 'render', 'setDuration', 'setCurrentPos');
        this.model.on("change:duration",   this.setDuration);
        this.model.on("change:currentPos", this.setCurrentPos);
      },

      setDuration: function() {
        console.log('in setDuration');
        this.slider.attr('max', this.model.get('duration'));
      },

      setCurrentPos: function() {
        this.slider.attr('value', this.model.get('currentPos'));
      },

      render: function() {
        var content = this.template(this.model.toJSON());
        this.$el.html(content);
        this.slider = this.$('#slider');
        return this;
      }
    });

    return Seekbar;
  }
);
