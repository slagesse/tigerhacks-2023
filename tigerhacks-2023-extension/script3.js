window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('url').innerHTML = sessionStorage.getItem("target-url");
    document.getElementById('submit-button').addEventListener('click',function(){
        submitReview();
     });
});

function submitReview()
{
    var data = new URLSearchParams();
    data.set('user', sessionStorage.getItem("user"));
    data.set('url', sessionStorage.getItem("target-url"));
    data.set('q1', document.getElementById('q1').value);
    data.set('q2', document.getElementById('q2').value);
    data.set('q2', document.getElementById('q2').value);
    data.set('comment', document.getElementById('comment').value);


    // send to the endpoint
    fetch("https://tigerhacks-2023-e68b21283bcc.herokuapp.com/submit_review", {
        method: 'POST',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data
    }).then(async function(response) {
        window.close();
    });
}