function StatsDisplay(worldStats){
    var stats = createDisplayList();
    stats.appendChild(createTurnsRow());
    stats.appendChild(createThingRow(Cow));
    stats.appendChild(createThingRow(Wolf));
    stats.appendChild(createThingRow(FruitBush));
    stats.appendChild(createThingRow(Civet));
    stats.appendChild(createThingRow(PolarBear));
    stats.appendChild(createTotalRow());

    this.getDisplay = function(){
        return stats;
    };

    function createThingRow(thing){
        var thingType = thing.name;
        var builder = new DisplayRowBuilder(worldStats);
        return builder.createRow().addRowClass('stats-display-row')
            .addDataLabel(thingType + 's')
            .addData(thingType.toLowerCase() + '-count', worldStats.getTurnCount)
            .subscribe('thing-added', function(addedThing){
                if(addedThing.getType() === thing){
                    this.displayDataElement.innerHTML = worldStats.getThingCount(thing);
                }
            })
            .subscribe('thing-removed', function(removedThing){
                if(removedThing.getType() === thing){
                    this.displayDataElement.innerHTML = worldStats.getThingCount(thing);
                }
            })
            .subscribe('reset', function(){
                this.displayDataElement.innerHTML = worldStats.getThingCount(thing);
            })
            .build();
    }

    function createTurnsRow(){
        var builder = new DisplayRowBuilder();
        return builder.createRow().addRowClass('stats-display-row')
            .addDataLabel('Turns')
            .addData('turns-count', worldStats.getTurnCount)
            .subscribe('turn-stats-updated', function(){
                this.displayDataElement.innerHTML = worldStats.getTurnCount();
            })
            .subscribe('reset', function(){
                this.displayDataElement.innerHTML = worldStats.getTurnCount();
            })
            .build();
    }

    function createTotalRow(){
        var builder = new DisplayRowBuilder();
        return builder.createRow().addRowClass('stats-display-row')
            .addDataLabel('Total')
            .addData('total-count', getTotals)
            .subscribe('turn-stats-updated', function(){
                this.displayDataElement.innerHTML = getTotals();
            })
            .subscribe('thing-added', function(){
                this.displayDataElement.innerHTML = getTotals();
            })
            .subscribe('reset', function(){
                this.displayDataElement.innerHTML = getTotals();
            })
            .build();
    }

    function getTotals(){
        var total = 0;
        [Cow, Civet, Wolf, PolarBear, FruitBush].forEach(function(thing){
            total += worldStats.getThingCount(thing);
        });
        return total;
    }

    function createDisplayList(){
        return document.createElement("ul");
    }
}

function DisplayRowBuilder(){
    var pubsub = PubSub();

    return {
        createRow: function(){
            this.row = document.createElement('li');
            return this;
        },
        addRowClass: function(classToAdd){
            this.row.classList.add(classToAdd);
            return this;
        },
        addDataLabel: function(label){
            this.label = document.createElement("label");
            this.label.innerHTML = label + ": ";
            this.label.setAttribute('for', label + '-count');
            return this;
        },
        addData: function(id, dataGetter){
            this.rowData = document.createElement("span");
            this.displayDataElement = document.createElement("span");
            this.displayDataElement.setAttribute('id', id);
            this.displayDataElement.innerHTML = dataGetter();
            this.rowData.appendChild(this.displayDataElement);
            return this;
        },
        subscribe: function(event, fun){
            pubsub.subscribe(event, fun.bind(this));
            return this;
        },
        build: function(){
            this.row.appendChild(this.label);
            this.row.appendChild(this.rowData);
            return this.row;
        }
    };
}