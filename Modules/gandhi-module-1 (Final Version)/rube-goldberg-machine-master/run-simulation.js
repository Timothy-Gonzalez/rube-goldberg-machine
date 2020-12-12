/**
 * Scroll to start coding line
 *
 * The code below is just for structure, ignore it unless you absolutely need too change it
 **/
const baseW = 2000, baseH = 500; //The base size to use for dynamic scaling
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
        case 'x':
            alert("CatapultSquare: X= "+catapultSquare.position.x+", Y= "+catapultSquare.position.y)
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
        nums = 10
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


//Just a nice simple function, not required
function worldAdd(obj) {
    World.add(world, obj)
}
var gandhiobjects = [];//array to hold the world objects
//Initializes canvas with matter.js
function init() {

    //---------- Vertical Rectangles
    createRect(1870,909,10,120, true, "gray",0);
    createRect(2220,1020,10,75, true, "gray",0);
    createRect(2200,809,10,320, true, "gray",0);
    createRect(1990,623,10,300, true, "gray",0);
    createRect(4380,2523,50,50, false, "red",0);
    rect6 = Bodies.rectangle(1800,925,10,150,{ isStatic: true, render: {fillStyle:'gray'}});
    rect12 = Bodies.rectangle(2120,795,10,290,{ isStatic: true, render: {fillStyle:'gray'}});
    gandhiobjects.push(rect6,rect12);
    //---------- Vertical Rectangles End


    //---------- Horizontal Rectangles
    createRect(686,481,475,15, true, "gray",0);
    createRect(1200,1033,10,10, true, "gray",0);
    createRect(2590,670,10,10, true, "gray",0);
    createRect(1950,1060,550,10, true, "gray",0);
    createRect(2210,1006,20,10, true, "gray",0);
    createRect(3250,2700,1750,10, true, "gray",0);
    //---------- Horizontal Rectangles End

    //---------- Angled Rectangles
    createRect(245,342,500,15, true, "gray",34);
    createRect(1013,650,230,15, true, "gray",34);
    createRect(1740,810,150,10, true, "gray",34);
    createRect(1930,810,150,10, true, "gray",-34);
    createRect(2220,495,370,10, true, "gray",-57);
    createRect(2245,580,170,10, true, "gray",-57);
    createRect(2420,410,240,10, true, "gray",34);
    createRect(2401,582,275,10, true, "gray",34);
    createRect(4245,2554,300,10, true, "gray",-25);
    createRect(4261,2635,300,10, true, "gray",-25);
    //createRect(4345,2594,500,10, true, "gray",-25);
    //---------- Angled Rectangles End

    //---------- Pressure Plates
    createRect(2620,2705,100,20, true, "orange",0);
    createRect(3430,2705,100,20, true, "orange",0);
    createRect(4075,2704,100,20, true, "orange",0);
    createRect(4139,2697,40,20, true, "orange",-25);
    //---------- Pressure Plates End


    //---------- Dominoes
    createDomino(485,400,30,105,0.005, 0.03, "dodgerblue");
    createDomino(540,400,15,135, 0.005,0.03, "darkviolet");
    createDomino(640,400,20,110, 0.005,0.03, "darkviolet");
    createDomino(685,400,15,143, 0.050,0.03, "dodgerblue");
    createDomino(735,400,15,90,0.005, 0.04, "darkviolet");
    createDomino(776,400,18,145,0.005, 0.05, "dodgerblue");
    gandhiobjects.push(Bodies.rectangle(600,400,15,105,{ isStatic: false, frictionAir: 0.005, density:0.03,friction: 0.03, render: {fillStyle: "dodgerblue"}}))
    //---------- Dominoes End



    //---------- Circles
    let circle1 = Bodies.circle(901,415,30, { isStatic: false, friction: 0.01, frictionAir: 0,render: {fillStyle:'darkviolet'}, density:.4});
    let circle2 = Bodies.circle(150,50,45,{friction: 0.01, density:0.015, render: {fillStyle: "darkviolet"}});
    gandhiobjects.push(circle1, circle2);
    //---------- Circles End


    //---------- Pyramid
    /*let stack1 = Composites.pyramid(6500,1300,7,5,0,0, function(x,y){//pyramid(xx, yy, columns, rows, columnGap, rowGap, callback)//original 1400
        return Bodies.polygon(x,y,8,20);
    });
    gandhiobjects.push(stack1);*/
    //---------- Pyramid End


    //---------- Car
    var scale = 0.9;
    car1 = Composites.car(1825, 1025, 140 * scale, 10 * scale, 20 * scale);
    car2 = Composites.car(2490, 2625, 180 * scale, 25 * scale, 30 * scale);
    gandhiobjects.push(car1, car2);
    //---------- Car End



    //---------- Catapult
    catapultSquare = Bodies.rectangle(1250,960,40,40, {friction: 0.04,render: {fillStyle:'red'}, density:.00001, restitution:0, collisionFilter: { group: group }});
    var group = Body.nextGroup(true);
    let catapult = Bodies.rectangle(1300, 1020, 250, 15, { frictionAir: 0,density:0.005,collisionFilter: { group: group }, render:{fillStyle:'dodgerblue'}});
    gandhiobjects.push(catapultSquare, catapult, Constraint.create({
        bodyA: catapult,
        pointB: Vector.clone(catapult.position),
        frictionAir: 0.1,
        stiffness: 1,
        length: 0
    }));

    catapult2 = Bodies.rectangle(2780, 2050, 400, 10, { frictionAir: 0,density:0.00005,collisionFilter: { group: group }, render:{fillStyle:'dodgerblue'}});
    gandhiobjects.push(catapult2, Constraint.create({
        bodyA: catapult2,
        pointB: Vector.clone(catapult2.position),
        frictionAir: 0.1,
        stiffness: 1,
        length: 0
    }));

    catapult3 = Bodies.rectangle(2600, 520, 10, 435, { frictionAir: 0.1,density:0.000000005,collisionFilter: { group: group }, render:{fillStyle:'dodgerblue'}, angle: 30*(Math.PI/180)});
    gandhiobjects.push(catapult3, Constraint.create({
        bodyA: catapult3,
        pointB: Vector.clone(catapult3.position),
        frictionAir: 0,
        stiffness: 1,
        length: 0
    }));
    //---------- Catapult End


    //---------- Plinko Frame
    let leftPlinkoX = 2525;
    let rightPlinkoX = 3025;
    let plinkoY = 750;
    for (var j=0;j<6;j++){
        if (j>0){
            createRect(leftPlinkoX, plinkoY, 50, 10, true, "gray", 0)
        }
        createRect(rightPlinkoX, plinkoY, 50, 10, true, "gray", 0)

        plinkoY+=100;
    }
    //---------- Plinko Frame End

    //---------- Plinko Non-Static Balls
    gandhiobjects.push(Bodies.rectangle(2500,1350,10,1250,{ isStatic: true, render: {fillStyle:'gray'}}));//plinko wall 1
    gandhiobjects.push(Bodies.rectangle(3050,1350,10,1250,{ isStatic: true, render: {fillStyle:'gray'}}));//plinko wall 2
    gandhiobjects.push(rh3 = Bodies.rectangle(2525,750,50,10,{ isStatic: true, render: {fillStyle:'gray'}}));// first spike
    gandhiobjects.push(rhc1 = Bodies.circle(2530, 700, 22.5, {friction: 0.01, frictionAir: 0.025, restitution:0.5, render: {fillStyle: "darkviolet"}}));
    gandhiobjects.push(rhc2 = Bodies.circle(3020, 700, 22.5, {friction: 0.01, frictionAir: 0.025,restitution:0.5, render: {fillStyle: "dodgerblue"}}));
    gandhiobjects.push(rhc3 = Bodies.circle(2530, 800, 22.5, {friction: 0.01, frictionAir: 0.025,restitution:0.5, render: {fillStyle: "dodgerblue"}}));
    gandhiobjects.push(rhc4 = Bodies.circle(3020, 800, 22.5, {friction: 0.01, frictionAir: 0.025,restitution:0.5, render: {fillStyle: "darkviolet"}}));
    gandhiobjects.push(rhc5 = Bodies.circle(2530, 900, 22.5, {friction: 0.01, frictionAir: 0.025,restitution:0.5, render: {fillStyle: "darkviolet"}}));
    gandhiobjects.push(rhc6 = Bodies.circle(3020, 900, 22.5, {friction: 0.01, frictionAir: 0.025,restitution:0.5, render: {fillStyle: "dodgerblue"}}));
    gandhiobjects.push(rhc7 = Bodies.circle(2530, 1000, 22.5, {friction: 0.01, frictionAir: 0.025,restitution:0.5, render: {fillStyle: "dodgerblue"}}));
    gandhiobjects.push(rhc8 = Bodies.circle(3020, 1000, 22.5, {friction: 0.01, frictionAir: 0.025,restitution:0.5, render: {fillStyle: "darkviolet"}}));
    gandhiobjects.push(rhc9 = Bodies.circle(2530, 1100, 22.5, {friction: 0.01, frictionAir: 0.025,restitution:0.5, render: {fillStyle: "darkviolet"}}));
    gandhiobjects.push(rhc10 = Bodies.circle(3020, 1100, 22.5, {friction: 0.01, frictionAir: 0.025,restitution:0.5, render: {fillStyle: "dodgerblue"}}));
    gandhiobjects.push(rhc11 = Bodies.circle(2530, 1200, 22.5, {friction: 0.01, frictionAir: 0.025,restitution:0.5, render: {fillStyle: "dodgerblue"}}));
    gandhiobjects.push(rhc12 = Bodies.circle(3020, 1200, 22.5, {friction: 0.01, frictionAir: 0.025,restitution:0.5, render: {fillStyle: "darkviolet"}}));
    //---------- Plinko Non-Static Balls End

    //Plinko Static Balls End
    var xPos = 2580;
    var yPos = 1370;
    var oddRow = false;
    for (i=0;i<6;i++){
        oddRow = !oddRow;
        for (k=0;k<5;k++){
            if (oddRow){
                let newRect = Bodies.circle(xPos, yPos, 11, {isStatic: true, render: {fillStyle:'black'}});
                gandhiobjects.push(newRect)
                xPos+=90;
            }
            else{
                let newRect = Bodies.circle(xPos+40, yPos, 11, {isStatic: true, render: {fillStyle:'black'}});
                gandhiobjects.push(newRect);
                xPos+=90;
            }
        }
        yPos+=90;
        xPos = 2580;
    }
    //---------- Plinko Static Balls End

    //---------- Plinko Container
    containerPt1 = createRect(2770,2400,750,10, true, "red",0);
    containerPt2 = createRect(3170,2250,10,300, true, "red",10);
    containerPt3 = createRect(2370,2250,10,300, true, "red",-10);
    //---------- Plinko Container End


    rhc.push(rhc1, rhc2, rhc3, rhc4, rhc5, rhc6, rhc7, rhc8, rhc9, rhc10, rhc11, rhc12)
    //---------- Cloth
    var group2 = Body.nextGroup(true),
        particleOptions = { friction: 0.00001, collisionFilter: { group: group2 }, render: { visible: false, fillStyle: 'skyblue' }},
        constraintOptions = { stiffness: 0.06 },
        cloth = Composites.softBody(2750, 2515, 13, 5, 5, 5, false, 13, particleOptions, constraintOptions);
    for (var i = 0; i < 13; i++) {
        cloth.bodies[i].isStatic = true;
    }
    var group3 = Body.nextGroup(true),
        particleOptions2 = { friction: 0.00001, collisionFilter: { group: group3 }, render: { visible: false, fillStyle: 'skyblue' }},
        constraintOptions2 = { stiffness: 0.06 },
        cloth2 = Composites.softBody(3550, 2515, 13, 5, 5, 5, false, 13, particleOptions2, constraintOptions2);
    for (var k = 0; k < 13; k++) {
        cloth2.bodies[k].isStatic = true;
    }
    gandhiobjects.push(cloth, cloth2);
    //---------- Cloth end

    //---------- Cradle
    let cradleA = Composites.newtonsCradle(4680, 2180, 5, 50, 250, {fillStyle: 'red'});
    gandhiobjects.push(cradleA);
    //---------- Cradle End


    addObjects(gandhiobjects);

}

