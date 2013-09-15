MovieApp.Views.UserMovieView = Backbone.View.extend({
  el: "#pageBody",
  
  initialize : function(movieModel) {
    this.model = movieModel;
  },

  events: {
    "click .IndexNav": "go_index",
    "click .MyMoviesNav": "go_my_movie",
    "click .LogoutNav": "go_logout"
  },

  render : function() {
    var avg_score = new Number(this.model.get('avg_score'));
    var title = this.model.get('title');

    if(title.length > 30) 
      title = title.substr(0,30) + " ...";

    var movieRenderString = "<div><p><b style='font-size:large;'>" + title + "</b></p></div>";
    movieRenderString += "<div><p><b>Average Score</b>: " +  avg_score.toPrecision(4) + "&nbsp;&nbsp;" + 
      "<a href='javascript: void(0);'" + 
      "onclick=document.getElementById('hiddenVal').innerHTML='" +  this.model.get('id') + "'; " +
      "id='editMovie'><img width='18' height='18' " +
      "src='http://png-5.findicons.com/files/icons/2443/bunch_of_cool_bluish_icons/512/edit_notes.png'>" +
      "</img></a><a href='javascript: void(0);' " + 
      "onclick=document.getElementById('hiddenVal').innerHTML='" +  this.model.get('id') + "'; " + 
      "id='deleteMovie'><img src='http://www.pdfdu.com/images/del.png' width='18' height='18'></img>" +
      "</a></p></div>";
    movieRenderString += "<div><img src='" + this.model.get('img_url') + "'></img></div>";
		
    var myNavBarView = new MovieApp.Views.NavBarView();
    $(this.el).html(myNavBarView.render().el);
    
    $(this.el).append(movieRenderString);	

    return this;
  },

  go_index : function() {
    window.router.navigate("", {trigger: true});
  },
  
  go_my_movie : function() {
    window.router.navigate("myMovies", {trigger: true});
  },

  go_logout : function() {
    alert("c");
    window.router.navigate("", {trigger: true});
  }

});
