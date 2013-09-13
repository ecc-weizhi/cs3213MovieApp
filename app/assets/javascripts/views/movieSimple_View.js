MovieApp.Views.MovieSimpleView = Backbone.View.extend({
  //This view correspond to the display of single movie
  //in the tiled movie list	
  initialize: function(myMovie){
    this.model = myMovie;
  },

  render: function() {
    $(this.el).html("<div class='MovieSimple'><p>" + this.model.get("title") + "</p><img src='"+ this.model.get("img_url") +"'></div>");
    return this;
  },

  events: {
    //create an event "click on movieSimple class" will trigger function "show_movie_detail" 
    "click .MovieSimple": "show_movie_detail"
  },

  show_movie_detail: function() {
    window.router.navigate("movie/" + this.model.id, {trigger: true});
  }
})
