const checkbox = $(".onoffswitch-checkbox");
const tfa_box = $(".tfa-box"); 


checkbox.change(function(){
    if(this.checked){
        $.post("users/secret")
            .done(function(data){
                update(data);
            });
    }else{
        tfa_box.hide();
    }
});

function update(data){

        tfa_box.html(`
        <h3>SETTING UP GOOGLE AUTHENTICATOR (OR OTHER TOTP APP)</h3>
        <hr>
        <p class="color-red">IMPORTANT, READ BEFORE CONTINUING: Please make sure that you have an email set in your account settings. If you don't have one and you lose access to your 2FA app for any reason, you won't be able to get back into your account. (I'm Kidding it's just a test ;) </p>
        <img src="${data.data.secret_uri}" alt="">
        <p>Manual key entry: <b>${data.data.secret}</b></p>
        <p>To enable 2 Factor Authentication, scan the QR code above into your favourite authenticator app such as <b>Google Authenticator</b>  or <b>Authy</b> . Once done, enter the access token you get from the app into the text box below, it looks like <b>123456</b> .</p>

        <form action="">
            <label for="tfa-code"> <b>Your 2FA token from the app:</b> </label> <br>
            <input class="tfa-code-input" placeholder="e.g. 123446" type="text" name="tfa-code" id="tfa-code"> <br>
            <button class="btn-green" type="submit">Set Up 2FA</button> 
            <button class="btn-yellow" type="reset">Cancel</button>
        </form>
    `);

    tfa_box.show();
 
}