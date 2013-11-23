define(['underscore', 'backbone'], function(_, Backbone) {
  var Items = Backbone.Collection.extend({
    search: function (term) {
      if (term === "") {
        return this;
      }

      var pattern = new RegExp(term, "gi");
      return _(this.filter(function (item) {
        return pattern.test(item.get("title"));
      }));
    }
  });

  return Items;
});
