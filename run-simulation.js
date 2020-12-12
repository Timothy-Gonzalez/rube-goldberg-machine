/**
 * Scroll to start coding line
 *
 * The code below is just for structure, ignore it unless you absolutely need too change it
 **/
const baseW = 1000, baseH = 500; //The base size to use for dynamic scaling
const constWindowWidth = window.innerWidth, constWindowHeight = window.innerHeight; //Define window height

const constActualPaddingToUse = constWindowWidth * (0.005); //The padding to use on every side


//Define all required components, I.E. Engine is Matter.Engine, Render is Matter.Render, ect.
let Axes = Matter.Axes,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Bounds = Matter.Bounds,
    Common = Matter.Common,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Contact = Matter.Contact,
    Detector = Matter.Detector,
    Engine = Matter.Engine,
    Events = Matter.Events,
    Grid = Matter.Grid,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Render = Matter.Render,
    Resolver = Matter.Resolver,
    Runner = Matter.Runner,
    Sleeping = Matter.Sleeping,
    Svg = Matter.Svg,
    Vector = Matter.Vector,
    Vertices = Matter.Vertices,
    World = Matter.World;

/* Camera Control */
let keyInputData = {
    up: {
        active: false,
        offset: [0, -1],
    },
    down: {
        active: false,
        offset: [0, 1],
    },
    left: {
        active: false,
        offset: [-1, 0],
    },
    right: {
        active: false,
        offset: [1, 0],
    },
    speed: false,
}


let Camera = {
    //Define base camera x and y
    x: 0,
    y: 0,
    scale: 1,
    steps: [],
    t: 0,
};

/* Detect inputs */

//Set key to pressed
function simpleKeyPress(key, pressed) {
    switch (key) {
        case 'w':
        case 'ArrowUp':
            keyInputData.up.active = pressed;
            break;
        case 's':
        case 'ArrowDown':
            keyInputData.down.active = pressed;
            break;
        case 'a':
        case 'ArrowLeft':
            keyInputData.left.active = pressed;
            break;
        case 'd':
        case 'ArrowRight':
            keyInputData.right.active = pressed;
            break;
        case 'e':
            keyInputData.speed = pressed;
            break;
    }
}

//Registers when key is pressed down
document.addEventListener("keydown", event => {
    simpleKeyPress(event.key, true)
});
//Registers when key is released
document.addEventListener("keyup", event => {
    simpleKeyPress(event.key, false)
});
//Registers when scroll wheel is used
document.addEventListener("wheel", event => {
    let zoomThresh = 0.85;
    if (event.deltaY !== 0) {
        if (event.deltaY > 0) {
            Camera.scale *= (zoomThresh);
        } else {
            Camera.scale *= (1 / zoomThresh);
        }
    }
})

let runBefore = false;
let world, engine;
function setup() {
    if (runBefore) {
        return
    }
    runBefore = true;
    console.log("Running setup")
    let actualW = constWindowWidth - (constActualPaddingToUse * 2); //The actual width to use
    let actualH = constWindowHeight - (constActualPaddingToUse * 2); //The actual height to use
    createCanvas(actualW, actualH)
    engine = Engine.create();
    world = engine.world;
    console.log("Running init")
    shiftInit(init, 500, 0);
    console.log("Running engine, started")
}

function drawBody(body, showF, iterative) {
    if (body.parts.length > 1 && !iterative) {
        let bodies = body.parts
        for (let i = 1; i < bodies.length; i++) {
            drawBody(bodies[i], body.show, true)
        }
        return;
    }
    if (!body.show && !showF) {
        let fillColor = color(body.render.fillStyle);
        let strokeColor = color(body.render.strokeStyle)
        fillColor.setAlpha(255 * body.render.opacity)
        strokeColor.setAlpha(255 * body.render.opacity)

        fill(fillColor);
        stroke(strokeColor)
        strokeWeight(body.render.lineWidth)

        if (!body.circleRadius) {
            beginShape();
            let vertices = Vertices.create(body.vertices);
            for (let point of vertices) {
                vertex(point.x, point.y);
            }
            endShape();
        } else {
            circle(body.position.x, body.position.y, body.circleRadius * 2);
        }
    } else {
        if (body.show) {
            body.show();
        } else {
            showF()
        }
    }
}

