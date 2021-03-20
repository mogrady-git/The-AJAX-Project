// Select all required elements
const wrapper = document.querySelector("wrapper"),
    toast = document.querySelector(".toast"),
    wifiIcon = document.querySelector(".icon"),
    title = document.querySelector("span"),
    subTitle = document.querySelector("p"),
    closeIcon = document.querySelector(".close-icon");


// Internet detection status using AJAX GET request based on two values: 1) status and 2) onerror
window.onload = () => { // on window load
    toast.classList.add("checking");
    console.log("Checking Internet Connection....");
    title.innerText = "Please wait...";
    subTitle.innerText = "Checking internet connection...";
    wifiIcon.innerHTML = '<i class="uil uil-exclamation-triangle"></i>';

    function ajax() {
        let xhr = new XMLHttpRequest(); // creating new xml object
        xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true); //sending get request to this URL
        xhr.onload = (event) => { // Once AJAX loaded
            // console.log(xhr.response); getting response of that get request  
            // console.log(event); //chk response
            if (xhr.status == 200 && xhr.status < 300) {
                // if ajax status is equal to 200 or less than 300 that means user is getting data/response from that provided URL
                // or user is online so he/she is getting response or 200 status code
                // console.log("Online");
                toast.classList.remove("checking");
                toast.classList.add("online");
                title.innerText = "You're online now";
                subTitle.innerText = "Hurray! Internet is connected.";
                wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';
                console.log("Internet is connected....");

                closeIcon.onclick = () => {
                    toast.classList.add("hide");
                    console.log("Click!");
                }

                setTimeout(() => {
                    toast.classList.add("hide");
                    // console.log("Hiding Tost Notification....");
                }, 5000); //after 5 seconds, toast will be hidden automatically
            } else { // user is not online or may be getting some other error
                // toast.classList.add("offline");
                offline(); //calling offline function on both conditions
            }
        }
        xhr.onerror = (event) => { // if the passed URL is incorrect or returning 404 or other error
            // console.log(event); //chk response
            // console.log("Offline");
            // toast.classList.add("offline");
            offline(); //calling offline function on both conditions
        }
        xhr.send();
    }

    function offline() { //Creating offline function
        toast.classList.remove("hide"); //if the user goes offline, the toast will show again!
        toast.classList.remove("checking");
        toast.classList.remove("online");
        toast.classList.add("offline");
        title.innerText = "You're offline now";
        subTitle.innerText = "Oops! Internet is disconnected.";
        wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';
        console.log("You're offline now....");
    }

    // ajax();  Calling AJAX Function

    // Instead of running AJAX Call on page load, put AJAX call inside setInterval function and call at specific time period
    setInterval(() => {
        ajax();
    }, (8000)); //100ms [default] 8s set
}