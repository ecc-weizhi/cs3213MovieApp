MovieApp.Views.MovieCreateView = Backbone.View.extend({
  //This view correspond to the detailed movie view (with review etc)
  el: '#pageBody',  

  initialize: function(){
 
  },

  render: function() {
    $(this.el).html("this is create");
    return this;
  }
})
