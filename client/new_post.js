Template.new_post.rendered = function(){
  Session.set("bgColor", document.getElementById("bColor").value);
  Session.set("fontColor", document.getElementById("fColor").value);
  $('.resizable').resizable({
    maxHeight: 1000,
    maxWidth: 1000,
    minHeight: 50,
    minWidth: 50
  });
},

Template.new_post.bgColor_set = function(){
      return Session.get("bgColor");
},

Template.new_post.fColor_set = function(){
      return Session.get("fontColor");
},
Template.new_post.author_set = function(){
      return Session.get("author");
},
Template.new_post.content_set = function(){
      return Session.get("content");
},
Template.new_post.has_author = function(){
      return !Session.equals("author", "Anonymous");
},

Template.new_post.events = {
  'change #bColor': function(){
    Session.set("bgColor", document.getElementById("bColor").value);
  },
  'change #fColor': function(){
    Session.set("fontColor", document.getElementById("fColor").value);
  },
  'change textarea[name=content]': function(){
    Session.set("content", $('textarea[name=content]').val());
  }, 
  'change textarea[name=author]': function(){
    $('textarea[name=author]').val() == "" ? Session.set("author", "Anonymous") : Session.set("author", $('textarea[name=author]').val())
  },

  'click button.submit': function(){
    author = $('textarea[name=author]').val();  
    content = $('textarea[name=content]').val();
    bgColor = document.getElementById("bColor").value;
    fontColor = document.getElementById("fColor").value;
    posTop = parseInt(document.getElementById("posTop").value,10);
    posLeft = parseInt(document.getElementById("posLeft").value,10);
    height = $('#preview').height();
    width = $('#preview').width();

    if ( author == ""){
      author = "Anonymous";
    };
    if(isNaN(posTop)|| isNaN(posLeft)){
      posTop = 50;
      posLeft = 50;
    }
    if ( content != "" ){
      Posts.insert ({author: author, content: content, bgColor: bgColor, fColor: fontColor, posTop: posTop, posLeft: posLeft, height: height, width: width, date: new Date});
      alert("Post created!");
      document.getElementById('home').click()
    }
    else{
      alert("Digite o conteúdo do post");
    }
  },
  'click button.cancel': function(){
    document.getElementById('home').click()
  }
}