Template.post_list.posts = function(){
	return Posts.find({}, {sort: {date: -1}});
},

Template.post_list.images = function(){
	return Images.find({}, {sort: {date: -1}});
}

Template.post_info.events = {
	'click .btn-danger': function(){
	  Posts.remove(this._id);
	}
}

Template.image_info.events = {
	'click .btn-danger': function(){
	  Images.remove(this._id);
	}
}