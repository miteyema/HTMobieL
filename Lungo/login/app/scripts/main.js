var start, stop, nbButtons=100;

$$("#login-button").tap(function(){
    //TODO show loading

    /*TODO validation*/

    var url = "http://kulcapexpenseapp.appspot.com/resources/userService/login";
    var data = {
        email:$$("#username").val(),
        password:$$("#password").val()
    };

    var parseResponse = function(result){
        if(result != undefined && result != ""){
            $$("#username").parent().removeClass("red-border");
            $$("#password").parent().removeClass("red-border");
            Lungo.Router.section("list-section");
            start=new Date();
            for(var i=0;i<nbButtons;i++){
                var temp  = i+1;
                $$("#listview").append('<li class="arrow thumb"><a href="#"><img src="images/music_icon.jpg"><strong>'+temp+': Titel: Artist</strong></a></li>');
            }
            stop=new Date()-start;
            Lungo.Notification.html("Rendertime for list with size " + nbButtons + ": " +stop + " ms", "Close");
        }else{
            Lungo.Notification.error(
                "Error",
                "Login could not be found",
                "warning",
                0,
                null
            );
        }

    };

    var uname=$$("#username").val(),pwd=$$("#password").val();

    if(uname == "" || pwd == ""){
        var message = "<br>";
        if(uname == "" ){
            $$("#username").parent().addClass("red-border");
            message += "Username:  this field is required<br>";
        }
        if(pwd == ""){
            $$("#password").parent().addClass("red-border");
            message += "Password: this field is required";
        }
        Lungo.Notification.error(
            "Validation error",
            "Please complete the following errors:" + message,
            "warning",
            0,
            null
        );
    }else{
        Lungo.Service.post(url, data, parseResponse, "text");
    }



});