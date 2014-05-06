Meteor.startup(function(){
  if (Posts.find().count() === 0){
    Posts.insert ({author: "Me", content: "First!", bgColor: "blue", fColor: "white", size: "3x3", posTop: 5, posLeft: 5, date: new Date});
  }
});
Meteor.methods({
  clear_canvas: function(){
    Drawsteps.remove({});
    Meteor.publish('clear_canvas');
    globalStream.emit('clear', {});
  }
})