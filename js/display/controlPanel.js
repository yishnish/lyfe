var ControlPanel = function () {
    var paused = true,
        world, display, turnFunction;

    createAndStartWorld();

    function createGrid(){
        var makers = [function () {
            return new Cow();
        }, function () {
            return new Wolf();
        }, function(){
            return new PolarBear();
        }, function(){
            return new FruitBush();
        }, function(){
            return new Civet();
        }];
        var grid = [];
        for(var i = 0; i < 75 ; i++) {
            var row = [];
            for(var j = 0; j < 75; j++) {
                row.push(null);
            }
            grid.push(row);
        }
        for(var k = 0; k < 10; k++) {
            for(var l = 0; l < 10; l++) {
                grid[k][l] = makers[Math.floor(Math.random() * makers.length)]();
            }
        }

        return grid;
    }

    function createAndStartWorld() {
        var dataGrid = createGrid();
        world = new World(dataGrid);
        var viz = new Visualizer(world, ColorMapping);
        var spotForWorld = document.getElementById("world-goes-here");
        display = viz.getDisplayHtml();
        spotForWorld.innerHTML = null;
        spotForWorld.appendChild(display);
        turnFunction = window.setInterval(function () {
            if (!paused) {
                world.turn();
            }
        }, 100);
    }

    return {
        isPaused: function () {
            return paused;
        },
        addStartButton: function () {
            var startButton = document.getElementById("start");
            startButton.innerText = "Refresh";
            startButton.onclick = function () {
                createAndStartWorld();
            };
        },
        addPauseButton: function () {
            var pauseButton = document.getElementById("pause");
            pauseButton.innerText = "Start";
            pauseButton.onclick = function () {
                paused = !paused;
                pauseButton.innerText = paused ? "Start" : "Pause";
            };
        },
        addSpeedSlider: function () {
            var slider = document.getElementById("speed");
            slider.onchange = function () {
                var rate = slider.value;
                console.log('rate: ' + rate);
                window.clearInterval(turnFunction);
                turnFunction = window.setInterval(function () {
                    if (!paused) {
                        world.turn();
                    }
                }, rate);
            };
        }
    };
};