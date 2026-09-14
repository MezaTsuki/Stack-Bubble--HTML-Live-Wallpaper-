
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
let noOfBubbles = 4; 
let maxSize = 5.2; 
let minSize = 0.7; 
let baseRotation = 45;
let rotationOffset = 0;
let shape = 0;

let posX = 0.5;
let posY = 0.5;

let pall = ["#2c1d1d", "#ffffff", "#9cecf7", "#ff9fe2"];
let color1 = "#4c4fffab"
let colorMode = 1; let fillMode = 0; let colorOpacity = 1; 
let blendMode = 0;
let backdropFilter = '';

let imageFit = 1;
let graphicBGToggle = true;
let graphicBG = 'background/75833.webm';
let graphicBGType = "video";

let textureFit = 1;
let graphicTextureToggle = false;
let graphicTexture = ["", "", "", "", ""];
let graphicTextureType = ["", "", "", ""];

let borderWidth = 5;

//! _________ WEB DEBUG _________
// graphicBGConfig(); imageFitConfig(imageFit); sizeConfig(3);
// bgZoomConfig();
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
            break;
        case"movementDelay":
            movementDelay = value;
            break;
        case"startingDeg":
            startingDeg = value;
            break;
        case"shape": 
            shape = value;
            shapeConfig();
            break;
        case"baseRotation": 
            baseRotation = value;
            baseRotationConfig();
            break;
        case"rotationOffset": 
            rotationOffset = value;
            baseRotationConfig();
            break;
        case"animation": 
            activeAnim = value;
            break;
        case"size": 
            sizeConfig(value);
            break;
        case"posX": 
            posX = value/100;
            positionConfig();
            break;
        case"posY": 
            posY = value/100;
            positionConfig();
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
            imageFit = value;
            imageFitConfig();
            break;
        case"backgroundPosition":
            bgPositionConfig(value);
            break;
        case "graphicTextureToggle":
            graphicTextureToggle = value ? true : false;
            graphicTextureConfig();
            break;
        case"textureFit":
            textureFit = value;
            textureFitConfig();
            break;
        case "graphicTexture1":
            graphicTextureType[0] = getFileType(value);
            graphicTexture[1] = value;
            graphicTextureConfig();
            break;
        case "graphicTexture2":
            graphicTextureType[1] = getFileType(value);
            graphicTexture[2] = value;
            graphicTextureConfig();
            break;
        case "graphicTexture3":
            graphicTextureType[2] = getFileType(value);
            graphicTexture[3] = value;
            graphicTextureConfig();
            break;
        case "graphicTexture4":
            graphicTextureType[3] = getFileType(value);
            graphicTexture[4] = value;
            graphicTextureConfig();
            break;
        case"panning":
            panning = value;
            bgZoomConfig();
            break;
        case"panningZoom":
            panningZoom = value;
            bgZoomConfig();
            break;
        default: break;
    }
    if(isInit) return; 
}

function positionConfig() {
    originX = allowXMovement ? posX : 0.5;
    originY = allowYMovement ? posY : 0.5;
}

function bgZoomConfig() {
    if (!panning || !graphicBGToggle) {
        bgImage.style.transform = ``;
        bgVideo.style.transform = ``;
        return;
    }
    bgImage.style.transform = `scale(${1 + panningZoom})`;
    bgVideo.style.transform = `scale(${1 + panningZoom})`;
}

function baseRotationConfig() {

    document.body.style.setProperty('--baseRotation', `${baseRotation}deg`);

    let i = 0;
    mainClass.forEach(el => {
        const offset = rotationOffset * i++;
        el.style.setProperty('--rotationOffset', `${offset}deg`);
    })
}

