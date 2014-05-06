Template.post_list.posts = function(){
	return Posts.find({}, {sort: {date: -1}});
},

Template.post_info.events = {
	'click .btn-danger': function(){
	  Posts.remove(this._id);
	}
}