var start,stop,nbButtons=100;$$("#login-button").tap(function(){var e="http://kulcapexpenseapp.appspot.com/resources/userService/login",t={email:$$("#username").val(),password:$$("#password").val()},n=function(e){if(void 0!=e&&""!=e){$$("#username").parent().removeClass("red-border"),$$("#password").parent().removeClass("red-border"),start=new Date;for(var t=0;nbButtons>t;t++){var n=t+1;$$("#listview").append('<li class="arrow thumb"><a href="#"><img src="images/music_icon.jpg"><strong>'+n+": Titel: Artist</strong></a></li>")}Lungo.Router.section("list-section"),stop=new Date-start,Lungo.Notification.html("Rendertime for list with size "+nbButtons+": "+stop+" ms","Close")}else Lungo.Notification.error("Error","Login could not be found","warning",0,null)},r=$$("#username").val(),i=$$("#password").val();if(""==r||""==i){var o="<br>";""==r&&($$("#username").parent().addClass("red-border"),o+="Username:  this field is required<br>"),""==i&&($$("#password").parent().addClass("red-border"),o+="Password: this field is required"),Lungo.Notification.error("Validation error","Please complete the following errors:"+o,"warning",0,null)}else Lungo.Service.post(e,t,n,"text")});