MovieApp.Views.MovieSimpleView = Backbone.View.extend({
  //This view correspond to the display of single movie
  //in the tiled movie list	
  
  initialize: function(myMovie){
    this.model = myMovie;
  },

  render: function() {
    $(this.el).html("<a href='#movie/"+this.model.id+"'><div class='MovieSimple' ><p><b>" + this.model.get("title") + '</b></p><br><img src="'+ this.model.get("img_url") +' width="200"></div></a>');
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
