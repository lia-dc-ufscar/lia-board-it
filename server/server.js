Meteor.startup(function(){
  if (Posts.find().count() === 0){
    Posts.insert ({author: "Me", content: "First!", bgColor: "blue", fColor: "white", posTop: 100, posLeft: 100, height: "200px", width: "200px", date: new Date});
  }
});
Meteor.methods({
  clear_canvas: function(){
    Drawsteps.remove({});
    Meteor.publish('clear_canvas');
    globalStream.emit('clear', {});
  }
})