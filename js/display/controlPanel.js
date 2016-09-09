function ControlPanel(){
    this.paused = true;
    this.pubsub = PubSub();
    this.world = null;
    this.turnFunction = null;
}

(function(){

    ControlPanel.prototype.addResetButton = function(){
        var startButton = document.getElementById("start");
        startButton.innerText = "Reset";
        startButton.onclick = function(){
            this.pubsub.publish('reset');
            this.world = resetWorld(this.world);
            if(!this.paused){
                this.startWorld();
            }
        }.bind(this);
    };

    ControlPanel.prototype.addPauseButton = function(){
        var pauseButton = document.getElementById("pause");
        pauseButton.innerText = "Start";
        pauseButton.onclick = function(){
            this.pauseWorld();
            this.paused = !this.paused;
            if(!this.paused){
                this.startWorld();
            }
            pauseButton.innerText = this.paused ? "Start" : "Pause";
        }.bind(this);
    };

    ControlPanel.prototype.addSpeedSlider = function(){
        var slider = document.getElementById("speed");
        slider.onchange = function(){
            if(!this.paused){
                window.clearInterval(this.turnFunction);
                this.turnFunction = window.setInterval(function(){
                    this.world.turn();
                }.bind(this), slider.value);
            }
        }.bind(this);
    };

    ControlPanel.prototype.addWorldStats = function(){
        document.getElementById("world-stats").appendChild(new StatsDisplay(new WorldStats()).getDisplay());
    };

    ControlPanel.prototype.startWorld = function(){
        window.clearInterval(this.turnFunction);
        this.turnFunction = window.setInterval(function(){
            this.world.turn();
        }.bind(this), getTickRate());
    };

    ControlPanel.prototype.pauseWorld = function(){
        window.clearInterval(this.turnFunction);
    };

    ControlPanel.prototype.createAndShowWorld = function(){
        this.world = createAndShowWorld();
    };

    function clearWorld_soRemovalEventsGetFired(world){
        world.clear();
    }

    function resetWorld(world){
        clearWorld_soRemovalEventsGetFired(world);
        return createAndShowWorld();
    }

    function createWorld(){
        return new World(createGrid());
    }

    function displayWorld(world){
        var viz = new Visualizer(world, ColorMapping());
        var display = viz.getDisplay();
        var spotForWorld = document.getElementById("world-goes-here");
        spotForWorld.innerHTML = null;
        spotForWorld.appendChild(display);
    }

    function createAndShowWorld(){
        var world = createWorld();
        displayWorld(world);

        return world;
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
})();
