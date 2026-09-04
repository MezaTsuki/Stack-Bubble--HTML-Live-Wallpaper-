
function opacityToHex(opacity) {
    opacity = Math.min(1, Math.max(0, opacity));
    const int = Math.round(opacity * 255);
    return int.toString(16).padStart(2, '0').toUpperCase();
}
function getFileType(path) {
    const ext = path.split('.').pop().toLowerCase();
    
    if (['mp4', 'webm', 'ogg'].includes(ext)) return 'video';
    if (['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif'].includes(ext)) return 'image';
    return 'unknown';
}

let isInit = true;
window.addEventListener('DOMContentLoaded', () => {
    mainClass = document.querySelectorAll(".circle");
    constructBubble(noOfBubbles);
    isInit = false;
});


//# __ LIVELY CONFIG __
let noOfBubbles = 4; //! NEW
let maxSize = 5.2; //! NEW
let minSize = 0.7; //! NEW

let pall = ["#000000", "#ffffff", "#9cecf7", "#ff9fe2"];
let color1 = "#4c4fffab"
let colorMode = 1; let fillMode = 0; let colorOpacity = 1; let shape = 0;
let blendMode = 0;
let backdropFilter = '';

let imageFit = 0;
let graphicBGToggle = false;
let graphicBG = 'background/75833.webm';
let graphicBGType = "image";

let borderWidth = 5;

function livelyPropertyListener(name, value) {
    switch (name) {

        case"numberOfBubbles":
            noOfBubbles = value;
            constructBubble(noOfBubbles);
            break;
        case"minSize":
            minSize = value;
            constructBubble(noOfBubbles);
            break;
        case"maxSize":
            maxSize = value;
            constructBubble(noOfBubbles);
            break;
        case"elasticity":
            elasticity = value;
            constructBubble(noOfBubbles);
            break;
        case"startingDeg":
            startingDeg = value;
            constructBubble(noOfBubbles);
            break;
        case"shape": 
            shape = value;
            shapeConfig();
            break;
        case"animation": 
            activeAnim = value;
            break;
        case"size": 
            sizeConfig(value);
            break;
        case"fillMode":
            fillMode = value; colorConfig();
            break;
        case"borderWidth":
            borderWidth = value; colorConfig();
            break;
        case"colorMode":
            colorMode = value; colorConfig();
            break;
        case"colorOpacity":
            colorOpacity = value; colorConfig();
            break;
        case"color1":
            color1 = value; colorConfig();
            break;
        case"palette1":
            pall[0] = value; colorConfig(); break; 
        case"palette2":
            pall[1] = value; colorConfig(); break; 
        case"palette3":
            pall[2] = value; colorConfig(); break; 
        case"palette4":
            pall[3] = value; colorConfig(); break; 
        case"blendMode":
            blendMode = value;
            blendConfig();
            break;
        case"backdropFilter":
            backdropFilter = value;
            filterConfig();
            break;
        case"darkMode":
            if (value) { document.body.style.background = "black"; } 
            else { document.body.style.background = "white"; }
            break;
        case"graphicBGToggle":
            graphicBGToggle = value ? true : false;
            graphicBGConfig();
            break;
        case"graphicBG":
            graphicBGType = getFileType(value);
            graphicBG = value;
            graphicBGConfig();
            break;
        case"imageFit":
            imageFitConfig(value);
            break;
        case"imagePosition":
            bgImage.style.objectPosition = value.toLowerCase();
            bgVideo.style.objectPosition = value.toLowerCase();
            break;
        default: break;
    }
    if(isInit) return; 
}

function constructBubble(totalBubbles) {
    mainClass.forEach(el => el.remove());

    let index = 0;
    const sizeRange = maxSize - minSize;
    const layerStep = sizeRange / totalBubbles;
    do {
        index++;

        const currentLayer = minSize + (layerStep * (index - 1));

        const bubble = document.createElement('div');
        bubble.style.setProperty('--layer', currentLayer);
        bubble.style.zIndex = totalBubbles - index + 1;
        bubble.classList.add('circle');

        const objImage = document.createElement('img');
        objImage.classList.add('objImage');

        const objVideo = document.createElement('video');
        objVideo.classList.add('objVideo');
        objVideo.autoplay = true;
        objVideo.loop = true;

        bubble.appendChild(objImage);
        bubble.appendChild(objVideo);
        document.body.appendChild(bubble);

    } while (index < totalBubbles);
    mainClass = document.querySelectorAll(".circle");
    colorConfig();
    blendConfig();
    shapeConfig();
    filterConfig();
}

