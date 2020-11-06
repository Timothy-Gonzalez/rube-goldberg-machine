const baseW = 800, baseH = 450; //The base size to use for dynamic scaling
const windowW = window.innerWidth, windowH = window.innerHeight; //Define window height

const actualPadding = windowW * (0.005); //The padding to use on every side
const actualW = windowW - (actualPadding * 2); //The actual width to use
const actualH = windowH - (actualPadding * 2); //The actual height to use

function init() {
    //We can only setup the canvas once it loads in, so we need to do so in the init function
    const canvas = document.getElementById("canvas");

    //Define all required components, I.E. Engine is Matter.Engine, Render is Matter.Render, ect.
    let Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    let engine = Engine.create(),
        world = engine.world;

    // create renderer
    let render = Render.create({
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

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

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

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: {x: 0, y: 0},
        max: {x: baseW, y: baseH}
    });
}
