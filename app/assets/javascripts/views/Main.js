MovieApp.Views.Main = Backbone.View.extend({
	el: '#container',
	template: JST['main'](),

	render : function() {
		this.$el.html(this.template);
	}

})