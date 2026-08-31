
const obj = document.getElementById("a");
let objStyle = getComputedStyle(obj);
let body = getComputedStyle(document.body);

const mainClass = document.querySelectorAll(".circle");

function opacityToHex(opacity) {
  const int = Math.round(opacity * 255);
  return int.toString(16).padStart(2, '0');
}
//# __ LIVELY CONFIG __
let pall = ["#4deaff", "#ff4dca", "#9cecf7", "#ff9fe2"];
let single = "#271010"
let colorMode = 0; let opacity = 1;
colorConfig();
function livelyPropertyListener(name, value) {
    switch (name) {

        case"darkMode":
            if (value) { body.style.background = "black"; } else { body.style.background = "white"; }
            break;
        case"shape": 
            shapeConfig(value);
            break;
        case"colorMode":
            colorMode = value; colorConfig();
            break;
        case"opacity":
            opacity = value; colorConfig();
            break;
        case"singleColor":
            single = value; colorConfig();
            break;
        case"palette1":
            pall[0] = value; colorConfig(); break; 
        case"palette2":
            pall[1] = value; colorConfig(); break; 
        case"palette3":
            pall[2] = value; colorConfig(); break; 
        case"palette4":
            pall[3] = value; colorConfig(); break; 
    }
}

function colorConfig() {
    let i = 0;
    mainClass.forEach(el => {
        i++;
        switch(colorMode){
            case 1:  //! _ Palette
                el.style.opacity = `${opacity}`;
                el.style.background = `${pall[i-1]}`;
                break;
            case 0: //! _ Single
                const finalOpacity = Math.max(opacity - (1 - (i * 0.25)), 0);
                el.style.opacity = `${finalOpacity}`;
                el.style.background = `${single}`;
                break;
            default: break;
        }
    })
}

function blendConfig (mode) {
    mainClass.forEach(el => {
        switch(mode) {
            case 0: //! Normal
                el.style.mixBlendMode = "normal"; break;
            case 1: //! Multiply
                el.style.mixBlendMode = "multiply"; break;
            case 2: //! Screen
                el.style.mixBlendMode = "screen"; break;
            case 3: //! Overlay
                el.style.mixBlendMode = "overlay"; break;
            case 4: //! Darken
                el.style.mixBlendMode = "darken"; break;
            case 5: //! Lighten
                el.style.mixBlendMode = "lighten"; break;
            case 6: //! Color-Dodge
                el.style.mixBlendMode = "color-dodge"; break;
            case 7: //! Color-Burn
                el.style.mixBlendMode = "color-burn"; break;
            case 8: //! Hard-Light
                el.style.mixBlendMode = "hard-light"; break;
            case 9: //! Soft-Light
                el.style.mixBlendMode = "soft-light"; break;
            case 10: //! Difference
                el.style.mixBlendMode = "difference"; break;
            case 11: //! Exclusion
                el.style.mixBlendMode = "exclusion"; break;
        }
    })
}

function shapeConfig (shape) {
    mainClass.forEach(el => {

        switch(shape){
            case 0:
                el.style.borderRadius = "50%"; break;
            case 1:
                el.style.borderRadius = "10%"; break;
            case 2:
                el.style.borderRadius = "0%"; break;
            default: break;
        }
    })
}

let screenHeight = body.height;
let screenWidth = body.width;

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
        let baseUnit = parseFloat(body.getPropertyValue('--baseUnit'));

        // let centerY = parseFloat(circle.height);
        // let centerX = parseFloat(circle.width);

        setTimeout(() => { 
            let layerDeg = (0.7 ** layer); if (layerDeg > 1) {layerDeg = 1;}
            let newPosY = bodyCenterY + ((mousePosY - bodyCenterY) * layerDeg);
            let newPosX = bodyCenterX + ((mousePosX - bodyCenterX) * layerDeg);
            el.style.top = `${newPosY}px`;
            el.style.left = `${newPosX}px`;
        }, (layer * 40))
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
            if (elapsedStop >= 300) {
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
