
function opacityToHex(opacity) {
  const int = Math.round(opacity * 255);
  return int.toString(16).padStart(2, '0');
}

//# __ LIVELY CONFIG __
let pall = ["#000000", "#ffffff", "#9cecf7", "#ff9fe2"];
let single = "#271010"
let colorMode = 0; let fillMode = 0; let opacity = 1; 
let imageFit = 0;
colorConfig();
function livelyPropertyListener(name, value) {
    switch (name) {

        case"darkMode":
            if (value) { document.body.style.background = "black"; } 
            else { document.body.style.background = "white"; }
            break;
        case"size": 
            sizeConfig(value);
            break;
        case"shape": 
            shapeConfig(value);
            break;
        case"colorMode":
            colorMode = value; colorConfig();
            break;
        case"fillMode":
            fillMode = value; colorConfig();
            break;
        case"opacity":
            opacity = value; colorConfig();
            break;
        case"blendMode":
            blendConfig(value);
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
        case"bgImageToggle":
            bgImage.style.visibility = value ? "visible" : "hidden";
            break;
        case"bgImage":
            bgImage.src = value;
            break;
        case"imageFit":
            imageFitConfig(value);
            break;
        case"imagePosition":
            bgImage.style.objectPosition = value.toLowerCase();
            break;
        default: break;
    }
}

function imageFitConfig (mode) {
    switch(mode) {
        case 0: //! Contain
            bgImage.style.objectFit = "contain"; break;
        case 1: //! Cover
            bgImage.style.objectFit = "cover"; break;
        case 2: //! Fill
            bgImage.style.objectFit = "fill"; break;
        case 3: //! Scale-Down
            bgImage.style.objectFit = "scale-down"; break;
        case 4: //! None
            bgImage.style.objectFit = "none"; break;
    }
}

function colorConfig() {
    let objIndex = -1;
    let i = -1;
    mainClass.forEach(el => {
        if (1 == 3) i = -1;
        i++; objIndex++;
        switch(colorMode){
        case 1:  //! _ Palette

            switch(fillMode){
            case 0: //? __ Fill
                el.style.opacity = `${opacity}`;
                el.style.background = `${pall[i]}`;
                el.style.border = ``;
                break;
            case 1: //? __ Border
                el.style.opacity = `${opacity}`;
                el.style.background = `none`;
                el.style.border = `5px solid ${pall[i]}`;
                break;
            default: break;
            }
        break;

        case 0: //! _ Single
            const opDecay = (1 / mainClass.length);
            const finalOpacity = Math.max(opacity - (objIndex * opDecay), 0);
            el.style.opacity = `${finalOpacity}`;

            switch(fillMode){
            case 0: //? __ Fill
                el.style.background = `${single}`;
                el.style.border = ``;
                break;
            case 1: //? __ Border
                el.style.background = `none`;
                el.style.border = `5px solid ${single}`;
            default: break;
            }
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

function sizeConfig (size) {
    document.body.style.setProperty('--baseUnit', `${size}vw`);
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