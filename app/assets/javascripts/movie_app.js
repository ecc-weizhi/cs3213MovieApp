  window.MovieApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function(){
    var mainView = new MovieApp.Views.Main();
    mainView.render(); 

  }


}

$(document).ready(function(){
  MovieApp.initialize();
});

