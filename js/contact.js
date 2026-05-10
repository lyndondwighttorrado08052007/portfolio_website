const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-msg");
const btn = document.getElementById("send-btn");

// Initialize EmailJS
emailjs.init("94-6_3NAxK2QuIaXXO2aR");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    btn.innerHTML = "Sending...";
    btn.disabled = true;

    emailjs.sendForm(
        "service_dwight",
        "template_dwight",
        this
    )
    .then(() => {

        successMsg.style.display = "block";
        form.reset();

        btn.innerHTML = "Send Message";
        btn.disabled = false;

        setTimeout(() => {
            successMsg.style.display = "none";
        }, 4000);

    })
    .catch((error) => {

        console.log("FAILED...", error);

        alert("Message failed to send. Please try again.");

        btn.innerHTML = "Send Message";
        btn.disabled = false;

    });
});