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

  Template.page.events = {
    'click a#home': function(){
      Session.set("current_page", "home");
      $('.active').removeClass('active');
    },
    'click a#board': function(){
      Session.set("current_page", "board");
    },
    'click #new_post': function(){
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