function createRect(x, y, w, h, stat, color, a){
    let rect = Bodies.rectangle(x, y, w, h,{ isStatic: stat, render: {fillStyle:color}, angle: a*(Math.PI/180)});//convert to radians using pi/180
    gandhiobjects.push(rect);

}
function createDomino(x, y, w, h, fA, d, c){
    let domino = Bodies.rectangle(x, y, w, h,{ isStatic: false, frictionAir: fA, density:d, render: {fillStyle: c}});
    gandhiobjects.push(domino);

}
function createCircle(x, y){
    let circle = Bodies.circle(x, y, 22.5, {friction: 0.01, frictionAir: 0.02, restitution:0.5});
    gandhiobjects.push(circle);
}
let catapult3, catapult2;
let cloth;
let cloth2;
let rect21;
let rect6;
let rh3;
let rect12;
let rhc1, rhc2, rhc3, rhc4, rhc5, rhc6, rhc7, rhc8, rhc9, rhc10, rhc11, rhc12 ;
let rhc = [];
let catapultSquare;
let car1, car2;
function addObjects(obj) {
    for (let i=0;i<obj.length;i++){
        World.add(world, obj[i])
    }
}

var changeGravity = false;
var moveCircles = false;
var afterCircles = false;
var pressurePlate2 = false;
var pressurePlate3 = false;
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 400,
        wireframes: false
    }
});
Render.run(render);
//Runs every frame if you need to check something every frame
function onUpdate() {
    if (catapultSquare.position.x>rect6.position.x&&catapultSquare.position.x<rect6.position.x+50&&catapultSquare.position.y>rect6.position.y+85){
        setTimeout(function () {
            Body.applyForce( car1.bodies[0], {x: car1.bodies[0].position.x, y: car1.bodies[0].position.y}, {x: 0.003, y: 0})
        },500)

    }
    if (catapultSquare.position.x>rect12.position.x+25&&changeGravity==false){
        changeGravity = true;
        setTimeout(function () {
            Body.setVelocity( catapultSquare, {x: 0, y: -50});
        },500)
    }
    if (catapultSquare.position.x>catapult3.position.x-70&&moveCircles==false){
        moveCircles = true;
        setTimeout(function () {
            Body.setVelocity( rhc2, {x: -7, y: 0});
        }, 1200);
        setTimeout(function () {
            Body.setVelocity( rhc3, {x: 9, y: 0});
        }, 2100);
        setTimeout(function () {
            Body.setVelocity( rhc4, {x: -9, y: 0});
        }, 3000);
        setTimeout(function () {
            Body.setVelocity( rhc5, {x: 7, y: 0});
        }, 3900);
        setTimeout(function () {
            Body.setVelocity( rhc6, {x: -9, y: 0});
        }, 4800);
        setTimeout(function () {
            Body.setVelocity( rhc7, {x: 10, y: 0});
        }, 5700);
        setTimeout(function () {
            Body.setVelocity( rhc8, {x: -7, y: 0});
        }, 6600);
        setTimeout(function () {
            Body.setVelocity( rhc9, {x: 7, y: 0});
        }, 7500);
        setTimeout(function () {
            Body.setVelocity( rhc10, {x: -8, y: 0});
        }, 8400);
        setTimeout(function () {
            Body.setVelocity( rhc11, {x: 11, y: 0});
        }, 9300);
        setTimeout(function () {
            Body.setVelocity( rhc12, {x: -9, y: 0});
        }, 10200);
    }
    if (afterCircles==false){
        var circlesFall = true;
        for (var k=0;k<12;k++){
            if (rhc[k].position.y<catapult2.position.y+250){
                circlesFall = false;
                break;
            }
        }
        if (circlesFall==true){
            afterCircles = true;
            setTimeout(function () {
                Body.applyForce( car2.bodies[0], {x: car2.bodies[0].position.x, y: car2.bodies[0].position.y}, {x: 1, y: 0})
            }, 1500)
            setTimeout(function () {
                Body.applyForce( car2.bodies[0], {x: car2.bodies[0].position.x, y: car2.bodies[0].position.y}, {x: 1, y: 0})
            }, 3500)
            setTimeout(function () {
                Body.applyForce( car2.bodies[0], {x: car2.bodies[0].position.x, y: car2.bodies[0].position.y}, {x: .8, y: 0})
            }, 4500)
        }


    }



}



