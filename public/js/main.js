
(function ($) {
    "use strict";
        let baseurl = "http://localhost:3000/";

    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    // $('.validate-form').on('submit',function(event){
      
    //     return;
    //    // return check;
    // });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).addClass('active');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).removeClass('active');
            showPass = 0;
        }
        
    });

    $('#login').on('click',function(){

        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        
        if($('#loginu').val()!=""&&$('#loginp').val()!="") {
            $.ajax({
                'url' : baseurl+'user/login/',
                'type' : 'POST',
                'data' : {
                    'mobile' : $('#loginu').val(),
                    'password':$('#loginp').val()
                },
                'success' : function(data) {              
                    if(data.error) {
                        alert("Error")
                    } else{
                        alert("login Successfull .Redirecting") ;
                        localStorage.setItem("token",data.token);
                        window.location="/dashboard.html";
                    }
                },
                'error' : function(request,error)
                {
                    alert("Request: "+JSON.stringify(request));
                }
            });

        }
    })


    $('#signup').on('click',function(){

        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        
        if($('#signupu').val()!=""&&$('#signupp').val()!="") {
            
            $.ajax({

                'url' : baseurl+'user',
                'type' : 'POST',
                'data' : {
                    'mobile' : $('#signupu').val(),
                    'password':$('#signupp').val()
                },
                'success' : function(data) {    
                    if(data.error) {
                        alert("User Exists");
                    }    else{
                        alert('Signup Successfull . You will be redirected');
                        window.location="/";

                    }       
                },
                'error' : function(request,error)
                {
                    alert("Request: "+JSON.stringify(request));
                }
            });

        }
    })


    $('#logout').on('click',function(){
        localStorage.clear();
        window.location.href="/";
    })

})(jQuery);