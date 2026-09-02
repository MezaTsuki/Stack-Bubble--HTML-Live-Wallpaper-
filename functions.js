
const obj = document.getElementById("a");
let objStyle = getComputedStyle(obj);
let body = getComputedStyle(document.body);
let bgImage = document.querySelector(".bgImage");
let bgVideo = document.querySelector(".bgVideo");

const mainClass = document.querySelectorAll(".circle");

let fileHeight = bgImage.naturalHeight;
let fileWidth = bgImage.naturalWidth

let screenHeight = body.innerHeight;
let screenWidth = body.innerWidth;

//? Animation Mouse-Delay Detection
let mouseX; let locatorX = 1;
let mouseY; let locatorY = 1;

//# __ MOUSE MOVE __
let play = null; let elapsedStop = 0;
document.addEventListener("mousemove", e => {

    let bodyCenterY = parseFloat(body.height)/2;
    let bodyCenterX = parseFloat(body.width)/2;

    //! for position
    let mousePosX = e.clientX;
    let mousePosY = e.clientY;

    mainClass.forEach(el => { 
        
        let circle = getComputedStyle(el);
        let layer = parseFloat(circle.getPropertyValue('--layer')) - 1;

        // let centerY = parseFloat(circle.height);
        // let centerX = parseFloat(circle.width);

        setTimeout(() => { 
            let movementDeg = (0.7 ** layer); 
                if (movementDeg > 1) movementDeg = 1;
            let newPosY = bodyCenterY + ((mousePosY - bodyCenterY) * movementDeg);
            let newPosX = bodyCenterX + ((mousePosX - bodyCenterX) * movementDeg);
            el.style.top = `${newPosY}px`;
            el.style.left = `${newPosX}px`;
        }, (layer * 30))
    });

    //! for animation /\/\/\/\/
    locatorX = mouseX;
    locatorY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (play) return;
    play = setInterval(() => {
        console.log(Math.abs(locatorX - mouseX), Math.abs(locatorY - mouseY));
        if ((Math.abs(locatorX - mouseX) < 2) && (Math.abs(locatorY - mouseY) < 2)) {
            elapsedStop += 50;
            if (elapsedStop >= 600) {
                bounce(); clearInterval(play);
                play = null; elapsedStop = 0;
            }
        } else { elapsedStop = 0; }

    }, 50)
});

//# __ BOUNCE ANIMATION __
let animList = ["none", "bounce", "random-tilt", "focus", "retribution-vertical", "retribution-horizontal"];
let defaultAnimDuration = [ 0, 0.8, 1 , 1.8, 1.5, 1.5 ];
let animDelay = [ 0, 0.1, 0.1, 0.1, 0.03, 0.03 ];
let animCurve = [
    "cubic-bezier(0,0,0,0)",
    "ease-out",
    "cubic-bezier(.8,.03,.15,.93)",
    "cubic-bezier(.7,-0.07,.26,1.01)",
    "ease-in-out",
    "ease-in-out"
];
let activeAnim = 4;
let animCooldown = 500;
let ready = true;
function bounce() {
    if (!ready) return;
    let i = 0, lastLayer = 0; 

    mainClass.forEach(el => { 
        i++;
        let circle = getComputedStyle(el);
        let layer = parseFloat(circle.getPropertyValue('--layer') -1);
        let animDuration = (defaultAnimDuration[ activeAnim ]);
        
        el.style.animation = `${animList[ activeAnim ]} ${animDuration}s ${animCurve[ activeAnim ]}`;
        el.style.animationDelay = `calc( ${animDelay[ activeAnim ]}s * ${layer})`;
        
        if (i == mainClass.length) {
            lastLayer = layer;
            ready = false;
        }
    })
    let initialTimeout = (defaultAnimDuration[ activeAnim ] * 1000);
    let timeoutDelay = (lastLayer * (animDelay[ activeAnim ] * 1000));
    setTimeout(() => { mainClass.forEach(el => {
        el.style.animation = "none";
        ready = true;
    })}, (initialTimeout + timeoutDelay + animCooldown) )
}
