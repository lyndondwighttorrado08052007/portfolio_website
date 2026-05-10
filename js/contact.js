emailjs.init("EFmcax5qQpGZ2ypQI");

const form = document.getElementById("contact-form");
const successMsg = document.getElementById("success-msg");
const btn = document.getElementById("send-btn");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    btn.textContent = "Sending...";
    btn.disabled = true;

    emailjs.sendForm(
        "service_dwight",
        "template_dwight",
        this
    )
    .then(() => {

        successMsg.style.display = "block";
        form.reset();

        btn.textContent = "Send Message";
        btn.disabled = false;

    }, (error) => {

        console.log("FAILED...", error);

        alert("Failed to send message. Check EmailJS setup.");

        btn.textContent = "Send Message";
        btn.disabled = false;
    });
});