
/**todo: Features to Add
 *      
 *      1. _
 *      2. Bubble Texture Setting
 */


const body = getComputedStyle(document.body);
const bgImage = document.querySelector(".bgImage");
const bgVideo = document.querySelector(".bgVideo");

let mainClass = document.querySelectorAll(".circle");

let fileHeight = bgImage.naturalHeight;
let fileWidth = bgImage.naturalWidth;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//? Animation Mouse-Delay Detection
let mouseX; let locatorX = 1;
let mouseY; let locatorY = 1;
let startingDeg = 0; 
let elasticity = 25;

let originX = 0.5; 
let originY = 0.5; 
let movementDelay = 30;

let panning = true;
let panningZoom = 0.1;

//# __ MOUSE MOVE __
let play = null; let elapsedStop = 0;
document.addEventListener("mousemove", e => {
    
    let screenHeight = parseFloat(body.height);
    let screenWidth = parseFloat(body.width);

    let bubbleOriginX = screenWidth * (1 - originX);
    let bubbleOriginY = screenHeight * (1 - originY);

    //! for position
    let mousePosX = e.clientX;
    let mousePosY = e.clientY;

    mainClass.forEach(el => { 
        
        let circle = getComputedStyle(el);
        let layer = parseFloat(circle.getPropertyValue('--layer')) - 1;

        // let centerY = parseFloat(circle.height);
        // let centerX = parseFloat(circle.width);

        setTimeout(() => { 
            const degAmount = startingDeg * mainClass.length;
            let movementDeg = (0.92 ** ((elasticity/(mainClass.length + degAmount)) * (layer + degAmount))); 
                if (movementDeg > 1) movementDeg = 1;
                
            let newPosX = bubbleOriginX + ((mousePosX - bubbleOriginX) * movementDeg);
            let newPosY = bubbleOriginY + ((mousePosY - bubbleOriginY) * movementDeg);
            el.style.left = `${newPosX}px`;
            el.style.top = `${newPosY}px`;
        }, (layer * movementDelay))
    });

    // setHoles(); 

    //! for animation --> <-- ^^^
    locatorX = mouseX;
    locatorY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!play) {
    play = setInterval(() => {
        console.log(Math.abs(locatorX - mouseX), Math.abs(locatorY - mouseY));
        if ((Math.abs(locatorX - mouseX) < 2) && (Math.abs(locatorY - mouseY) < 2)) {
            elapsedStop += 50;
            if (elapsedStop >= 600) {
                playAnimation(); clearInterval(play);
                play = null; elapsedStop = 0;
            }
        } else { elapsedStop = 0; }

    }, 50)}

    //! Background Panning Movement
    if (!panning || !graphicBGToggle) return;
    const mouseRatioX = (mousePosX / screenWidth) * 100;
    const mouseRatioY = (mousePosY / screenHeight) * 100;

    bgVideo.style.transformOrigin = `${mouseRatioX}% ${mouseRatioY}%`;
    bgImage.style.transformOrigin = `${mouseRatioX}% ${mouseRatioY}%`;
});

//# __ ANIMATION __
let animNames = ["none", "bounce", "random-tilt", "focus", "retribution-vertical", "retribution-horizontal"];
let defaultAnimDuration = [ 0, 0.8, 1.3 , 1.8, 1.5, 1.5 ];
let animDelay = [ 0, 0.1, 0.07, 0.1, 0.035, 0.035 ];
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

function playAnimation() {
    if (!ready) return;
    let i = 0, lastLayer = 0; 

    //? Animation Injector [each circle]
    mainClass.forEach(el => { 
        const decayResolution = 0.9 ** ((30/mainClass.length) * i);
        //! Decay Resolution: [From 1 approaching 0]
        //!     Reach below 5% at i=30, using 0.9
        //!     Reach below 5% at i=14, using 0.8
        const randomDeg = random(-360, 360);
        const degDecay = randomDeg * (1 - decayResolution);
        i++; 
        el.style.setProperty('--randomDeg', `${randomDeg - degDecay}deg`);

        let circle = getComputedStyle(el);
        let layer = parseFloat(circle.getPropertyValue('--layer') -1);
        let animDuration = defaultAnimDuration[ activeAnim ];
        
        el.style.animation = `
            ${animNames[ activeAnim ]} 
            ${animDuration}s 
            ${animCurve[ activeAnim ]}
            calc( ${animDelay[ activeAnim ]}s * ${layer} )
        `;
        
        if (i == mainClass.length) {
            lastLayer = layer;
            ready = false;
        }
    })
    //? Reset Animation [Cooldown]
    let initialTimeout = (defaultAnimDuration[ activeAnim ] * 1000);
    let timeoutDelay = (lastLayer * (animDelay[ activeAnim ] * 1000));
    setTimeout(() => { mainClass.forEach(el => {
        el.style.animation = "none";
        ready = true;
    })}, (initialTimeout + timeoutDelay + animCooldown) )
}
