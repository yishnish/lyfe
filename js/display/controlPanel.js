var ControlPanel = function(){

    var paused = true,
        pubsub = PubSub(),
        world, display, turnFunction;

    function clearWorld_soRemovalEventsGetFired(){
        world.clear();
    }

    function resetWorld(){
        clearWorld_soRemovalEventsGetFired();
        createAndShowWorld();
    }

    function createWorld(){
        var dataGrid = createGrid();
        world = new World(dataGrid);
    }

    function displayWorld(){
        var viz = new Visualizer(world, ColorMapping);
        display = viz.getDisplay();
        var spotForWorld = document.getElementById("world-goes-here");
        spotForWorld.innerHTML = null;
        spotForWorld.appendChild(display);
    }

    function startWorld(){
        window.clearInterval(turnFunction);
        turnFunction = window.setInterval(function(){
            world.turn();
        }, getTickRate());
    }

    function createAndShowWorld(){
        createWorld();
        displayWorld();
    }

    function createGrid(){
        var makers = [function(){
            return new Cow();
        }, function(){
            return new Wolf();
        }, function(){
            return new PolarBear();
        }, function(){
            return new FruitBush();
        }, function(){
            return new Civet();
        }];
        var grid = [];
        for(var i = 0; i < 75; i++){
            var row = [];
            for(var j = 0; j < 75; j++){
                row.push(null);
            }
            grid.push(row);
        }
        for(var k = 0; k < 10; k++){
            for(var l = 0; l < 10; l++){
                grid[k][l] = makers[Math.floor(Math.random() * makers.length)]();
            }
        }

        return grid;
    }

    function getTickRate(){
        var slider = document.getElementById("speed");
        return slider.value;
    }

    function pauseWorld(){
        window.clearInterval(turnFunction);
    }

    return {
        isPaused: function(){
            return paused;
        },
        addResetButton: function(){
            var startButton = document.getElementById("start");
            startButton.innerText = "Reset";
            startButton.onclick = function(){
                pubsub.publish('reset');
                resetWorld();
            };
        },
        addPauseButton: function(){
            var pauseButton = document.getElementById("pause");
            pauseButton.innerText = "Start";
            pauseButton.onclick = function(){
                pauseWorld();
                paused = !paused;
                if(!paused){
                    startWorld();
                }
                pauseButton.innerText = paused ? "Start" : "Pause";
            };
        },
        addSpeedSlider: function(){
            var slider = document.getElementById("speed");
            slider.onchange = function(){
                if(!paused){
                    window.clearInterval(turnFunction);
                    turnFunction = window.setInterval(function(){
                        world.turn();
                    }, slider.value);
                }
            };
        },
        addWorldStats: function(){
            document.getElementById("world-stats").appendChild(new StatsDisplay(new WorldStats()).getDisplay());
        },
        createAndStartWorld: createAndShowWorld
    };
};