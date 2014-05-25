Meteor.startup(function(){
  if (Its.find().count() === 0){
    Its.insert ({content: "First post!", bgColor: "blue", fontColor: "white", posTop: 100, posLeft: 100, height: "200px", width: "200px", date: new Date});
  }
});
Meteor.methods({
  clear_canvas: function(){
    Drawsteps.remove({});
    Meteor.publish('clear_canvas');
    globalStream.emit('clear', {});
  }
})