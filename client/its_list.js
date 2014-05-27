Template.its_list.its = function(){
	return Its.find({}, {sort: {date: -1}});
}
Template.it_info.isText = function(){
	return this.type == 'text';
}
Template.it_info.isImage = function(){
	return this.type == 'image';
}

Template.it_info.events = {
	'click .btn-danger': function(){
	  Its.remove(this._id);
	}
}