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

function drawBody(body) {
    if (!body.show) {
        fill(body.render.fillStyle);
        stroke(body.render.strokeStyle)
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
        body.show();
    }
}

function draw() {
    let nums = 1;
    if (keyInputData.speed) {
        nums = 5;
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
    let bool1 = true;
    let bool2 = true;
    let bool3 = true;
    let bool4 = true;
    let bool5 = true;
    let bool6 = true;
    let bool7 = true;
    let bool8 = true;
    let bool9 = true;
    let bool10 = true;
    let bool11 = true;
    let bool12 = true;
    let bool13 = true;
    let bool14 = true;
    let bool15 = true;
    let bool16 = true;
    let stackArray = []
    
    //Regular rectangle
    // worldAdd(Bodies.rectangle(25, 10, 50, 50, {
    //     render: {
    //         fillStyle: 'red',
    //     }
    // }))

    // //Regular ramp
    // worldAdd(Bodies.rectangle(500, 400, 1000, 10, {
    //     angle: Math.PI * 0.05,
    //     isStatic: true
    // }))

    worldAdd(Bodies.rectangle(20, 400, 200, 10, {
        angle: 35,
        isStatic: true
    }))

    //worldAdd(Composites.car(200, 50, 100, 5, 10))

    worldAdd(Bodies.circle(20, 20, 35, {mass:100}))

    worldAdd(Bodies.rectangle(320, 500, 390, 10, {
        isStatic: true
    }))

    for(i=220;i<450;i+=40){
        worldAdd(Matter.Bodies.rectangle(i, 220, 10, 60))
    }
    worldAdd(Matter.Bodies.rectangle(180, 220, 20, 60, {mass:10}))
    worldAdd(Matter.Bodies.rectangle(460, 220, 10, 60), {mass:10})
    //worldAdd(Matter.Bodies.rectangle(400, 220, 20, 60))
    var cradle = Composites.newtonsCradle(630, 300, 5, 30, 200)
    worldAdd(cradle)
    Body.translate(cradle.bodies[0], { x: -209, y: -50 });

    worldAdd(Bodies.rectangle(1070, 600, 10, 290, {
        isStatic: true
    }))
    worldAdd(Matter.Bodies.rectangle(1061, 220, 290, 40))
    let cannonBall = Bodies.circle(1180, 200, 15)
    worldAdd(cannonBall)

    // worldAdd(Bodies.rectangle(1920, 900, 300, 20, { 
    //     isStatic: true
    // }))

    let car1 = Composites.car(1340, 500, 100, 5, 10)
    worldAdd(car1)

    let carFloor1 = Bodies.rectangle(1450, 900, 550, 20, { //Car Floor
        isStatic: true})
    worldAdd(carFloor1)
    worldAdd(Bodies.rectangle(1740, 840, 100, 100, {
        isStatic: true
    }))
    let pushBox = Bodies.rectangle(1200, 840, 100, 50, {
        mass:40,
        isStatic: true
    })
    worldAdd(pushBox)
    worldAdd(Bodies.rectangle(1220, 740, 100, 10, {
        angle: 35,
        isStatic: true
    }))

    var cradle2 = Composites.newtonsCradle(1930, 450, 8, 30, 200)
    worldAdd(cradle2)

    worldAdd(Bodies.rectangle(3000, 900, 1050, 20, { // Floor 2
        isStatic: true
    }))
    let fallever = Matter.Bodies.rectangle(2550, 220, 20, 390)
    worldAdd(fallever)

    worldAdd(Matter.Bodies.rectangle(3050, 840, 30, 30))
    worldAdd(Matter.Bodies.rectangle(3028, 810, 300, 9))
    let superBall = Bodies.circle(3150, 790, 15)
    worldAdd(superBall)

    worldAdd(Bodies.rectangle(3500, 550, 50, 720, { // lWall
        isStatic: true
    }))
    worldAdd(Matter.Bodies.rectangle(3500, 210, 710, 9))

    // worldAdd(Matter.Composites.stack(3265, 130, 13, 1, 0, 0, function(x, y) { 
    //     return Matter.Bodies.circle(x, y, 20, { restitution: 0.5, isStatic: false });
    // }))

    let ball1 = Matter.Bodies.circle(3265, 130, 20, { restitution: 0.5, isStatic: false })
    let ball2 = Matter.Bodies.circle(3305, 130, 20, { restitution: 0.5, isStatic: false })
    let ball3 = Matter.Bodies.circle(3345, 130, 20, { restitution: 0.5, isStatic: false })
    let ball4 = Matter.Bodies.circle(3385, 130, 20, { restitution: 0.5, isStatic: false })
    let ball5 = Matter.Bodies.circle(3425, 130, 20, { restitution: 0.5, isStatic: false })
    let ball6 = Matter.Bodies.circle(3465, 130, 20, { restitution: 0.5, isStatic: false })
    let ball7 = Matter.Bodies.circle(3505, 130, 20, { restitution: 0.5, isStatic: false })
    let ball8 = Matter.Bodies.circle(3545, 130, 20, { restitution: 0.5, isStatic: false })
    let ball9 = Matter.Bodies.circle(3585, 130, 20, { restitution: 0.5, isStatic: false })
    let ball10 = Matter.Bodies.circle(3625, 130, 20, { restitution: 0.5, isStatic: false })
    let ball11 = Matter.Bodies.circle(3665, 130, 20, { restitution: 0.5, isStatic: false })
    let ball12 = Matter.Bodies.circle(3705, 130, 20, { restitution: 0.5, isStatic: false })
    let ball13 = Matter.Bodies.circle(3745, 130, 20, { restitution: 0.5, isStatic: false })
    var breakBalls = [
        [ball1, bool3],
        [ball2, bool4],
        [ball3, bool5],
        [ball4, bool6],
        [ball5, bool7],
        [ball6, bool8],
        [ball7, bool9],
        [ball8, bool10],
        [ball9, bool11],
        [ball10, bool12],
        [ball11, bool13],
        [ball12, bool14],
        [ball13, bool15],
      ];

    for(i=0;i<=12;i++){
        worldAdd(breakBalls[i][0])
    }


    for(i=800;i<=1200;i+=200){                                                          //PLINKO
        worldAdd(Matter.Composites.stack(3600, i, 5, 1, 45, 5, function(x, y) { 
            return Matter.Bodies.circle(x, y, 35, { restitution: 0.5, isStatic: true });
        }))
        worldAdd(Matter.Composites.stack(3675, i+105, 4, 1, 45, 5, function(x, y) { 
            return Matter.Bodies.circle(x, y, 35, { restitution: 0.5, isStatic: true });
        }))
    }
    worldAdd(Bodies.rectangle(3610, 1150, 50, 720, { // lWall
        isStatic: true
    }))
    worldAdd(Bodies.rectangle(4110, 1100, 50, 620, { // rWall
        isStatic: true
    }))

    worldAdd(Bodies.rectangle(3750, 1440, 400, 50, {
        angle: 35,
        isStatic: true
    }))
    worldAdd(Bodies.rectangle(4400, 1540, 1000, 50, {
        isStatic: true
    }))

    let car2 = Composites.car(4000, 1500, 100, 5, 10)
    worldAdd(car2)

    worldAdd(Bodies.rectangle(4400, 1100, 50, 720, { // lWall
        isStatic: true
    }))
    worldAdd(Bodies.rectangle(4800, 1150, 50, 730, { // rWall
        isStatic: true
    }))

    let gravBall = Matter.Bodies.circle(4400, 1490, 25, { restitution: 0.8, isStatic: false });
    worldAdd(gravBall)
    
    worldAdd(Bodies.rectangle(5100, 800, 550, 20, { // Floor 2
        isStatic: true
    }))

    //liquid?
    let stack2 = Matter.Composites.stack(3200, 200, 22, 12, 0, 0, function(x, y) {      //Stack of small objects stacked 22x12
        return Matter.Bodies.circle(x, y, 5, { mass: 80, isStatic: false });
    });
    //worldAdd(stack2)

    let ballStack = Matter.Composites.stack(3200, 200, 2, 2, 0, 0, function(x, y) {      //Stack of circles stacked 2x2
        return Matter.Bodies.circle(x, y, 5, { mass: 80, isStatic: false });
    });



    function breakBall(ballObject){
        //console.log("SUPERSKEET")
        let ballStack = Matter.Composites.stack(ballObject.position.x, ballObject.position.y, 5, 5, 0, 0, function(x, y) {      //Stack of small objects stacked 22x12
            return Matter.Bodies.circle(x, y, 5, { mass: 80, isStatic: false });
        });
        stackArray.push(ballStack)
        worldAdd(ballStack)
        Matter.World.remove(world, ballObject)
    }

    Events.on(engine, "collisionStart", function (event) {
        if (bool1) {
            if (cannonBall.position.y > carFloor1.position.y - 31){
                //console.log("yeet")
                bool1=false
                Matter.Body.setVelocity(cannonBall, {x: 40, y: -16})
                Matter.Composite.translate(car1, {x: 300, y: 0})
            }
        }
        if (bool2) {
            if (fallever.position.y > carFloor1.position.y - 40){
                //console.log(fallever.position.y)
                bool2=false
                Matter.Body.setVelocity(superBall, {x: 0, y: -51.045})
            }
        }
        if (bool3){
            if (ball1.position.y >= carFloor1.position.y + 200){
                breakBall(ball1)
                bool3=false
            }
        }
        for(i=1;i<=12;i++){
            if(breakBalls[i][1]){
                if(breakBalls[i][0].position.y >= carFloor1.position.y + 100){
                    breakBall(breakBalls[i][0])
                    breakBalls[i][1] = false
                }
            }
        }
        if (bool16){
            if(gravBall.position.x > carFloor1.position.x + 3150){
                //console.log("Gravity")
                //Body.applyForce(gravBall,{x: gravBall.position.x, y: gravBall.position.y}, {x: 0, y: -160})
                Matter.Body.setVelocity(gravBall, {x: 4, y: -46})
                Body.applyForce( gravBall, {x: gravBall.position.x, y: gravBall.position.y}, {x: 0, y: -1000.15});
                setTimeout(function() {
                    for(i=1;i<=120;i++){
                        console.log("hello")
                        stackArray.forEach(element => Matter.World.remove(world, element))
                    }
                }, 5000)
                bool16=false
            }
        }
        
    })

}

//Runs every frame if you need to check something every frame
function onUpdate() {

}
