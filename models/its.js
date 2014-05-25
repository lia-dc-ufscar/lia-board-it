It = function(type){
	this.type = type;	//image or text
	this.posTop = 50;
	this.posLeft = 50;
	this.zIndex = 0;
};

Its = new Meteor.Collection("its");