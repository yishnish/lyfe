function StatsDisplay(worldStats){
    var stats = createDisplayTable();
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

    function createThingRow(clazz){
        var thingName = clazz.name;
        var builder = new DisplayRowBuilder();
        return builder.createRow().addRowClass('stats-display-row')
            .addDataLabel(thingName + 's')
            .addData(thingName.toLowerCase() + '-count', worldStats.getTurnCount)
            .subscribe('thing-added', displayThingCount(clazz))
            .subscribe('thing-removed', displayThingCount(clazz))
            .subscribe('reset', resetThingCount(clazz))
            .build();
    }

    function createTurnsRow(){
        var builder = new DisplayRowBuilder();
        return builder.createRow().addRowClass('stats-display-row')
            .addDataLabel('Turns')
            .addData('turns-count', worldStats.getTurnCount)
            .subscribe('turn-stats-updated', displayTurnCount)
            .subscribe('reset', displayTurnCount)
            .build();
    }

    function createTotalRow(){
        var builder = new DisplayRowBuilder();
        return builder.createRow().addRowClass('stats-display-row')
            .addDataLabel('Total')
            .addData('total-count', getTotals)
            .subscribe('turn-stats-updated', displayTotals)
            .subscribe('thing-added', displayTotals)
            .subscribe('reset', displayTotals)
            .build();
    }

    function displayThingCount(clazz){
        return function(addedThing){
            if(addedThing.getClazz() === clazz){
                this.displayDataElement.innerHTML = worldStats.getThingCount(clazz);
            }
        };
    }

    function resetThingCount(clazz){
        return function(){
            this.displayDataElement.innerHTML = worldStats.getThingCount(clazz);
        };
    }

    function displayTurnCount(){
        this.displayDataElement.innerHTML = worldStats.getTurnCount();
    }

    function displayTotals(){
        this.displayDataElement.innerHTML = getTotals();
    }

    function getTotals(){
        var total = 0;
        [Cow, Civet, Wolf, PolarBear, FruitBush].forEach(function(thingClass){
            total += worldStats.getThingCount(thingClass);
        });
        return total;
    }

    function createDisplayTable(){
        var table = document.createElement("table");
        table.classList.add('stats-display');
        return table;
    }
}

function DisplayRowBuilder(){
    var pubsub = PubSub();

    return {
        createRow: function(){
            this.row = document.createElement('tr');
            return this;
        },
        addRowClass: function(classToAdd){
            this.row.classList.add(classToAdd);
            return this;
        },
        addDataLabel: function(label){
            this.label = document.createElement("td");
            this.label.classList.add(label + '-color');
            this.label.innerHTML = label + ": ";
            return this;
        },
        addData: function(id, dataGetter){
            this.rowData = document.createElement("td");
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