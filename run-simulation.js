const baseW = 800, baseH = 450; //The base size to use for dynamic scaling
const windowW = window.innerWidth, windowH = window.innerHeight; //Define window height

const actualPadding = windowW * (0.005); //The padding to use on every side
const actualW = windowW - (actualPadding * 2); //The actual width to use
const actualH = windowH - (actualPadding * 2); //The actual height to use


//Define all required components, I.E. Engine is Matter.Engine, Render is Matter.Render, ect.
let Engine = Matter.Engine,
    Render = Matter.Render,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

let render, engine, world; //These need to be accessed outside of init


/* Camera Control */
let keys = {
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
}


let Camera = {
    //Define base camera x and y
    x: baseW * 0.5,
    y: baseH * 0.5,
    scale: 1,
};

//Centers at Camera.x, Camera.y, then applys scale factor of Camera.scale
function updateViewport() {
    let widthPad = baseW * 0.5 * Camera.scale;
    let heightPad = baseH * 0.5 * Camera.scale;
    Render.lookAt(render, {
        min: {x: Camera.x - widthPad, y: Camera.y - heightPad},
        max: {x: Camera.x + widthPad, y: Camera.y + heightPad},
    })
}
/*-----------------------------------------------------*/

//Initializes canvas with matter.js
function init() {
    //We can only setup the canvas once it loads in, so we need to do so in the init function
    const canvas = document.getElementById("canvas");


    // create engine
    engine = Engine.create(),
        world = engine.world;

    // create renderer
    render = Render.create({
        canvas: canvas,
        engine: engine,
        options: {
            width: actualW,
            height: actualH,
            wireframes: false, //Turn this to true for even more debugging
            showAngleIndicator: false, //When true, shows angle indicator, useful for debugging & such
        }
    });


    //Sets up the render to run every animation frame
    Render.run(render);

    //Create custom runner
    (function run() {
        window.requestAnimationFrame(run);

        //First fix camera
        let change = [0, 0];
        for (keyName in keys) {
            let keyData = keys[keyName];
            if (keyData.active) {
                change[0] += keyData.offset[0];
                change[1] += keyData.offset[1];
            }
        }
        //console.log(change)
        const timeAcrossScreen = 1; //Time it takes to go across one full screen
        let cameraSpeed = baseW * (1 / timeAcrossScreen / 60) * Camera.scale;

        if (change[0] !== 0 || change[1] !== 0) { //If camera is updated, change viewport
            Camera.x += change[0] * cameraSpeed;
            Camera.y += change[1] * cameraSpeed;
            updateViewport()
        }
        Engine.update(engine, 1000 / 60);
    })();

    // add bodies
    var stack = Composites.stack(20, 20, 10, 5, 0, 0, function (x, y) {
        var sides = Math.round(Common.random(1, 8));

        // triangles can be a little unstable, so avoid until fixed
        sides = (sides === 3) ? 4 : sides;

        // round the edges of some bodies
        var chamfer = null;
        if (sides > 2 && Common.random() > 0.7) {
            chamfer = {
                radius: 10
            };
        }

        switch (Math.round(Common.random(0, 1))) {
            case 0:
                if (Common.random() < 0.8) {
                    return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), {chamfer: chamfer});
                } else {
                    return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), {chamfer: chamfer});
                }
            case 1:
                return Bodies.polygon(x, y, sides, Common.random(25, 50), {chamfer: chamfer});
        }
    });

    World.add(world, stack);

    let thickness = 15;
    World.add(world, [
        // walls
        Bodies.rectangle(baseW * 0.5, thickness * 0.5, baseW, thickness, {isStatic: true}),
        Bodies.rectangle(baseW * 0.5, baseH - (thickness * 0.5), baseW, thickness, {isStatic: true}),
        Bodies.rectangle(baseW - (thickness * 0.5), baseH * 0.5, thickness, baseH, {isStatic: true}),
        Bodies.rectangle(thickness * 0.5, baseH * 0.75, thickness, baseH * 0.5, {isStatic: true})
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: true, //Set to true to see the mouse's force
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // Fit render camera
    updateViewport(Camera)
}

/* Detect inputs */

//Set key to pressed
function simpleKeyPress(key, pressed) {
    switch (key) {
        case 'w':
        case 'ArrowUp':
            keys.up.active = pressed;
            break;
        case 's':
        case 'ArrowDown':
            keys.down.active = pressed;
            break;
        case 'a':
        case 'ArrowLeft':
            keys.left.active = pressed;
            break;
        case 'd':
        case 'ArrowRight':
            keys.right.active = pressed;
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
            Camera.scale *= (1 / zoomThresh);
        } else {
            Camera.scale *= (zoomThresh);
        }
        updateViewport(Camera)
    }
})
