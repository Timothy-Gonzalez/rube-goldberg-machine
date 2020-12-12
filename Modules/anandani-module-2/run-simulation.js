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
    init();
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

    let offsetX = Camera.x * scaleFactor;
    let offsetY = Camera.y * scaleFactor;

    let bodies = Composite.allBodies(world);
    for (let obj of bodies) { //For each
        push();
        translate(-offsetX, -offsetY);
        scale(scaleFactor);
        drawBody(obj)
        pop();
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
    let world1Objects = []
    let world2Objects = []
    let bool1 = true
    let bool2 = true
    let bool3 = true
    let bool4 = true
    let bool5 = false
    let bool6 = true
    let bool7 = true
    let bool8 = true
    let bool9 = true
    let bool10 = true
    let bool11 = true
    let bool12 = true

    //Regular rectangle
    // worldAdd(Bodies.rectangle(25, 10, 50, 50, {
    //     render: {
    //         fillStyle: 'red',
    //     }
    // }))
    //Final Objects

    //Regular ramp
    let baseRamp = Bodies.rectangle(50, 400, 600, 10, {angle: 145.5, isStatic: true})
    let storedOffset = Vector.clone(baseRamp.position) //Timothy added this because stuff needs to be translated
    worldAdd(baseRamp)
    worldAdd(Bodies.rectangle(600, 650, 800, 10, {isStatic: true}))
    worldAdd(Bodies.rectangle(7000, 650, 1800, 100, {isStatic: true}))
    let startBall = Bodies.circle(20, 50, 10, {density: 0.01, friction: 0.0001, frictionAir: 0.00001})
    worldAdd(startBall)


    world1Objects.push(Bodies.rectangle(1060, 600, 200, 10, {angle: 134.6, isStatic: true})) //ramp
    world1Objects.push(Bodies.rectangle(1490, 560, 200, 10, {isStatic: true})) //pad1
    world1Objects.push(Bodies.rectangle(2290, 660, 200, 10, {isStatic: true})) //bottom s
    world1Objects.push(Bodies.rectangle(2390, 560, 10, 120, {isStatic: true})) //right s
    world1Objects.push(Bodies.rectangle(2290, 260, 200, 10, {isStatic: true})) //top s
    world1Objects.push(Bodies.rectangle(2190, 360, 10, 200, {isStatic: true})) //left s
    world1Objects.push(Bodies.rectangle(2690, 360, 10, 200, {isStatic: true})) //top col
    world1Objects.push(Bodies.rectangle(2690, 660, 10, 200, {isStatic: true})) //bottom col
    world1Objects.push(Bodies.rectangle(2090, 960, 10, 200, {isStatic: true})) //lower col

    world1Objects.push(Bodies.rectangle(3290, 1160, 1200, 50, {isStatic: true})) //box top
    world1Objects.push(Bodies.rectangle(2690, 1260, 50, 200, {isStatic: true})) //box up enter
    world1Objects.push(Bodies.rectangle(2690, 1660, 50, 200, {isStatic: true})) //box down enter
    world1Objects.push(Bodies.rectangle(3290, 1760, 1200, 50, {isStatic: true})) //box bottom

    for(i=3160;i<3800;i+=30){
        world1Objects.push(Matter.Bodies.rectangle(i, 1620, 10, 60, {mass:4}))
    }
    world1Objects.push(Composites.car(3850, 1630, 100, 5, 10))
    world1Objects.push(Bodies.rectangle(3870, 2400, 600, 50, {angle: 145, isStatic: true}))
    world1Objects.push(Bodies.rectangle(4400, 2520, 600, 50, {isStatic: true}))
    let superSquare = Bodies.rectangle(4100, 2450, 30, 30)
    world1Objects.push(superSquare)
    world1Objects.push(Bodies.rectangle(5200, 2520, 20, 420, {isStatic: true}))
    world1Objects.push(Bodies.rectangle(5225, 2200, 420, 20))
    let transCircle = Bodies.circle(5120, 2170, 10, {density: 0.01, friction: 0.0001, frictionAir: 0.00001})
    worldAdd(transCircle)
    world1Objects.push(Bodies.rectangle(5620, 2800, 600, 50, {angle: 145, isStatic: true}))
    let bigWall = Bodies.rectangle(7906, 3000, 50, 600, {isStatic: true})
    worldAdd(bigWall)
    worldAdd(Bodies.rectangle(6990, 3300, 1800, 50, {isStatic: true}))


    /**
     * World 1 changed to World 2
     */


    let bounceBall = Bodies.circle(6100, 3350, 100, {density: 0.01, friction: 0.0001, frictionAir: 0.00001, isStatic: true})
    world2Objects.push(bounceBall)
    world2Objects.push(Bodies.rectangle(5390, 1160, 1200, 50, {isStatic: true})) //box top
    //world2Objects.push(Bodies.rectangle(5090, 1460, 50, 600, {isStatic: true})) //box up enter
    world2Objects.push(Bodies.rectangle(6190, 1460, 50, 600, {isStatic: true})) //box down enter
    world2Objects.push(Bodies.rectangle(5390, 1760, 1200, 50, {isStatic: true})) //box bottom
    for(i=4880;i<5850;i+=20){
        world2Objects.push(Matter.Bodies.rectangle(i, 1620, 10, 60, {mass:4}))
    }
    let bBlock = Bodies.rectangle(4850, 1660, 60, 60, {mass:20})
    world2Objects.push(bBlock)
    let cradle = Composites.newtonsCradle(3780, 800, 10, 50, 200)
    Body.translate(cradle.bodies[0], { x: -209, y: -80 });
    world2Objects.push(cradle)
    world2Objects.push(Bodies.rectangle(3290, 1160, 50, 600, {isStatic: true}))
    world2Objects.push(Bodies.rectangle(3290, 600, 550, 20))
    world2Objects.push(Bodies.rectangle(2900, 1760, 1200, 50, {isStatic: true}))
    world2Objects.push(Bodies.rectangle(1700, 2390, 2000, 50, {isStatic: true}))
    for(i=1580;i<2000;i+=40){
        world2Objects.push(Matter.Bodies.rectangle(i, 1620, 20, 550, {mass:4}))
    }
    let finalCircle = Bodies.circle(850, 1870, 10, {density: 0.01, friction: 0.0001, frictionAir: 0.00001, restitution: 0.9})
    world2Objects.push(finalCircle)

    world2Objects.push(Bodies.rectangle(0, 1960, 50, 250, {isStatic: true}))
    world2Objects.push(Bodies.rectangle(800, 1660, 50, 250, {isStatic: true}))
    world2Objects.push(Bodies.rectangle(0, 1360, 50, 250, {isStatic: true}))
    world2Objects.push(Bodies.rectangle(800, 1060, 50, 250, {isStatic: true}))
    world2Objects.push(Bodies.rectangle(0, 760, 50, 250, {isStatic: true}))
    world2Objects.push(Bodies.rectangle(1200, 870, 50, 250, {angle: 135.7, isStatic: true}))


    world1Objects.forEach(element => worldAdd(element))

    //worldAdd(Composites.car(200, 50, 100, 5, 10))
    var newBall = Bodies.circle(finalCircle.position.x, finalCircle.position.y, 10, {friction: 0.9, frictionAir: 0.0001})
    var newBall2 = Bodies.circle(finalCircle.position.x, finalCircle.position.y, 10, {friction: 0.9, frictionAir: 0.0001})


    Events.on(engine, "collisionStart", (event) => {
        if(bool1){
            if(startBall.position.x > baseRamp.position.x + 750){
                Matter.Body.setVelocity(startBall, {x: 10, y: -10})
                startBall.restitution = 1.4
                bool1 = false
            }
        }
        if(bool2){
            if(startBall.position.x > baseRamp.position.x + 3050){
                Matter.World.remove(world, startBall)
                let dominoBox = Matter.Bodies.rectangle(baseRamp.position.x + 3070, baseRamp.position.y + 1240, 20, 60, {mass:10})
                world1Objects.push(dominoBox)
                worldAdd(dominoBox)
                Body.setAngularVelocity( dominoBox, Math.PI/18);
                bool2 = false
            }
        }
        if(bool3){
            if(superSquare.position.x > baseRamp.position.x + 4065){    //4115
                Matter.Body.setVelocity(superSquare, {x: 20, y: -20})
                bool3 = false
            }
        }
        if(bool4){
            if (transCircle.position.x > baseRamp.position.x + 7815){       //7865
                Matter.Body.setVelocity(transCircle, {x: -20, y: 0})
                world1Objects.forEach(element => Matter.World.remove(world, element))
                world2Objects.forEach(element => {
                    //Timothy added this because stuff needs to be translated
                    let offset = (Vector.sub(Vector.clone(baseRamp.position), storedOffset))
                    if (element.type === 'body') {
                        Body.translate(element, offset)
                    } else if (element.type === 'composite') {
                        Composite.translate(element, offset)
                    }
                    worldAdd(element)
                })
                bool4=false
                bool5=true
            }
        }
        if(bool5){
            if (transCircle.position.x < baseRamp.position.x + 6115){         //6165
                Matter.Body.setVelocity(transCircle, {x: -2, y: -30})
                bool5=false
            }
        }
        if((bool6)){
            if(bBlock.position.y > baseRamp.position.x + 1750){           //1800
                Matter.Body.setVelocity(bBlock, {x: 0, y: -70})
                bool6=false
            }
        }
        if(bool7){
            if(finalCircle.position.x < baseRamp.position.x + 750){     //800
                Matter.Body.setVelocity(finalCircle, {x: -30, y: -20})
                bool7=false
            }
        }
        if(bool8){
            if(finalCircle.position.x > (baseRamp.position.x + 720) && (finalCircle.position.y < (baseRamp.position.x + 1800) && finalCircle.position.y > (baseRamp.position.x + 1500))){   //770    1850   1550
                Matter.Body.setVelocity(finalCircle, {x: -30, y: -20})
                bool8=false
            }
        }
        if(bool9){
            if(finalCircle.position.x > (baseRamp.position.x + 710)  && (finalCircle.position.y < (baseRamp.position.x + 1430)  && finalCircle.position.y > (baseRamp.position.x + 600) )){    //760   1480   650
                Matter.Body.setVelocity(finalCircle, {x: -30, y: -15})
                bool9=false
            }
        }
        if(bool10){
            if(finalCircle.position.x < (baseRamp.position.x - 10)  && (finalCircle.position.y < (baseRamp.position.x + 830)  && finalCircle.position.y > (baseRamp.position.x + 600) )){  // 40   880    650
                Matter.Body.setVelocity(finalCircle, {x: 28, y: -3})
                bool10=false
            }
        }
        if(bool11){
            if(finalCircle.position.y < (baseRamp.position.x + 350)  && finalCircle.position.x < (baseRamp.position.x + 500) ){       //400   550
                newBall = Bodies.circle(finalCircle.position.x, finalCircle.position.y, 10, {friction: 0.9, frictionAir: 0.0001})
                newBall2 = Bodies.circle(finalCircle.position.x - 10, finalCircle.position.y - 10, 10, {density: 0.01, friction: 0.001, frictionAir: 0.00001})
                worldAdd(newBall)
                worldAdd(newBall2)
                worldAdd(Bodies.circle((baseRamp.position.x + 950) , (baseRamp.position.x + 600) , 100, {density: 0.01, friction: 0.0001, frictionAir: 0.00001, isStatic: true}))    //1000      650
                worldAdd(Bodies.circle((baseRamp.position.x + 6250) , (baseRamp.position.x + 570) , 100, {density: 0.01, friction: 0.0001, frictionAir: 0.00001, isStatic: true}))    //6300      620
                Matter.Body.setVelocity(newBall, {x: 45, y: -18})
                world2Objects.forEach(element => Matter.World.remove(world, element))
                bool11=false
            }
        }
        if(bool12){
            if(newBall2.position.x > (baseRamp.position.x + 830) ){      //880
                Matter.Body.translate(newBall2, {x: 5500, y: -40})
                Matter.Body.setVelocity(newBall2, {x: 10, y: 0})
                setTimeout(function() {
                    Matter.Body.setVelocity(newBall2, {x: 15, y: 0})
                }, 1000)
                // newBall2.position.x += 5500
                // newBall2.position.y -= 250
                bool12=false
            }
        }
    })
}

//Runs every frame if you need to check something every frame
function onUpdate() {

}
