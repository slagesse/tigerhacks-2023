window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('login-button').addEventListener('click',function(){
        logIn();
     });
});



function logIn()
{
    var data = new URLSearchParams();
    data.set('user', document.getElementById("username").value);
    data.set('pass', document.getElementById("password").value);
    data.set('type', "Consumer");

    // send to the endpoint
    fetch("https://tigerhacks-2023-e68b21283bcc.herokuapp.com/login", {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data
    }).then(async function(response) {
        const data = await response.json();
        if (data == "{error:\"e\"}")
        {
            document.getElementById("error-message").style.display = "block";
            document.getElementById("main").style.height = "340px";
        }
        else {
            sessionStorage.setItem("user", data.username);
            sessionStorage.setItem("userID", data.id);
            window.location.href = "/review.html";
        }
    });
}