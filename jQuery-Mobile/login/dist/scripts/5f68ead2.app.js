$("#login-button").click(function(){$("form").validate({rules:{username:{required:!0},password:{required:!0}},focusInvalid:!1,onkeyup:!1,onfocusout:!1,highlight:function(e){var t=$(e);t.parent().addClass("red-border")},unhighlight:function(e){var t=$(e);t.parent().removeClass("red-border")},errorPlacement:function(){},showErrors:function(e){var t="<ul>";$.each(e,function(e,i){t+="<li>"+e+" : "+i+"</li>"+"\n"}),t+="</ul>",$("#error-validation-items").html(t),this.defaultShowErrors()},invalidHandler:function(){$.mobile.changePage("#error-validation")},submitHandler:function(){$.mobile.loading("show",{text:"Logging in",textVisible:!0}),$.ajax({url:"http://kulcapexpenseapp.appspot.com/resources/userService/login",type:"POST",dataType:"text",data:{email:$("#username").val(),password:$("#password").val()},success:function(){$.mobile.navigate("#list-page")},complete:function(){$.mobile.loading("hide")}})}})});var start,stop,nbButtons=100;$("#list-page").on("pageinit",function(){start=new Date;for(var e=0;nbButtons>e;e++){var t=e+1;$("#list").append('<li><a href="#"><img src="images/music_icon.jpg" alt="Music">'+t+": Titel: Artist</li>").listview("refresh")}stop=new Date-start,alert("Rendertime for list with size "+nbButtons+": "+stop+" ms")});