function filterConfig() {
    mainClass.forEach(el => {
        el.style.backdropFilter = `${backdropFilter}`;
    })
}

function graphicBGConfig() {
    if (!graphicBGToggle || !graphicBG) {
        bgImage.style.visibility = "hidden";
        bgVideo.style.visibility = "hidden";
        return;
    }

    if(graphicBGType == "image"){
        bgImage.src = graphicBG;
        bgVideo.src = "";
        bgImage.style.visibility = graphicBGToggle ? "visible" : "hidden";
        bgVideo.style.visibility = "hidden";
    }
    if(graphicBGType == "video"){
        bgImage.src = "";
        bgVideo.src = graphicBG;
        bgImage.style.visibility = "hidden";
        bgVideo.style.visibility = graphicBGToggle ? "visible" : "hidden";
    }
}

function imageFitConfig (mode) {
    switch(mode) {
        case 0: //! Contain
            bgImage.style.objectFit = "contain"; 
            bgVideo.style.objectFit = "contain"; break;
        case 1: //! Cover
            bgImage.style.objectFit = "cover"; 
            bgVideo.style.objectFit = "cover"; break;
        case 2: //! Fill
            bgImage.style.objectFit = "fill"; 
            bgVideo.style.objectFit = "fill"; break;
        case 3: //! Scale-Down
            bgImage.style.objectFit = "scale-down"; 
            bgVideo.style.objectFit = "scale-down"; break;
        case 4: //! None
            bgImage.style.objectFit = "none"; 
            bgVideo.style.objectFit = "none"; break;
    }
}

function colorConfig() {
    let objIndex = -1;
    let i = -1;
    const stepIncrease = (Math.floor(borderWidth / 10) * 2);
    const finalBWidth = borderWidth + (stepIncrease ** 1.5);
    document.body.style.setProperty('--borderThickness', `${finalBWidth}px`);
    
    mainClass.forEach(el => {
        i = (i + 1) % pall.length; 
        objIndex++;
        
        const opDecay = (1 / mainClass.length);
        const finalOpacity = Math.max(colorOpacity - (objIndex * opDecay), 0);

        switch(colorMode){
        case 1:  //! _ Palette
            switch(fillMode){
            case 0: //? __ Fill
                el.style.background = `${pall[i].substring(0, 7)}${opacityToHex(colorOpacity)}`;
                el.style.border = ``;
                break;
            case 1: //? __ Border
                el.style.background = `none`;
                el.style.border = `${finalBWidth}px solid ${pall[i].substring(0, 7)}${opacityToHex(colorOpacity)}`;
                break;
            default: break;
            }
        break;

        case 0: //! _ Fade
            switch(fillMode){
            case 0: //? __ Fill
                el.style.background = `${color1.substring(0, 7)}${opacityToHex(finalOpacity)}`;
                el.style.border = ``;
                break;
            case 1: //? __ Border
                el.style.background = `none`;
                el.style.border = `${finalBWidth}px solid ${color1.substring(0, 7)}${opacityToHex(finalOpacity)}`;
                break;
            default: break;
            }
        break;
        default: break;
        }
    })
}

function blendConfig () {
    mainClass.forEach(el => {
        switch(blendMode) {
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

function sizeConfig (size) {
    document.body.style.setProperty('--baseUnit', `${size}vw`);
}

function shapeConfig () {
    mainClass.forEach(el => {

        switch(shape){
            case 0:
                el.style.borderRadius = "50%"; break;
            case 1:
                el.style.borderRadius = "15px"; break;
            case 2:
                el.style.borderRadius = "0%"; break;
            default: break;
        }
    })
}