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
        case 'r':
            if (pressed) {
                break;
            }
            Camera.t -= 0.25;
            break;
        case 't':
            if (pressed) {
                break;
            }
            Camera.t += 0.25;
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
let modules = [];

let runNext, onUpdate;

let timeouts = [];

function setup() {
    if (runBefore) {
        return
    }
    runBefore = true;
    console.log("Running setup")
    let actualW = constWindowWidth - (constActualPaddingToUse * 2); //The actual width to use
    let actualH = constWindowHeight - (constActualPaddingToUse * 2); //The actual height to use
    createCanvas(actualW, actualH)
    console.log("Running inits")

    let gonzalezM1 = shiftInit(gonzalezM1Init, 0, 0);
    onUpdate = null;

    runNext = function() {
        let gandhiM1 = shiftInit(gandhiM1Init, 8772, 9142);
        onUpdate = gandhiM1Update;
        World.remove(gonzalezM1.world, m1to2car)
        Composite.translate(m1to2car, Vector.create(-8772, -9142))
        World.add(gandhiM1.world, m1to2car)

        runNext = function() {
            removeInit(gonzalezM1)
            let anandaniM1 = shiftInit(anandaniM1Init, 14050, 11350);
            onUpdate = null;
            runNext = function() {
                removeInit(gandhiM1)
                let anandaniM2 = shiftInit(anandaniM2Init, 19300, 12350)
                World.remove(anandaniM1.world, m3to4ball)
                Body.translate(m3to4ball, Vector.create((anandaniM1.xOffset - anandaniM2.xOffset), (anandaniM1.yOffset - anandaniM2.yOffset)))
                World.add(anandaniM2.world, m3to4ball)
                runNext = function() {
                    removeInit(anandaniM1)
                    shiftInit(gonzalezM2Init, 27100, 12875)
                    console.log('end')
                }
            }
        }
    }

    // runNext();
    // runNext();
    // runNext();

    addStep(Camera.x + 500, Camera.y + 250, 1, 0)
    addStep(0, 100, 1, 10)
    addStep(100, 300, 1, 5)
    addStep(200, 400, 1, 2)
    addStep(500, 200, 0.75, 2)
    addStep(1500, 200, 0.75, 5)
    addStep(0, 0, 0.5, 3)
    addStep(0, 1500, 0.25, 3)
    addStep(-1000, 0, 0.5, 3)
    addStep(500, 1450, 0.25, 2.5)
    addStep(3000, 0, 0.25, 5)
    addStep(1500, 1000, 0.25, 5)
    addStep(250, 0, 0.25, 3)
    addStep(200, 1000, 0.5, 3.5)
    addStep(0, 2000, 0.5, 5)
    addStep(1150, 1000, 0.65, 3)
    addStep(0, 0, 0.65, 3.15)
    addStep(2000, 500, 0.5, 5)
    addStep(500, 0, 0.75, 3.15)
    addStep(0, 0, 0.75, 5)
    addStep(650, -150, 1, 3)
    addStep(0, 2000, 1, 15)
    //Car moves to right
    addStep(1000, 0, 0.35, 3)
    addStep(2000, -200, 0.25, 3)

    //Ronit
    addStep(2000, 200, 0.35, 5)
    addStep(1500, 200, 0.5, 3)
    addStep(0, 750, 1, 6)
    addStep(500, 0, 1, 2)
    addStep(150, -500, 1, 3)
    addStep(500, 500, 0.5, 2)

    //Ronnit 2
    addStep(1500, 150, 0.5, 3)
    addStep(2500, 1500, 0.5, 2)
    addStep(0, 0, 0.5, 10)
    addStep(2250, 750, 0.35, 2)
    addStep(1500, 0, 0.45, 2)
    addStep(-1500, 0, 0.35, 2.5)
    addStep(-1000, -1500, 0.35, 0.75)
    addStep(0, 0, 0.35, 18)
    addStep(-2500, 600, 0.35, 0.75)
    addStep(0, 0, 0.35, 4)
    addStep(-2000, 0, 0.35, 4)
    addStep(0, 0, 0.35, 4)
    addStep(0, -1250, 0.25, 3.5)
    addStep(7550, 0, 0.75, 1.5)
    addStep(0, 0, 0.75, 8)


    //Timothy 2
    addStep(200, 3000, 0.75, 10)

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
        for (let j = 0; j < modules.length; j++) {
            let on = modules[j];
            if (on && on.engine && !on.disabled) {
                Matter.Engine.update(on.engine, 1000 / 60, 1);
            }
        }
        for (let j = timeouts.length - 1; j >= 0; j--) {
            let on = timeouts[j];
            on.timeLeft -= (1000 / 60);
            if (on.timeLeft <= 0) {
                on.handler();
                timeouts.splice(j, 1)
            }
        }
        Camera.t += (1 / 60)

        if (onUpdate) {
            onUpdate();
        }
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
            } else {
                break
            }
        }
        if (onStep > 43) {
            if (blowUpFinal) {
                blowUpFinal();
                blowUpFinal = false;
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

    modules.forEach((data) => {
        let bodies = Composite.allBodies(data.world);
        for (let obj of bodies) { //For each
            push();
            translate(data.xOffset * scaleFactor, data.yOffset * scaleFactor)
            var boundsWidth = bounds.max.x - bounds.min.x,
                boundsHeight = bounds.max.y - bounds.min.y,
                boundsScaleX = boundsWidth / width,
                boundsScaleY = boundsHeight / height;

            scale(1 / boundsScaleX, 1 / boundsScaleY);
            translate(-bounds.min.x, -bounds.min.y);

            drawBody(obj)

            pop();
        }
    })
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
    let engine = Engine.create();
    let world = engine.world;
    initFunction({
        world: world,
        engine: engine,
    })

    modules.push(
        {
            xOffset: xOffset,
            yOffset: yOffset,
            world: world,
            engine: engine,
        }
    )

    return modules[modules.length - 1]

    /*
    Old code for singular-world model
    let stillTracking = true;
    let tracker = [];

    Events.on(world, "beforeAdd", function(item) {
        if (!stillTracking) {
            return
        }
        if (!item.object.length) {
            tracker.push(item.object)
        } else {
            item.object.forEach((obj)=> tracker.push(obj))
        }
    })

    initFunction()
    stillTracking = false;

    function translateObj(obj) {
        let v = Vector.create(xOffset, yOffset);

        if (obj.type === 'body') {
            Body.translate(obj, v);
        } else if (obj.type === 'composite') {
            Composite.translate(obj, v);
            for (let i = 0; i < obj.constraints.length; i++) {
                translateObj(obj.constraints[i])
            }
        } else if (obj.type === 'constraint') {
            if (!obj.bodyA || obj.bodyA === world) {
                obj.pointA = Vector.add(Vector.clone(obj.pointA), Vector.create(xOffset, yOffset))
            }
            if (!obj.bodyB || obj.bodyB === world) {
                obj.pointB = Vector.add(Vector.clone(obj.pointB), Vector.create(xOffset, yOffset))
            }
        }
    }

    for (let i = 0; i < tracker.length; i++) {
        let on = tracker[i];
        translateObj(on)
    }

    return tracker; */
}

function removeInit(module) {
    //TODO: Make work with modules

    module.disabled = true;

    // obj.forEach(function(item) {
    //     World.remove(world, item)
    // })
}

//A remodeled version of set timeout which is consistent with the physics engine. implemented in draw
function relTimeout(handler, timeInMs) {
    timeouts.push({
        handler: handler,
        timeLeft: timeInMs,
    })
}

/*-----------------------------------------------------*/

/**
 * Start coding your module here
 */

/**
 * Gonzalez Module 1
 **/
let m1to2car;
function gonzalezM1Init(data) {
    let world = data.world;
    let engine = data.engine;
    //Just a nice simple function, not required
    function worldAdd(obj) {
        World.add(world, obj)
    }

    let barrierColor = "#090909"
    let barrier2Color = "#ff8300"
    let objectColor = "#224b88"


    function createBall(x, y, r, d) {
        if (!d) {
            d = 0.005;
        }
        let c = Bodies.circle(x, y, r, {
            friction: 0,
            restitution: 0.45,
            density: d,
            render: {
                fillStyle: objectColor,
            }
        })

        worldAdd(c)
        return c
    }


    function createSquare(x, y, s, d) {
        if (!d) {
            d = 0.005;
        }
        let c = Bodies.rectangle(x, y, s, s, {
            friction: 0,
            restitution: 0.45,
            density: d,
            render: {
                fillStyle: objectColor,
            }
        })

        worldAdd(c)
        return c
    }

    function createDropShoot(x, y, r, h) {
        createBall(x, y - h, r)
        worldAdd(Bodies.rectangle(x - (r) - 15, y - (h * 0.5), 10, h, {
            isStatic: true,
            render: {
                fillStyle: barrierColor,
            }
        }))
        worldAdd(Bodies.rectangle(x + (r) + 15, y - (h * 0.5), 10, h, {
            isStatic: true,
            render: {
                fillStyle: barrierColor,
            }
        }))
    }

    function createBin(x, y, w, h, t, noRight) {
        worldAdd(Bodies.rectangle(x, y + (h * 0.5), t, h, {
            isStatic: true,
            render: {
                fillStyle: barrierColor
            }
        }))
        let bottom = Bodies.rectangle(x + (w * 0.5), y + h, w + (t), t, {
            isStatic: true,
            render: {
                fillStyle: barrierColor
            }
        })
        worldAdd(bottom)
        if (!noRight) {
            worldAdd(Bodies.rectangle(x + w, y + (h * 0.5), t, h, {
                isStatic: true,
                render: {
                    fillStyle: barrierColor
                }
            }))
        }

        return bottom
    }

    function createLever(x, y, w, h, d) {
        if (!d) {
            d = 0.001;
        }
        let rect = Bodies.rectangle(x, y, w, h, {
            chamfer: 5,
            density: d,
            render: {
                fillStyle: barrier2Color,
            },
        })
        let constraint = Constraint.create({
            bodyA: rect,
            pointB: Matter.Vector.create(x, y),
            stiffness: 1,
            length: 0
        })

        worldAdd([constraint, rect])
    }

    function createSpring(x, y, w, h, power) {
        let trampoline = Bodies.rectangle(x, y, w, h, {
            render: {
                fillStyle: barrierColor,
            },
        })

        let leftConstraint = Constraint.create({
            bodyA: trampoline,
            pointA: Vector.create(-(w * 0.5), 0),
            pointB: Vector.add(Vector.create(-(w * 0.5), -(w * 0.5)), Matter.Vector.create(trampoline.position.x, trampoline.position.y)),
            stiffness: 0.001,
        })

        let rightConstraint = Constraint.create({
            bodyA: trampoline,
            pointA: Vector.create((w * 0.5), 0),
            pointB: Vector.add(Vector.create((w * 0.5), -(w * 0.5)), Matter.Vector.create(trampoline.position.x, trampoline.position.y)),
            stiffness: 0.001,
        })

        worldAdd([trampoline, leftConstraint, rightConstraint])

        Events.on(engine, "collisionStart", function (data) {
            let pairs = data.pairs;
            if (pairs && pairs.length > 0) {
                for (let j = 0; j < pairs.length; j++) {
                    let on = pairs[j];
                    if (on.bodyB.id === trampoline.id) {
                        Body.setVelocity(on.bodyA, Vector.add(Vector.create(10 * power, -50 * power), Vector.clone(on.bodyA.velocity)))
                    }
                }
            }
        })
    }

    //Custom function to make a car
    function createCar(x, y, d) {
        if (!d) {
            d = 0.001;
        }
        //Create a collision group for the car so that the body and wheels don't collide (they can exist inside each other with glitching out)
        let collisionGroup = Body.nextGroup(true); //Create a group where participants don't collide with each other

        //Now, to make a car, we need 2 sets of wheels
        let wheel1 = Bodies.circle(x - 50, y, 25, { //(350, 250) center, radius 25
            collisionFilter: { group: collisionGroup }, //Add to collision group
            friction: 0.025, //Half the normal friction for these car wheels
            density: d,
            render: {
                fillStyle: "#000000",
            }
        });
        let wheel2 = Bodies.circle(x + 50, y, 25, { //(450, 250) center, radius 25
            collisionFilter: { group: collisionGroup }, //Add to collision group
            friction: 0.025, //Half the normal friction for these car wheels
            density: d,
            render: {
                fillStyle: "#000000",
            }
        });

        //And a body for the car (the wheels need something to connect to)
        let carBody = Bodies.rectangle(x, y, 150, 25, { //(400, 250) center, width 150 and height 25
            collisionFilter: { group: collisionGroup }, //Add to collision group
            density: d,
            render: {
                fillStyle: "#ac3333",
            },
            chamfer: 15,
        });

        //This is a little complicated, so remember you can mess around with the numbers and see what happens. Have fun!
        //Create a constraint
        let wheel1Constraint = Constraint.create({
            bodyA: carBody, //Between the car's body
            bodyB: wheel1, //And the wheel
            pointA: Vector.create(-50, 0), //50 pixels to the left of the center of the car (which ends up being where the wheel is)
            //You don't have to specify pointB because it defaults to the center of the wheel, which is where we want it
            //The length defaults to 0 since it is generated off the original positions of the bodies
        });

        //Create another constraint
        let wheel2Constraint = Constraint.create({
            bodyA: carBody, //Between the car's body
            bodyB: wheel2, //And the wheel
            pointA: Vector.create(50, 0), //50 pixels to the right of the center of the car (which ends up being where the wheel is)
            //You don't have to specify pointB because it defaults to the center of the wheel, which is where we want it
            //The length defaults to 0 since it is generated off the original positions of the bodies
        });

        let compositeCar = Composite.create();

        Composite.add(compositeCar, [wheel1, wheel2, carBody, wheel1Constraint, wheel2Constraint]) //Add both wheels, the car body, and the constraints to world
        worldAdd(compositeCar)
        return compositeCar
    }

    for (let i = 0; i < 3; i++) {
        let dir = i % 2 === 0;
        let neg = dir ? 1 : -1
        let x = 500 + (dir ? -250 : 250);

        let ramp = Bodies.rectangle(x, 200 * (i + 1), 1000, 10, {
            friction: 0,
            isStatic: true,
            angle: (7.5) * (Math.PI / 180) * neg,
            render: {
                fillStyle: barrierColor,
            },
        });

        if (i !== 0) {
            let already = false;
            Events.on(engine, "collisionStart", function (data) {
                if (!already) {
                    let pairs = data.pairs;
                    if (pairs && pairs.length > 0) {
                        for (let j = 0; j < pairs.length; j++) {
                            let on = pairs[j];
                            if (on.bodyA.id === ramp.id || on.bodyB.id === ramp.id) {
                                already = true;
                                let xoffset = (dir ? -375 : 375);
                                let ball = createBall(ramp.position.x + xoffset, ramp.position.y - 100, 20 + (i * 5));
                                Body.applyForce(ball, Vector.clone(ball.position), Vector.create((dir ? 0.25 : -0.25), 0))
                            }
                        }
                    }
                }
            })
        }

        worldAdd(ramp);
    }

    createDropShoot(30, 0, 15, 30)

    worldAdd(Bodies.rectangle(800, 800, 250, 10, {
        isStatic: true,
        angle: (-5.5) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    createBin(928, 783, 200, 100, 10);

    worldAdd(Bodies.rectangle(700, 1000, 500, 10, {
        isStatic: true,
        angle: (60) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    worldAdd(Bodies.rectangle(1040, 1340, 500, 10, {
        isStatic: true,
        angle: (30) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    worldAdd(Bodies.rectangle(1504, 1486, 500, 10, {
        isStatic: true,
        angle: (5) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    createLever(1200, 1200, 15, 425) //bigger bottom lever
    createLever(1150, 975, 15, 200) //smaller top lever

    worldAdd(Bodies.rectangle(1250, 950, 100, 10, {
        isStatic: true,
        render: {
            fillStyle: barrierColor,
        },
    }))

    createBall(1250, 900, 30)

    worldAdd(Bodies.rectangle(1504, 1286, 500, 10, {
        isStatic: true,
        angle: (5) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    for (let i = 0; i < 2; i++) {
        worldAdd(Bodies.rectangle(2252, 1558 - (i * 200), 1000, 10, {
            isStatic: true,
            friction: 0.05,
            render: {
                fillStyle: barrierColor,
            },
        }))

        for (let j = 0; j < 28; j++) {
            worldAdd(Bodies.rectangle(1772 + (j * 35), 1458 - (i * 200), 15, Math.min(175, 100 + (j * 3)), {
                isStatic: false,
                friction: 0.05,
                render: {
                    fillStyle: objectColor,
                },
            }))
        }

        worldAdd(Bodies.rectangle(2850, 1500 - (i * 200), 10, 10, {
            isStatic: true,
            render: {
                fillStyle: barrierColor,
            },
        }))

        createSquare(2850, 1400 - (i * 200), 150)
    }

    createLever(2650, 3000, 1250, 20)

    worldAdd(Bodies.rectangle(2100, 3015, 10, 10, {
        isStatic: true,
        render: {
            fillStyle: barrierColor,
        },
    }))

    createBall(2100, 2900, 30, 0.001)


    worldAdd(Bodies.rectangle(1800, 3715, 1500, 10, {
        isStatic: true,
        angle: (65) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    let offsets = [0, 1350, 2250, 3000];

    for (let i = 0; i < offsets.length; i++) {
        let offset = offsets[i];
        let val = (1 - (i / 4 / 2))
        createSpring(2270 + offset, 4450, 300, 25, val)
    }


    worldAdd(Bodies.rectangle(5760, 4575, 15, 600, {
        isStatic: true,
        angle: (-5) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    for (let i = 0; i < 4; i++) {
        let yOff = (i % 2 === 0) ? 0 : 40
        createLever(6000 + (i * 300), 4750 - yOff, 400, 15, 0.00015)
    }

    createLever(7000, 5000, 15, 500, 0.0001)


    worldAdd(Bodies.rectangle(7060, 5275, 15, 15, {
        isStatic: true,
        render: {
            fillStyle: barrierColor,
        },
    }))

    createSquare(7060, 5000, 100)

    createLever(7560, 6000, 1000, 15)

    worldAdd(Bodies.rectangle(8075, 6000, 15, 500, {
        isStatic: true,
        render: {
            fillStyle: barrierColor,
        },
    }))


    worldAdd(Bodies.rectangle(8000, 6033, 50, 50, {
        isStatic: true,
        render: {
            fillStyle: barrierColor,
        },
    }))

    let bodies = Composites.stack(7850, 5750, 7, 7, 1, 1, function(x, y) {
        return Bodies.circle(x, y, 10, {
            render: {
                fillStyle: objectColor
            }
        })
    })
    worldAdd(bodies)

    for (let i = 0; i < 20; i++) {
        let xOff = (i % 2 === 0) ? 0 : 25
        for (let j = 0; j < 20; j++) {
            worldAdd(Bodies.circle(6750 + xOff + (j * 55), 7000 + (i * 75), 4, {
                isStatic: true,
                render: {
                    fillStyle: barrierColor,
                },
            }))
        }
    }

    worldAdd(Bodies.rectangle(8042, 6850, 500, 15, {
        isStatic: true,
        angle: (-25) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    worldAdd(Bodies.rectangle(6725, 7825, 25, 1750, {
        isStatic: true,
        render: {
            fillStyle: barrierColor,
        },
    }))
    worldAdd(Bodies.rectangle(7825, 7825, 25, 1750, {
        isStatic: true,
        render: {
            fillStyle: barrierColor,
        },
    }))

    worldAdd(Bodies.rectangle(7400, 9000, 1500, 15, {
        isStatic: true,
        angle: (25) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    for (let i = 0; i < 5; i++) {
        let bin = createBin(8080 + (i * 33), 9310 + (i * 10), 32, 32, 10, i !== 4)

        let already = false;
        Events.on(engine, "collisionStart", function (data) {
            if (!already) {
                let pairs = data.pairs;
                if (pairs && pairs.length > 0) {
                    for (let j = 0; j < pairs.length; j++) {
                        let on = pairs[j];
                        if (on.bodyB.id === bin.id) {
                            already = true;
                            let obj = Bodies.rectangle(bin.position.x, bin.position.y + 50, 50, 50, {
                                isStatic: true,
                                render: {
                                    fillStyle: barrierColor,
                                },
                            })

                            obj.show = function() {
                                push()
                                fill("#ffff00")
                                textAlign(CENTER);
                                textSize(30);
                                text(i + 1, this.position.x, this.position.y);
                                if (i === 4) {
                                    textSize(50);
                                    text("PRIZE!\nReleased", this.position.x - 65, this.position.y + 50)
                                }
                                pop()
                            }

                            worldAdd(obj)

                            if (i === 4) {
                                runNext()
                                World.remove(world, blocker)
                            }
                        }
                    }
                }
            }
        })
    }


    let blocker = Bodies.rectangle(8600, 9210, 15, 50, {
        isStatic: true,
        angle: (35) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    })

    worldAdd(blocker)

    worldAdd(Bodies.rectangle(8432, 9125, 1500, 15, {
        isStatic: true,
        angle: (35) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    m1to2car = createCar(8050, 8400, 0.1)

    worldAdd(Bodies.rectangle(345 + 8772,342 + 70 + 9142,150,15, {
        isStatic: true,
        render: {
            fillStyle: barrierColor,
        },
    }))
}

/**
 * Gandhi Module 1
 **/

var gandhiobjects = [];//array to hold the world objects
//Initializes canvas with matter.js
function gandhiM1Init(data) {
    let world = data.world;
    let engine = data.engine;
    //Just a nice simple function, not required
    function worldAdd(obj) {
        World.add(world, obj)
    }

    //Transition
    worldAdd(Bodies.rectangle(8432 - 8772, 9125 - 9142, 1500, 15, {
        isStatic: true,
        angle: (35) * (Math.PI / 180),
        render: {
            fillStyle: "#090909",
        },
    }))

    //---------- Vertical Rectangles
    createRect(1870,909,10,120, true, "gray",0);
    createRect(2220,1020,10,75, true, "gray",0);
    createRect(2200,809,10,320, true, "gray",0);
    createRect(1990,623 - 50,10,400, true, "gray",0);
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
    createRect(345,342 + 70,150,15, true, "#090909",0);
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
    //let circle2 = Bodies.circle(150,50,45,{friction: 0.01, density:0.015, render: {fillStyle: "darkviolet"}});
    gandhiobjects.push(circle1)//circle1, circle2);
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

    catapult3 = Bodies.rectangle(2600, 520, 10, 485, { frictionAir: 0.1,density:0.000000005,collisionFilter: { group: group }, render:{fillStyle:'dodgerblue'}, angle: 30*(Math.PI/180)});
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
    gandhiobjects.push(Bodies.rectangle(2500,1370,10,1225,{ isStatic: true, render: {fillStyle:'gray'}}));//plinko wall 1
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
    var xPos = 2590;
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
    firstP123 = cradleA.bodies[0]
    gandhiobjects.push(cradleA);
    //---------- Cradle End


    for (let i=0;i<gandhiobjects.length;i++){
        World.add(world, gandhiobjects[i])
    }

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
let firstP123;
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

var changeGravity = false;
var moveCircles = false;
var afterCircles = false;
var pressurePlate2 = false;
var pressurePlate3 = false;
//Runs every frame if you need to check something every frame
function gandhiM1Update() {
    if (catapultSquare.position.x>rect6.position.x&&catapultSquare.position.x<rect6.position.x+50&&catapultSquare.position.y>rect6.position.y+85){
        relTimeout(function () {
            Body.applyForce( car1.bodies[0], {x: car1.bodies[0].position.x, y: car1.bodies[0].position.y}, {x: 0.003, y: 0})
        },500)

    }
    if (catapultSquare.position.x>rect12.position.x+25&&changeGravity==false){
        changeGravity = true;
        relTimeout(function () {
            Body.setVelocity( catapultSquare, {x: 0, y: -50});
        },500)
    }
    if (catapultSquare.position.x>catapult3.position.x-70&&moveCircles==false){
        moveCircles = true;
        relTimeout(function () {
            Body.setVelocity( rhc1, {x: 7, y: 0});
            Body.setVelocity( rhc2, {x: -7, y: 0});
        }, 1200);
        relTimeout(function () {
            Body.setVelocity( rhc3, {x: 9, y: 0});
        }, 2100);
        relTimeout(function () {
            Body.setVelocity( rhc4, {x: -9, y: 0});
        }, 3000);
        relTimeout(function () {
            Body.setVelocity( rhc5, {x: 7, y: 0});
        }, 3900);
        relTimeout(function () {
            Body.setVelocity( rhc6, {x: -9, y: 0});
        }, 4800);
        relTimeout(function () {
            Body.setVelocity( rhc7, {x: 10, y: 0});
        }, 5700);
        relTimeout(function () {
            Body.setVelocity( rhc8, {x: -7, y: 0});
        }, 6600);
        relTimeout(function () {
            Body.setVelocity( rhc9, {x: 7, y: 0});
        }, 7500);
        relTimeout(function () {
            Body.setVelocity( rhc10, {x: -8, y: 0});
        }, 8400);
        relTimeout(function () {
            Body.setVelocity( rhc11, {x: 11, y: 0});
        }, 9300);
        relTimeout(function () {
            Body.setVelocity( rhc12, {x: -9, y: 0});
        }, 10200);
    }
    if (afterCircles==false){
        var circlesFall = true;
        for (var k=0;k<11;k++){
            if (rhc[k].position.y<catapult2.position.y+250){
                circlesFall = false;
                break;
            }
        }
        if (circlesFall==true){
            afterCircles = true;
            relTimeout(function () {
                Body.applyForce( car2.bodies[0], {x: car2.bodies[0].position.x, y: car2.bodies[0].position.y}, {x: 1, y: 0})
                runNext();
            }, 1500)
            relTimeout(function () {
                Body.applyForce( car2.bodies[0], {x: car2.bodies[0].position.x, y: car2.bodies[0].position.y}, {x: 1, y: 0})
            }, 3500)
            relTimeout(function () {
                Body.applyForce( car2.bodies[0], {x: car2.bodies[0].position.x, y: car2.bodies[0].position.y}, {x: .8, y: 0})

                relTimeout(function() {
                    Body.setVelocity(firstP123, Vector.create(20, 0))
                }, 500)
            }, 4500)
        }


    }
}

/**
 * Anandani Module 1
 **/
function anandaniM1Init(data) {
    let world = data.world;
    let engine = data.engine;
    //Just a nice simple function, not required
    function worldAdd(obj) {
        World.add(world, obj)
    }
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

    let m2to3ball = Bodies.circle(-100, 20, 45,
        {
            mass: 100,
        })
    worldAdd(m2to3ball)

    relTimeout(function() {
        Body.setVelocity(m2to3ball, Vector.create(10, 3))
    }, 3350)

    worldAdd(Bodies.rectangle(-100, 300, 20, 20, {
        angle: 0,
        isStatic: true
    }))

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
    let fallever = Matter.Bodies.rectangle(2540, 220, 20, 390)
    worldAdd(fallever)

    worldAdd(Matter.Bodies.rectangle(3050, 840, 30, 30))
    worldAdd(Matter.Bodies.rectangle(3028, 810, 300, 9))
    let superBall = Bodies.circle(3150, 790, 15)
    worldAdd(superBall)

    worldAdd(Bodies.rectangle(3500, 550, 50, 720, { // lWall
        isStatic: true
    }))

    let lever = Matter.Bodies.rectangle(3500, 210, 910, 19 * 2, {
        density: 0.00015 / 2,
    })
    worldAdd(lever)

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

    // let car2 = Composites.car(4000, 1500, 100, 5, 10)
    // worldAdd(car2)

    worldAdd(Bodies.rectangle(4400, 1100, 50, 720, { // lWall
        isStatic: true
    }))
    worldAdd(Bodies.rectangle(4800, 1150, 50, 730, { // rWall
        isStatic: true
    }))

    let gravBall = Matter.Bodies.circle(4400, 1490, 25, { isStatic: false });
    worldAdd(gravBall)

    m3to4ball = gravBall;

    worldAdd(Bodies.rectangle(5040, 950, 550, 20, { // Floor 2
        isStatic: true,
        angle: (35) * (Math.PI / 180),
    }))

    // //liquid?
    // let stack2 = Matter.Composites.stack(3200, 200, 22, 12, 0, 0, function(x, y) {      //Stack of small objects stacked 22x12
    //     return Matter.Bodies.circle(x, y, 5, { mass: 80, isStatic: false });
    // });
    // //worldAdd(stack2)
    //
    // let ballStack = Matter.Composites.stack(3200, 200, 2, 2, 0, 0, function(x, y) {      //Stack of circles stacked 2x2
    //     return Matter.Bodies.circle(x, y, 5, { mass: 80, isStatic: false });
    // });



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
                Body.translate(cradle.bodies[0], { x: -209, y: -50 });
            }
        }
        if (bool2) {
            if (fallever.position.y > carFloor1.position.y - 40){
                //console.log(fallever.position.y)
                bool2=false
                Matter.Body.setVelocity(superBall, {x: 0, y: -45.045})
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
                relTimeout(function() {
                    for(i=1;i<=120;i++){
                        //console.log("hello")
                        stackArray.forEach(element => Matter.World.remove(world, element))
                    }
                    runNext();
                }, 4000)
                bool16=false
            }
        }

    })

}

/**
 * Anandani Module 2
 **/
function anandaniM2Init(data) {
    let world = data.world;
    let engine = data.engine;
    //Just a nice simple function, not required
    function worldAdd(obj) {
        World.add(world, obj)
    }

    let oX = 19300 - 14050
    let oY = 12350 - 11350
    worldAdd(Bodies.rectangle(5040 - oX, 950 - oY, 550, 20, { // Transitional
        isStatic: true,
        angle: (35) * (Math.PI / 180),
    }))

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
    worldAdd(Bodies.rectangle(20, 100, 15, 15, {
        isStatic: true
    }))
    worldAdd(startBall)

    relTimeout(function() {
        World.remove(world, m3to4ball)
    }, 10000)

    world1Objects.push(Bodies.rectangle(1060, 600, 200, 10, {angle: 134.6, isStatic: true})) //ramp
    world1Objects.push(Bodies.rectangle(1490, 560, 200, 10, {isStatic: true})) //pad1
    world1Objects.push(Bodies.rectangle(2290, 660, 200, 20, {isStatic: true})) //bottom s
    world1Objects.push(Bodies.rectangle(2390, 530, 20, 200, {isStatic: true})) //right s
    world1Objects.push(Bodies.rectangle(2340, 250, 500, 20, {isStatic: true})) //top s
    world1Objects.push(Bodies.rectangle(2190, 360, 20, 200, {isStatic: true})) //left s
    world1Objects.push(Bodies.rectangle(2690, 360, 20, 200, {isStatic: true})) //top col
    world1Objects.push(Bodies.rectangle(2690, 660, 20, 200, {isStatic: true})) //bottom col
    world1Objects.push(Bodies.rectangle(2090, 1500, 1600, 50, {angle: 144.9, isStatic: true}))
    //world1Objects.push(Bodies.rectangle(2090, 1400, 30, 700, {angle: 145, isStatic: true})) //lower col

    world1Objects.push(Bodies.rectangle(3290, 1160, 1200, 50, {isStatic: true})) //box top
    //world1Objects.push(Bodies.rectangle(2690, 1260, 50, 200, {isStatic: true})) //box up enter
    //world1Objects.push(Bodies.rectangle(2690, 1660, 50, 160, {isStatic: true})) //box down enter
    world1Objects.push(Bodies.rectangle(3290, 1760, 1250, 50, {isStatic: true})) //box bottom

    for(i=3160;i<3820;i+=20){
        world1Objects.push(Matter.Bodies.rectangle(i, 1620, 10, 60))
    }
    let car = Composites.car(3884.771, 1630, 100, 5, 10)
    world1Objects.push(car)

    relTimeout(function() {
        Body.setVelocity(car.bodies[0], Vector.create(20, 0))
    }, 14000)

    world1Objects.push(Bodies.rectangle(3870, 2400, 600, 50, {angle: 145, isStatic: true}))
    world1Objects.push(Bodies.rectangle(4400, 2520, 600, 50, {isStatic: true}))
    let superSquare = Bodies.rectangle(4100, 2450, 30, 30)
    world1Objects.push(superSquare)
    world1Objects.push(Bodies.rectangle(5200, 2520, 20, 420, {isStatic: true}))
    let brokenObject = Bodies.rectangle(5226, 2200, 420, 20)
    Body.setStatic(brokenObject, true)
    world1Objects.push(brokenObject)

    let transCircle = Bodies.circle(5120, 2170, 10, {density: 0.02, friction: 0.0001, frictionAir: 0.00001})
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
    world2Objects.push(Bodies.rectangle(5900, 1750, 100, 50, {isStatic: true}))
    for(i=4850;i<5850;i+=15){
        world2Objects.push(Matter.Bodies.rectangle(i, 1620, 10, 60))
    }
    let bBlock = Bodies.rectangle(4800, 1660, 60, 60)
    world2Objects.push(bBlock)
    let cradle = Composites.newtonsCradle(3780, 800, 10, 50, 200)
    Body.translate(cradle.bodies[0], { x: -209, y: -80 });
    world2Objects.push(cradle)
    world2Objects.push(Bodies.rectangle(3290, 1160, 50, 600, {isStatic: true}))
    let superDab = Bodies.rectangle(3290, 600, 550, 20)
    world2Objects.push(superDab)
    world2Objects.push(Bodies.rectangle(2900, 1760, 1200, 50, {isStatic: true}))
    world2Objects.push(Bodies.rectangle(1700, 2390, 2000, 50, {isStatic: true}))
    for(i=1580;i<2000;i+=40){
        world2Objects.push(Matter.Bodies.rectangle(i, 1620, 20, 550))
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
            if(startBall.position.x > baseRamp.position.x + 850){
                Matter.Body.setVelocity(startBall, {x: 17, y: -5})
                startBall.restitution = 0
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
                Matter.Body.setVelocity(dominoBox, {x: 5, y: 0})
                bool2 = false
            }
        }
        if(bool3){
            if(superSquare.position.x > baseRamp.position.x + 4065){    //4115
                Matter.Body.setVelocity(superSquare, {x: 20, y: -20})
                Matter.Body.setVelocity(transCircle, {x: 5, y: 0})
                Body.setStatic(brokenObject, false)
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
            if(bBlock.position.y > baseRamp.position.x + 1753){           //1800
                Matter.Body.setVelocity(bBlock, {x: 0, y: -73})
                Matter.Body.setVelocity(superDab, {x: -20, y: 0})
                Body.translate(cradle.bodies[0], { x: -209, y: -90 });
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
            if(finalCircle.position.x > (baseRamp.position.x + 710) && (finalCircle.position.y < (baseRamp.position.x + 1820) && finalCircle.position.y > (baseRamp.position.x + 1500))){   //770    1850   1550
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
                //worldAdd(Bodies.circle((baseRamp.position.x + 6250) , (baseRamp.position.x + 570) , 100, {density: 0.01, friction: 0.0001, frictionAir: 0.00001, isStatic: true}))    //6300      620
                Matter.Body.setVelocity(newBall, {x: 45, y: -18})
                world2Objects.forEach(element => Matter.World.remove(world, element))
                bool11=false
                runNext();
            }
        }
        if(bool12){
            if(newBall2.position.x > (baseRamp.position.x + 830) ){      //880
                Matter.Body.translate(newBall2, {x: 5500, y: -40})
                Matter.Body.setVelocity(newBall2, {x: 10, y: 0})
                relTimeout(function() {
                    Matter.Body.setVelocity(newBall2, {x: 15, y: 0})
                }, 1000)
                // newBall2.position.x += 5500
                // newBall2.position.y -= 250

                bool12=false
            }
        }
    })
}

let blowUpFinal;
/**
 * Gonzalez Module 2
 **/
function gonzalezM2Init(data) {
    let world = data.world;
    let engine = data.engine;
    //Just a nice simple function, not required
    function worldAdd(obj) {
        World.add(world, obj)
    }
    let barrierColor = "#090909"
    let barrier2Color = "#ff8300"
    let barrier3Color = "#cd2020"
    let objectColor = "#224b88"


    function createBall(x, y, r, d) {
        if (!d) {
            d = 0.005;
        }
        let c = Bodies.circle(x, y, r, {
            friction: 0,
            restitution: 0.45,
            density: d,
            render: {
                fillStyle: objectColor,
            }
        })

        worldAdd(c)
        return c
    }


    function createSquare(x, y, s, d) {
        if (!d) {
            d = 0.005;
        }
        let c = Bodies.rectangle(x, y, s, s, {
            friction: 0,
            restitution: 0.45,
            density: d,
            render: {
                fillStyle: objectColor,
            }
        })

        worldAdd(c)
        return c
    }

    function createDropShoot(x, y, r, h) {
        createBall(x, y - h, r)
        worldAdd(Bodies.rectangle(x - (r) - 15, y - (h * 0.5), 10, h, {
            isStatic: true,
            render: {
                fillStyle: barrierColor,
            }
        }))
        worldAdd(Bodies.rectangle(x + (r) + 15, y - (h * 0.5), 10, h, {
            isStatic: true,
            render: {
                fillStyle: barrierColor,
            }
        }))
    }

    function createBin(x, y, w, h, t) {
        worldAdd(Bodies.rectangle(x, y + (h * 0.5), t, h, {
            isStatic: true,
            render: {
                fillStyle: barrierColor
            }
        }))
        let bottom = Bodies.rectangle(x + (w * 0.5), y + h, w + (t), t, {
            isStatic: true,
            render: {
                fillStyle: barrierColor
            }
        })
        worldAdd(bottom)
        worldAdd(Bodies.rectangle(x + w, y + (h * 0.5), t, h, {
            isStatic: true,
            render: {
                fillStyle: barrierColor
            }
        }))

        return bottom
    }

    function createLever(x, y, w, h, d) {
        if (!d) {
            d = 0.001;
        }
        let rect = Bodies.rectangle(x, y, w, h, {
            chamfer: h / 3,
            density: d,
            render: {
                fillStyle: barrier2Color,
            },
        })
        let constraint = Constraint.create({
            bodyA: rect,
            pointB: Matter.Vector.create(x, y),
            stiffness: 1,
            length: 0
        })

        worldAdd([constraint, rect])
    }

    function createSpring(x, y, w, h, power) {
        let trampoline = Bodies.rectangle(x, y, w, h, {
            render: {
                fillStyle: barrierColor,
            },
        })

        let leftConstraint = Constraint.create({
            bodyA: trampoline,
            pointA: Vector.create(-(w * 0.5), 0),
            pointB: Vector.add(Vector.create(-(w * 0.5), -(w * 0.5)), Matter.Vector.create(trampoline.position.x, trampoline.position.y)),
            stiffness: 0.001,
        })

        let rightConstraint = Constraint.create({
            bodyA: trampoline,
            pointA: Vector.create((w * 0.5), 0),
            pointB: Vector.add(Vector.create((w * 0.5), -(w * 0.5)), Matter.Vector.create(trampoline.position.x, trampoline.position.y)),
            stiffness: 0.001,
        })

        worldAdd([trampoline, leftConstraint, rightConstraint])

        Events.on(engine, "collisionStart", function (data) {
            let pairs = data.pairs;
            if (pairs && pairs.length > 0) {
                for (let j = 0; j < pairs.length; j++) {
                    let on = pairs[j];
                    if (on.bodyB.id === trampoline.id) {
                        Body.setVelocity(on.bodyA, Vector.add(Vector.create(10 * power, -50 * power), Vector.clone(on.bodyA.velocity)))
                    }
                }
            }
        })
    }

    function createLauncher(x, y, w, h, power) {
        let trampoline = Bodies.rectangle(x, y, w, h, {
            isStatic: true,
            render: {
                fillStyle: barrierColor,
            },
        })

        worldAdd(trampoline)

        Events.on(engine, "collisionStart", function (data) {
            let pairs = data.pairs;
            if (pairs && pairs.length > 0) {
                for (let j = 0; j < pairs.length; j++) {
                    let on = pairs[j];
                    if (on.bodyB.id === trampoline.id) {
                        Body.setVelocity(on.bodyA, Vector.create(0, -power))
                    }
                }
            }
        })
    }

    function createCar(x, y, scale, d) {
        if (!scale) {
            scale = 1;
        }
        if (!d) {
            d = 0.01;
        }
        //Create a collision group for the car so that the body and wheels don't collide (they can exist inside each other with glitching out)
        let collisionGroup = Body.nextGroup(true); //Create a group where participants don't collide with each other

        //Now, to make a car, we need 2 sets of wheels
        let wheel1 = Bodies.circle(x - (50 * scale), y, 25 * scale, { //(350, 250) center, radius 25
            collisionFilter: { group: collisionGroup }, //Add to collision group
            friction: 0.025, //Half the normal friction for these car wheels
            density: d,
            render: {
                fillStyle: "#000000",
            }
        });
        let wheel2 = Bodies.circle(x + (50 * scale), y, 25 * scale, {
            collisionFilter: { group: collisionGroup }, //Add to collision group
            friction: 0.025, //Half the normal friction for these car wheels
            density: d,
            render: {
                fillStyle: "#000000",
            }
        });

        //And a body for the car (the wheels need something to connect to)
        let carBody = Bodies.rectangle(x, y, 150 * scale, 25 * scale, {
            collisionFilter: { group: collisionGroup }, //Add to collision group
            density: d,
            render: {
                fillStyle: "#ac3333",
            },
            chamfer: 15,
        });

        //This is a little complicated, so remember you can mess around with the numbers and see what happens. Have fun!
        //Create a constraint
        let wheel1Constraint = Constraint.create({
            bodyA: carBody, //Between the car's body
            bodyB: wheel1, //And the wheel
            pointA: Vector.create(-50 * scale, 0), //50 pixels to the left of the center of the car (which ends up being where the wheel is)
            //You don't have to specify pointB because it defaults to the center of the wheel, which is where we want it
            //The length defaults to 0 since it is generated off the original positions of the bodies
        });

        //Create another constraint
        let wheel2Constraint = Constraint.create({
            bodyA: carBody, //Between the car's body
            bodyB: wheel2, //And the wheel
            pointA: Vector.create(50 * scale, 0), //50 pixels to the right of the center of the car (which ends up being where the wheel is)
            //You don't have to specify pointB because it defaults to the center of the wheel, which is where we want it
            //The length defaults to 0 since it is generated off the original positions of the bodies
        });

        World.add(world, [wheel1, wheel2, carBody, wheel1Constraint, wheel2Constraint]) //Add both wheels, the car body, and the constraints to world
        return [wheel1, wheel2, carBody];
    }

    //Takes input and subtracts offset absolutely. For example, (11, 2) => 9 & (-11, 2) => -9
    function absoluteSubtraction(input, offset) {
        if (input < 0) {
            return input + offset
        }
        return input - offset;
    }

    function createLineFromVertices(startX, startY, thickness, powered, vertices, sensors) {
        if (!sensors) {
            sensors = false;
        }
        let onX = startX;
        let onY = startY;

        let last;

        for (let i = 0; i < vertices.length; i++) {
            let on = vertices[i];
            onX += on[0] * 0.5;
            onY += on[1] * 0.5;

            let width = (on[0] === 0) ? thickness : absoluteSubtraction(on[0], -thickness + 5)
            let height = (on[1] === 0) ? thickness : absoluteSubtraction(on[1], -thickness + 5)

            let obj = Bodies.rectangle(onX, onY, width, height, {
                isStatic: true,
                isSensor: sensors,
                render: {
                    fillStyle: barrierColor,
                },
            })

            last = obj;

            worldAdd(obj)

            if (powered) {
                function callback(data) {
                    let pairs = data.pairs;
                    if (pairs && pairs.length > 0) {
                        for (let j = 0; j < pairs.length; j++) {
                            let on = pairs[j];
                            if (on.bodyB.id === obj.id) {
                                let vertex = vertices[i];
                                let x1 = 0;
                                let y1 = 0;
                                let isX = false;
                                if (vertex[0] > 0) {
                                    x1 = powered;
                                    isX = true;
                                } else if (vertex[0] < 0) {
                                    x1 = -powered;
                                    isX = true;
                                } else if (vertex[1] > 0) {
                                    y1 = powered;
                                } else if (vertex[1] < 0) {
                                    y1 = -powered;
                                }

                                Body.setVelocity(on.bodyA, Vector.create((isX) ? x1 : on.bodyA.velocity.x, (isX) ? on.bodyA.velocity.y : y1))
                            }
                        }
                    }
                }
                Events.on(engine, "collisionStart", callback)
                Events.on(engine, "collisionActive", callback)
            }

            onX += on[0] * 0.5;
            onY += on[1] * 0.5;
        }

        return last;
    }

    // //Returns true if turn is right
    // function directionTurn(vector1, vector2) {
    //     //Could be simplified, but it works
    //     if (vector1[0] > 0) {
    //         //=====>
    //         return vector2[1] > 0;
    //     } else if (vector1[0] < 0) {
    //         //<=====
    //         return vector2[1] < 0;
    //     } else if(vector2[0] > 0) {
    //         // |
    //         // |
    //         // V
    //         return vector2[0] < 0;
    //     } else if (vector2[0] < 0) {
    //         // ^
    //         // |
    //         // |
    //         return vector2[0] > 0;
    //     }
    // }

    // function createPipeFromVertices(startX, startY, thickness, depth, initOffset, typeIs, vertices) {
    //     createLineFromVertices(startX, startY, thickness, vertices)
    //     let secondPair = [];
    //     for (let i = 0; i < vertices.length; i++) {
    //         secondPair[i] = [vertices[i][0], vertices[i][1]]
    //     }
    //
    //     let lastDir = null;
    //     let lastTurn = null;
    //     for (let i = 0; i < secondPair.length; i++) {
    //         let on = secondPair[i];
    //         let isX = on[0] !== 0;
    //
    //         let subtract = depth;
    //         if (lastDir != null) {
    //             let thisTurn = directionTurn(lastDir, on)
    //             if (i !== secondPair.length - 1) {
    //                 let nextTurn = directionTurn(on, secondPair[i + 1])
    //                 if (thisTurn === nextTurn) {
    //                     subtract = depth * 2;
    //                     if (typeIs === thisTurn) {
    //                         subtract = 0;
    //                     }
    //                 } else {
    //                     subtract = 0;
    //                     if (typeIs === thisTurn) {
    //                         subtract = depth * 2;
    //                     }
    //                 }
    //             }
    //             lastTurn = thisTurn;
    //         }
    //
    //         if (isX) {
    //             on[0] = absoluteSubtraction(on[0], subtract)
    //         } else {
    //             on[1] = absoluteSubtraction(on[1], subtract)
    //         }
    //
    //         lastDir = [on[0], on[1]];
    //     }
    //
    //     createLineFromVertices(startX + initOffset[0], startY + initOffset[1], thickness, secondPair)
    // }

    function createCurve(sx, sy, l, t, startA, finishA, isUp) {
        let stored = null;
        let x = sx;
        let y = -sy;

        let start = startA + 90;
        let finish = finishA + 90;
        let incr = 1;

        if (isUp) {
            start = -startA + 90;
            finish = -finishA + 90;
            incr = -1;
        }

        incr *= ((finishA - startA) / (l))

        for (let i = start; ((!isUp) ? (i <= finish) : (i >= finish)); i += incr) {
            let rect = Bodies.rectangle(x, -y, t, t, {
                isStatic: true,
                angle: (i) * (Math.PI / 180),
                render: {
                    fillStyle: barrierColor,
                },
            })
            worldAdd(rect)

            if (!stored) {
                stored = rect;
            }

            x += (t * Math.sin(i * (Math.PI / 180))) * 0.5
            y += (t * Math.cos(i * (Math.PI / 180))) * 0.5
        }
        return stored;
    }

    function createSpinner(x, y, radius) {
        let giantWheel = Bodies.circle(x, y, radius * (1/6), {
            render: {
                fillStyle: "#5a2727",
            },
            density: 0.00025,
        })
        let rectangle1 = Bodies.rectangle(x, y, radius * 2, radius * (1 / 8),{
            render: {
                fillStyle: "#a43333",
            },
            density: 0.00025,
        })
        let rectangle2 = Bodies.rectangle(x, y, radius * (1 / 8), radius * 2,{
            render: {
                fillStyle: "#a43333",
            },
            density: 0.00025,
        })

        let combinedWheel = Body.create({
            parts: [giantWheel, rectangle1, rectangle2]
        })

        let constraintForGiantWheel = Constraint.create({
            bodyA: combinedWheel,
            pointB: Matter.Vector.clone(combinedWheel.position)
        })

        worldAdd([combinedWheel, constraintForGiantWheel])
    }


    let ball = createBall(280, 50, 30)

    let blocker = Bodies.rectangle(280, 100, 5, 5, {
        isStatic: true,
        render: {
            fillStyle: barrierColor,
        },
    })
    worldAdd(blocker)

    blowUpFinal = function() {
        blocker.show = function() {
            push()
            noStroke();
            fill("#ff8700")
            circle(this.position.x, this.position.y, 20)
            pop()
        }
        relTimeout(function() {
            World.remove(world, blocker)
        }, 100)

    }


    for (let y = 0; y < 5; y++) {
        let offset2 = (y % 2 === 0) ? -35 : 35
        for (let x = 0; x < 2; x++) {
            let offset1 = (x % 2 === 0) ? -35 : 35
            createSpinner(300 + (x * 204) + offset2, 300 + (y * 204) +  offset1, 100)
        }
    }

    worldAdd(Bodies.rectangle(400, 1800, 1000, 15, {
        isStatic: true,
        angle: (75) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    createSpring(625, 2300, 200, 15, 1)

    createLever(2150, 2000, 1000, 15)



    let ball1 = createBall(2675, 1500, 50)

    worldAdd(Bodies.rectangle(2675, 2000, 15, 15, {
        isStatic: true,
        render: {
            fillStyle: barrierColor,
        },
    }))

    worldAdd(Bodies.rectangle(3050, 3500, 3000, 15, {
        isStatic: true,
        angle: (75) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    let firstPart = createCurve(3440, 4956, 400, 15, -75, -30, true, 15)

    let allBalls;
    let count = 0;
    function handlerForExpand(data) {
        let pairs = data.pairs;
        if (pairs && pairs.length > 0) {
            for (let j = 0; j < pairs.length; j++) {
                let on = pairs[j];
                if (on.bodyA.id === ball1.id && ball1.position.y > firstPart.position.y - 2000) {
                    if (count === 10) {
                        let balls = Composites.stack(ball1.position.x - 30, ball1.position.y - 30, 10, 10, 0, 0, function(xx, yy) {
                            let obj = Bodies.circle(xx, yy, 5, {
                                restitution: 0.5,
                                density: 0.002,
                            })
                            Body.setVelocity(obj, Vector.clone(ball1.velocity))
                            return obj
                        })
                        worldAdd(balls)
                        allBalls = balls;
                        World.remove(world, ball1)
                    }
                    ball1.show = function() {
                        push()
                        noStroke();
                        fill("#ff8700")
                        circle(this.position.x, this.position.y, this.circleRadius * 2)
                        pop()
                    }
                    count++;
                    break
                }
            }
        }
    }
    Events.on(engine, "collisionStart", handlerForExpand)
    Events.on(engine, "collisionActive", handlerForExpand)

    worldAdd(Bodies.rectangle(3050, 3500, 3000, 15, {
        isStatic: true,
        angle: (75) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    createLever(4600, 7500, 2500, 15)


    let remover = Bodies.rectangle(6000, 9000, 2000, 50, {
        isStatic: true,
        render: {
            opacity: 0,
        },
    })

    worldAdd(remover)

    let count5 = 0;
    Events.on(engine, "collisionStart", function (data) {
        let pairs = data.pairs;
        if (pairs && pairs.length > 0) {
            for (let j = 0; j < pairs.length; j++) {
                let on = pairs[j];
                if (on.bodyA.id === remover.id) {
                    count5++;
                    if (count5 === 150) {
                        World.remove(world, allBalls)
                    }
                }
            }
        }
    })

    worldAdd(Bodies.rectangle(3050, 7450, 25, 25, {
        isStatic: true,
        density: 0.0005,
        render: {
            fillStyle: barrierColor,
        },
    }))

    worldAdd(Bodies.rectangle(3050, 7350, 750, 25, {
        density: 0.0005,
        render: {
            fillStyle: barrier3Color,
        },
    }))

    worldAdd(Composites.pyramid(3050 - (0.5 * 15 * (25 + 0)), 7050, 15, 15, 0, 0, function(xx, yy) {
        return Bodies.rectangle(xx, yy, 25, 25, {
            density: 0.00005,
        })
    }))

    worldAdd(Bodies.rectangle(2650, 9000, 2000, 15, {
        isStatic: true,
        angle: (75) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    createCurve(2910, 9970, 200, 15, -75, -25, true)

    createBin(3900, 11015, 500, -500, 15)

    let bottom = Bodies.rectangle(4150, 11035, 600, 15, {
        render: {
            fillStyle: barrier3Color,
        },
    })

    for (let i = 0; i < 2; i++) {
        let offset = (i % 2 === 0) ? -250 : 250
        worldAdd(Bodies.rectangle(4150 + offset, 11050, 15, 15, {
            isStatic: true,
            render: {
                fillStyle: barrierColor,
            },
        }))
    }

    worldAdd(bottom)

    let counter = 1;
    Events.on(engine, "collisionStart", function (data) {
        let pairs = data.pairs;
        if (pairs && pairs.length > 0) {
            for (let j = 0; j < pairs.length; j++) {
                let on = pairs[j];
                if (on.bodyB.id === bottom.id) {
                    if (counter === 2) {
                        Body.setVelocity(bottom, Vector.add(Vector.create(50, 0), Vector.clone(bottom.velocity)))
                        relTimeout(function() {
                            World.remove(world, bottom)
                        }, 2500)
                    }
                    counter++;
                }
            }
        }
    })

    worldAdd(Composites.stack(3900 + 15, 9970 + 15 + 550, 5, 5, 10, 10,function(xx, yy) {
        return Bodies.circle(xx, yy, 45, {
            // isStatic: true,
            density: 0.0001,
        })
    }))

    worldAdd(Bodies.rectangle(3860, 11090, 75, 15, {
        isStatic: true,
        angle: (-25) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    worldAdd(Bodies.rectangle(5000, 12200, 3000, 15, {
        isStatic: true,
        angle: (45) * (Math.PI / 180),
        render: {
            fillStyle: barrierColor,
        },
    }))

    worldAdd(Bodies.rectangle(6181, 13258, 250, 15, {
        isStatic: true,
        render: {
            fillStyle: barrierColor,
        },
    }))


    let w = 100;
    let x = 6100,
        y = 13000 - w;
    let d = 130;
    let d2 = d*2;
    createLineFromVertices(x, y, 35,  30,
        [[0, -400], [800, 0], [0, 900], [-300, 0], [0, 200], [200, 0], [0, 400], [-300, 0], [0, 500], [900, 0], [0, -1000], [500, 0], [0, -200], [700, 0], [0, -2000]])

    //I attempted to write an equation to solve this, but after an hour decided manually doing it was much faster
    createLineFromVertices(x + d, y, 35,  30,
        [[0, -400 + d], [800 - d2, 0], [0, 900 - d2], [-300, 0], [0, 200 + d2], [200, 0], [0, 400 - d2], [-300, 0], [0, 500 + d2], [900 + d2, 0], [0, -1000], [500, 0], [0, -200], [700, 0], [0, -2000 - d]])

    let sensor = createLineFromVertices(x + (d * 0.5) + 5, y + 290 + w, 50, 30,
        [[0, -290 - w]])
    sensor.render.opacity = 0;
    sensor.isSensor = true;


    let wall = createLineFromVertices(x + d, y + 290 + w, 35, false,
        [[0, -290 - w]])
    wall.render.opacity = 0;

    let antigrav = Bodies.rectangle(8665, 11500, 100, 100, {
        isStatic: true,
        render: {
            fillStyle: barrierColor,
        },
    })
    antigrav.isSensor = true;

    let antiGravs = {}
    antigrav.show = function() {
        //instead of showing, just give antigrav
        for (const [key, value] of Object.entries(antiGravs)) {
            let body = Composite.get(world, parseInt(key), 'body')
            let multi = 1;
            if (body.position.y < antigrav.position.y - 3000) {
                multi = 3;
            }

            let gravity = engine.world.gravity;
            //Remove gravity
            Body.applyForce(body, body.position, {
                x: -gravity.x * gravity.scale * body.mass,
                y: -gravity.y * gravity.scale * body.mass
            });

            //Apply small upwards force
            Body.applyForce(body, body.position, Vector.create(
                0,
                -0.0005 * multi,
            ))
        }
    }
    Events.on(engine, "collisionStart", function (data) {
        let pairs = data.pairs;
        if (pairs && pairs.length > 0) {
            for (let j = 0; j < pairs.length; j++) {
                let on = pairs[j];
                if (on.bodyB.id === antigrav.id && !antiGravs[on.bodyA.id]) {
                    antiGravs[on.bodyA.id] = true;
                }
            }
        }
    })
    worldAdd(antigrav)

    for (let i = 0; i < 7; i++) {
        let off = (i % 2 === 0) ? -200 : 200;
        createSpinner(8670 + off, 10500 - (i * 300), 200)
    }

    for (let i = 0; i < 2; i++) {
        let multi = (i % 2 === 0) ? -1 : 1
        worldAdd(Bodies.rectangle(8665 - (414 * multi), 10943, 1000, 35, {
            isSensor: true,
            isStatic: true,
            angle: (45 * multi) * (Math.PI / 180),
            render: {
                fillStyle: barrierColor,
            },
        }))
        worldAdd(Bodies.rectangle(8665 - (763 * multi), 9352, 35, 2500, {
            isStatic: true,
            render: {
                fillStyle: barrierColor,
            },
        }))
    }

    createLever(9428 + 1000, 8080, 3200 + 2000, 35, 0.0001)

    createCar(9000, 7000, 3, 0.0001)


    let group = Body.nextGroup(true)

    let vector1 = Matter.Vector.create(125, 0)
    let lx = 12850,
        ly = 9000
    let lever = Bodies.rectangle(lx, ly, 250, 15, {
        render: {
            fillStyle: barrierColor,
        },
        collisionFilter: {
            group: group,
        }
    })
    let constraint = Constraint.create({
        bodyA: lever,
        pointA: vector1,
        pointB: Vector.add(vector1, Vector.clone(lever.position)),
        stiffness: 1,
        length: 0,
    })

    let leverp2 = Bodies.circle(lx, ly, 40,{
        render: {
            fillStyle: "#c82a2a",
        },
        collisionFilter: {
            group: group,
        }
    })
    let constraint2 = Constraint.create({
        bodyA: lever,
        bodyB: leverp2,
        pointA: Vector.create(-125, 0),
        stiffness: 1,
        length: 0,
    })

    worldAdd([constraint, lever, constraint2, leverp2])

    Body.setVelocity(lever, Vector.create(0, -150))

    relTimeout(function() {
        Body.setStatic(lever, true)
    }, 100)

    for (let i = 0; i < 2; i++) {
        worldAdd(Bodies.rectangle(lx + 130 + (i * 1000), ly, 40, 500 + 40, {
            isStatic: true,
            render: {
                fillStyle: "#1d1d1d",
            },
            collisionFilter: {
                group: group,
            }
        }))
        worldAdd(Bodies.rectangle(lx + 130 + 500, ly - 250 + (i * 500), 1000 + 40, 40, {
            isStatic: true,
            render: {
                fillStyle: "#1d1d1d",
            },
            collisionFilter: {
                group: group,
            }
        }))
    }
    let screen = Bodies.rectangle(lx + 130 + 500, ly, 1000 - 20, 500 - 20, {
        isStatic: true,
        render: {
            fillStyle: "#000000",
        },
        collisionFilter: {
            group: group,
        }
    })
    worldAdd(screen)
    let stext = Bodies.rectangle(lx + 130 + 500, ly, 5, 5, {
        isStatic: true,
        render: {
            opacity: 0
        },
        collisionFilter: {
            group: group,
        }
    })
    worldAdd(stext);

    let lit = false; //it's lit
    let already = false;
    Events.on(engine, "collisionStart", function (data) {
        if (already) {
            return
        }
        let pairs = data.pairs;
        if (pairs && pairs.length > 0) {
            for (let j = 0; j < pairs.length; j++) {
                let on = pairs[j];
                if (on.bodyB.id === leverp2.id && on.bodyA.id !== lever.id) {
                    already = true;
                    Body.setStatic(lever,false)
                    relTimeout(function() {
                        Body.setStatic(lever,true)
                        screen.render.fillStyle = "#1a65f5"
                        relTimeout(function() {
                            let count = 0;
                            stext.show = function() {
                                push()
                                fill("#ffffff")
                                textFont("Arial");
                                textStyle(BOLD);
                                textAlign(CENTER, CENTER);
                                textSize(100);
                                count++;
                                let num = Math.floor(count / 35)
                                let t = "Loading." + (".".repeat(num))
                                if (num > 6) {
                                    t = "Systems ONLINE"
                                }
                                text(t, this.position.x, this.position.y)
                                pop()
                            }
                        }, 500)

                        relTimeout(function() {
                            lit = true;
                        }, 10 * 1000)
                    }, 800)
                }
            }
        }
    })

    createLineFromVertices(lx + 130 + 1000 + 25, ly - 250 + 250, 15,  false,
        [[600, 0],[0, -400], [800, 0], [0, 900], [-300, 0], [0, 200], [200, 0], [0, 400], [-300, 0], [0, 500], [900, 0], [0, -1000], [500, 0], [0, -200], [700, 0], [0, 4000],
            [500, 0], [0, 600], [-400, 0], [0, 500], [5450, 0], [0, -800]], true)

    let img = loadImage('tree1.png')

    let tree = Bodies.rectangle(20000, 9000, 35, 35, {
        isStatic: true,
    })

    let treeCount = 75;
    let dir = 2;
    let counterrr = 0;

    // snowflake class | Credit to Aatish Bhatia for snowflake motion equation
    let snowW = 1000;
    let snowH = 2000;
    let snowflakes = []
    function snowflake() {
        // initialize coordinates
        this.posX = 0;
        this.posY = random(-50, 0);
        this.initialangle = random(0, 2 * PI);
        this.size = random(2, 5);

        // radius of snowflake spiral
        // chosen so the snowflakes are uniformly spread out in area
        this.radius = sqrt(random(pow(snowW / 2, 2)));

        this.update = function(time) {
            // x position follows a circle
            let w = 0.6; // angular speed
            let angle = w * time + this.initialangle;
            this.posX = snowW / 2 + this.radius * sin(angle);

            // different size snowflakes fall at slightly different y speeds
            this.posY += pow(this.size, 0.5);

            // delete snowflake if past end of screen
            if (this.posY > snowH) {
                let index = snowflakes.indexOf(this);
                snowflakes.splice(index, 1);
            }
        };

        this.display = function() {
            noStroke();
            ellipse(this.posX, this.posY, this.size);
        };
    }

    tree.show = function() {
        if (!img) {
            return;
        }

        push()
        let v = 10;
        scale(v)

        if (lit) {
            counterrr++;
            if (counterrr % 20 === 0) {
                for (let i = 0; i < 30 + random(15); i++) {
                    snowflakes.push(new snowflake());
                }

            }

            treeCount += dir;
            if (treeCount > 255 && dir > 0) {
                treeCount = 255;
                dir = -0.75;
            } else if (treeCount < 200 && dir < 0) {
                treeCount = 200;
                dir = 0.75;
            }
            tint(Math.floor(treeCount))
        } else if (stext.show) {
            tint(75)
        }
        image(img, this.position.x / v, this.position.y / v)

        if (lit) {
            translate(1750, 600)
            for (let flake of snowflakes) {
                flake.update((1 / 60));
                flake.display();
            }
        }
        pop()
    }

    worldAdd(tree)
}
