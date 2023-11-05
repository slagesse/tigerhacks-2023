window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('username').innerHTML = sessionStorage.getItem("user");
    document.getElementById('review-button').addEventListener('click',function(){
        startReview();
     });
});

function startReview() {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        let url = tabs[0].url;
        sessionStorage.setItem("target-url", url);
    });
    window.location.href = "/form.html";
}