
const obj = document.getElementById("a");
let objStyle = getComputedStyle(obj);
let body = getComputedStyle(document.body);
let bgImage = document.querySelector(".bgImage");

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
            let layerDeg = (0.7 ** layer); if (layerDeg > 1) {layerDeg = 1;}
            let newPosY = bodyCenterY + ((mousePosY - bodyCenterY) * layerDeg);
            let newPosX = bodyCenterX + ((mousePosX - bodyCenterX) * layerDeg);
            el.style.top = `${newPosY}px`;
            el.style.left = `${newPosX}px`;
        }, (layer * 20))
    });

    //! for animation /\/\/\/\/
    locatorX = mouseX;
    locatorY = mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (play) return;
    play = setInterval(() => {

        if ((Math.abs(locatorX - mouseX) < 2) && (Math.abs(locatorY - mouseY) < 2)) {
            elapsedStop += 50;
            if (elapsedStop >= 500) {
                bounce(); clearInterval(play);
                play = null; elapsedStop = 0;
            }
        } else { elapsedStop = 0; }

    }, 50)
});

//# __ BOUNCE ANIMATION __
let ready = true;
function bounce() {

    if (!ready) return;
    let i = 0, lastLayer = 0; 

    mainClass.forEach(el => { 
        i++;
        let circle = getComputedStyle(el);
        let layer = parseFloat(circle.getPropertyValue('--layer') -1);
        let animDuration = (0.5 + (0.08 * layer));
        el.style.animation = `bounce ${animDuration}s ease-out`;
        el.style.animationDelay = `calc( 0.08s * ${layer})`;
        console.log("A");
        
        if (i == mainClass.length) {
            lastLayer = layer;
            ready = false;
        }
    })
    setTimeout(() => { mainClass.forEach(el => {
        el.style.animation = "none";
        ready = true;
    })}, (500 + (lastLayer * 161)) )
}
