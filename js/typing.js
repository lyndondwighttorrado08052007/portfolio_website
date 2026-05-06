const roles = [
    "UI Designer. . .",
    "Frontend Developer. . .",
    "ACT Student. . .",
    "Creative Coder. . ."
];

const typingText = document.getElementById("typing-text");

let roleIndex = 0;
let charIndex = 0;

let isDeleting = false;


function typeEffect(){

    const currentRole = roles[roleIndex];

    if(!isDeleting){

        typingText.textContent =
            currentRole.substring(0, charIndex);

        charIndex++;

        if(charIndex > currentRole.length){

            isDeleting = true;

            setTimeout(typeEffect, 1200);

            return;

        }

    }

    else{

        typingText.textContent =
            currentRole.substring(0, charIndex);

        charIndex--;

        if(charIndex < 0){

            isDeleting = false;

            roleIndex++;

            if(roleIndex >= roles.length){
                roleIndex = 0;
            }

        }

    }

    setTimeout(
        typeEffect,
        isDeleting ? 60 : 120
    );

}


typeEffect();