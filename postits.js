if (Meteor.isClient) {
  Meteor.startup(function(){
    Session.set("current_page","home");
  }),

  Template.page.is_list = function(){
    return Session.equals("current_page", "list");
  },
  Template.page.is_new = function(){
    return Session.equals("current_page", "new_post");
  },
  Template.page.is_home = function(){
    return Session.equals("current_page", "home");
  },
  Template.page.is_new_image = function(){
    return Session.equals("current_page", "new_img");
  },
  Template.page.is_new_hand_post = function(){
    return Session.equals("current_page", "new_hand_post");
  },
  Template.page.is_teste = function(){
    return Session.equals("current_page", "teste");
  },

  Template.page.events = {
    'click a#home': function(){
      Session.set("current_page", "home");
      console.log(Session.get("current_page"));
    },
    'click a#list': function(){

      Session.set("current_page", "list");
      console.log(Session.get("current_page"));
    },
    'click a#new_post': function(){

      Session.set("current_page", "new_post");
      console.log(Session.get("current_page"));
    },
    'click a#newImg': function(){
      Session.set("current_page", "new_img");
      console.log(Session.get("current_page"));
    },
    'click a#handPost': function(){
      Session.set("current_page", "new_hand_post");
      console.log(Session.get("current_page"));
    },
    'click a#teste': function(){
      Session.set("current_page", "teste");
      console.log(Session.get("current_page"));
    }
  }
}