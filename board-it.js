if (Meteor.isClient) {
  Meteor.startup(function(){
    Session.set("current_page","board");
  }),

  Template.page.is_home = function(){
    return Session.equals("current_page", "home");
  },
  Template.page.is_board = function(){
    return Session.equals("current_page", "board");
  },
  Template.page.is_new = function(){
    return Session.equals("current_page", "new_post");
  },
  Template.page.is_list = function(){
    return Session.equals("current_page", "list");
  },
  Template.page.is_teste = function(){
    return Session.equals("current_page", "teste");
  },

  Template.page.rendered = function(){
    $('footer').append('<div class="white postcolor"></div>');
    $('footer').append('<div class="yellow postcolor"></div>');
    $('footer').append('<div class="red postcolor"></div>');
    $('footer').append('<div class="green postcolor"></div>');
    $('footer').append('<div class="blue postcolor"></div>');
    $('footer').append('<div class="black postcolor"></div>');

    $('#trash').droppable({
      accept: ".post",
      drop: function(e){
        console.log(e.toElement.id);
        Its.remove(e.toElement.id);
      }
    });
    
    $('.postcolor').draggable({
      opacity: 0.7,
      helper: "clone",
      stop: function(e){
        newPost = new It("text");
        newPost.height = 200;
        newPost.width = 200;
        newPost.posTop = (e.pageY-100);
        newPost.posLeft =  (e.pageX-100);
        newPost.date = new Date;
        newPost.content = 'Type a message!';
        newPost.bgColor = $(this).css('background-color');
        newPost.fontColor = 'black';
        Its.insert(newPost);
        //$('#wrapper').append('<div style="box-shadow: 3px 3px 1px #222;height:200px; width:200px; top:'+(e.pageY-100)+'px;left:'+(e.pageX-100)+'px; position: absolute;background-color:'+$(this).css('background-color')+'"></div>');
      }
    })
  },

  Template.page.events = {
    'click a#home': function(){
      Session.set("current_page", "home");
      $('.active').removeClass('active');
    },
    'click a#board': function(){
      Session.set("current_page", "board");
    },
    'click a#new_post': function(){
      Session.set("current_page", "new_post");
    },
    'click a#list': function(){
      Session.set("current_page", "list");
    },
    'click a#teste': function(){
      Session.set("current_page", "teste");
    }
  }
}