function constructBubble(totalBubbles) {
    mainClass.forEach(el => el.remove());

    let index = 0;
    const sizeRange = maxSize - minSize;
    const layerStep = sizeRange / totalBubbles;
    do {
        index++;

        const currentSize = minSize + (layerStep * (index - 1));

        const bubble = document.createElement('div');
        bubble.style.setProperty('--layer', index);
        bubble.style.setProperty('--size', currentSize);
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
    baseRotationConfig();
    shapeConfig();
    blendConfig();
    filterConfig();
    graphicTextureConfig();
    textureFitConfig();
}

function filterConfig() {
    mainClass.forEach(el => {
        el.style.backdropFilter = `${backdropFilter}`;
    })
}

function graphicTextureConfig() {
    let i = 0;
    if (!graphicTextureToggle) {
        mainClass.forEach(el => {
            const objImage = el.querySelector('.objImage');
            const objVideo = el.querySelector('.objVideo');

            objImage.src = "";
            objVideo.pause();
            objVideo.src = "";
            objVideo.load();

            objImage.style.visibility = "hidden";
            objVideo.style.visibility = "hidden";
        })
        return;
    }
    mainClass.forEach(el => {
        if (i == 4) i = 0;
        const objImage = el.querySelector('.objImage');
        const objVideo = el.querySelector('.objVideo');

        if (graphicTextureType[i] == "image") {
            objImage.src = graphicTexture[++i];
            objVideo.pause();
            objVideo.src = "";
            objVideo.load();

            objImage.style.visibility = "visible";
            objVideo.style.visibility = "hidden";
        }
        else if (graphicTextureType[i] == "video") {
            objImage.src = "";
            objVideo.src = graphicTexture[++i];
            objVideo.play().catch(()=>{});

            objImage.style.visibility = "hidden";
            objVideo.style.visibility = "visible";
        }
        else {
            i++;
            objImage.src = "";
            objVideo.pause();
            objVideo.src = "";
            objVideo.load();
            
            objImage.style.visibility = "hidden";
            objVideo.style.visibility = "hidden";
        }
    })
}

function textureFitConfig () {
    mainClass.forEach(el => {
            const objImage = el.querySelector('.objImage');
            const objVideo = el.querySelector('.objVideo');
            switch(textureFit) {
            case 0: //! Contain
                objImage.style.objectFit = "contain"; 
                objVideo.style.objectFit = "contain"; break;
            case 1: //! Cover
                objImage.style.objectFit = "cover"; 
                objVideo.style.objectFit = "cover"; break;
            case 2: //! Fill
                objImage.style.objectFit = "fill"; 
                objVideo.style.objectFit = "fill"; break;
            case 3: //! Scale-Down
                objImage.style.objectFit = "scale-down"; 
                objVideo.style.objectFit = "scale-down"; break;
            case 4: //! None
                objImage.style.objectFit = "none"; 
                objVideo.style.objectFit = "none"; break;
        }
    })
    
}

function graphicBGConfig() {
    if (!graphicBGToggle || !graphicBG) {
        bgImage.style.visibility = "hidden";
        bgImage.src = "";
        bgVideo.style.visibility = "hidden";
        bgVideo.pause();
        bgVideo.src = "";
        bgVideo.load();
        return;
    }

    if(graphicBGType == "image"){
        bgImage.src = graphicBG;
        bgVideo.pause();
        bgVideo.src = "";
        bgVideo.load();
        bgImage.style.visibility = "visible";
        bgVideo.style.visibility = "hidden";
    }
    if(graphicBGType == "video"){
        bgImage.src = "";
        bgVideo.src = graphicBG;
        bgVideo.play().catch(()=>{});
        bgImage.style.visibility = "hidden";
        bgVideo.style.visibility = "visible";
    }
}

function imageFitConfig () {
    switch(imageFit) {
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

function bgPositionConfig(value) { 
    
    bgImage.style.objectPosition = value.toLowerCase();
    bgVideo.style.objectPosition = value.toLowerCase();
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

function reposition() {
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;

    mainClass.forEach(el => {
        el.style.left = `${centerX}px`;
        el.style.top = `${centerY}px`;
    });
}
function shapeConfig () {

    switch(shape){
        case 0:
        case 1:
        case 2:
            allowXMovement = true;
            allowYMovement = true;
            break;
        case 3:
            allowXMovement = false;
            allowYMovement = true;
            reposition();
            break;
        case 4:
            allowXMovement = true;
            allowYMovement = false;
            reposition();
            break;
    }
    positionConfig();

    mainClass.forEach(el => {
        switch(shape){
            case 0:
                el.style.borderRadius = "50%"; 
                el.style.height = "";
                el.style.width = "";
                el.style.setProperty('--defaultRotation', "");
                break;
            case 1:
                el.style.borderRadius = "8%"; 
                el.style.height = "";
                el.style.width = "";
                el.style.setProperty('--defaultRotation', "");
                break;
            case 2:
                el.style.borderRadius = "0%"; 
                el.style.height = "";
                el.style.width = "";
                el.style.setProperty('--defaultRotation', "");
                break;
            case 3:
                el.style.borderRadius = "0%"; 
                el.style.height = "";
                el.style.width = "100%";
                el.style.setProperty('--defaultRotation', `0deg`);
                break;
            case 4:
                el.style.borderRadius = "0%"; 
                el.style.height = "100%";
                el.style.width = "";
                el.style.setProperty('--defaultRotation', `0deg`);
                break;
            default: break;
        }
    })
}