function draw() {
    let nums = 1;
    if (keyInputData.speed) {
        nums = 15;
    }
    for (let i = 0; i < nums; i++) {
        Matter.Engine.update(engine, 1000 / 60, 1);
        Camera.t += (1 / 60)
    }

    if (!Camera.steps[0]) {
        console.log("Camera not setup")
    } else {
        let posX = Camera.steps[0].xDif;
        let posY = Camera.steps[0].yDif;
        let scaleF = 1;
        let onStep = 0;
        let timeLeft = Camera.t;
        for (let i = 1; i < Camera.steps.length; i++) {
            let on = Camera.steps[i];
            if (timeLeft > on.time) {
                onStep = i;
                posX += on.xDif;
                posY += on.yDif;
                scaleF = on.scale;
                timeLeft -= on.time;
            }
        }

        let nextStep = Camera.steps[onStep + 1];
        if (nextStep) { //not out of bounds
            let deltaT = (timeLeft) / nextStep.time
            posX += (nextStep.xDif * deltaT)
            posY += (nextStep.yDif * deltaT)
            scaleF += ((nextStep.scale - scaleF) * deltaT)

            Camera.x = posX;
            Camera.y = posY;
            Camera.scale = scaleF;
        }
    }

    onUpdate();
    let change = [0, 0];
    for (let keyName in keyInputData) {
        let keyData = keyInputData[keyName];
        if (keyData.active) {
            change[0] += keyData.offset[0];
            change[1] += keyData.offset[1];
        }
    }

    const timeAcrossScreen = 1; //Time it takes to go across one full screen
    let cameraSpeed = baseW * (1 / timeAcrossScreen / 60) * (1 / Camera.scale);

    if (change[0] !== 0 || change[1] !== 0) { //If camera is updated, change viewport
        Camera.x += change[0] * cameraSpeed;
        Camera.y += change[1] * cameraSpeed;
    }

    background(51);
    let scaleFactor = Camera.scale * (constWindowWidth / baseW);

    let bounds = {
        min: {
            x: Camera.x - ((width / 2) / scaleFactor),
            y: Camera.y - ((height / 2) / scaleFactor),
        },
        max: {
            x: Camera.x + ((width / 2) / scaleFactor),
            y: Camera.y + ((height / 2) / scaleFactor),
        },
    }

    let bodies = Composite.allBodies(world);
    for (let obj of bodies) { //For each
        push();
        var boundsWidth = bounds.max.x - bounds.min.x,
            boundsHeight = bounds.max.y - bounds.min.y,
            boundsScaleX = boundsWidth / width,
            boundsScaleY = boundsHeight / height;

        scale(1 / boundsScaleX, 1 / boundsScaleY);
        translate(-bounds.min.x, -bounds.min.y);

        drawBody(obj)

        pop();
    }
}

function addStep(xDif, yDif, scale, time) {
    Camera.steps.push({
        xDif: xDif,
        yDif: yDif,
        scale: scale,
        time: time,
    })
}

function shiftInit(initFunction, xOffset, yOffset) {
    let stillTracking = true;
    let tracker = [];
    Events.on(world, "beforeAdd", function(item) {
        if (!stillTracking) {
            return
        }
        tracker.push(item.object)
    })

    initFunction()
    stillTracking = false;

    for (let i = 0; i < tracker.length; i++) {
        let on = tracker[i];
        if (on.type === 'body') {
            Body.translate(on, Vector.create(xOffset, yOffset));
        } else if (on.type === 'composite') {
            Composite.translate(on, Vector.create(xOffset, yOffset));
        }
    }
}

/*-----------------------------------------------------*/

/**
 * Start coding your module here
 */

//Just a nice simple function, not required
function worldAdd(obj) {
    World.add(world, obj)
}

//Initializes canvas with matter.js
function init() {
    addStep(0, 150, 1, 0)
    addStep(500, 0, 1, 3)
    addStep(0, 0, 0.1, 3)
    //Regular rectangle
    worldAdd(Bodies.rectangle(25, 10, 50, 50, {
        render: {
            fillStyle: 'red',
        },
        isStatic: true
    }))

    //Regular ramp
    worldAdd(Bodies.rectangle(500, 400, 1000, 10, {
        angle: Math.PI * 0.05,
        isStatic: true
    }))

    worldAdd(Composites.car(200, 50, 100, 5, 10))

    worldAdd(Bodies.circle(750, 50, 25))


    worldAdd(Bodies.circle(800, 800, 50, {
        angle: Math.PI * 0.05,
        isStatic: true
    }))

    //Custom render example (if you don't want basic drawing vertices), for example a rectangle as a circle (rectangle collison, circle render)
    let custom = Bodies.rectangle(500, 50, 100, 100)
    custom.show = function() {
        push();
        fill(0, 255, 0);
        noStroke();
        circle(this.position.x, this.position.y, 100)
        pop();
    }
    worldAdd(custom)
}

//Runs every frame if you need to check something every frame
function onUpdate() {

}
