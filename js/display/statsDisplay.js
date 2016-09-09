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
        var builder = new DisplayRowBuilder(worldStats);
        return builder.createRow().addRowClass('stats-display-row')
            .addDataLabel(thingName + 's')
            .addData(thingName.toLowerCase() + '-count', worldStats.getTurnCount)
            .subscribe('thing-added', builder.calculators.displayThingCount(clazz))
            .subscribe('thing-removed', builder.calculators.displayThingCount(clazz))
            .subscribe('reset', builder.calculators.resetThingCount(clazz))
            .build();
    }

    function createTurnsRow(){
        var builder = new DisplayRowBuilder(worldStats);
        return builder.createRow().addRowClass('stats-display-row')
            .addDataLabel('Turns')
            .addData('turns-count', worldStats.getTurnCount)
            .subscribe('turn-stats-updated', builder.calculators.displayTurnCount)
            .subscribe('reset', builder.calculators.displayTurnCount)
            .build();
    }

    function createTotalRow(){
        var builder = new DisplayRowBuilder(worldStats);
        return builder.createRow().addRowClass('stats-display-row')
            .addDataLabel('Total')
            .addData('total-count', builder.calculators.displayTotals)
            .subscribe('turn-stats-updated', builder.calculators.displayTotals)
            .subscribe('thing-added', builder.calculators.displayTotals)
            .subscribe('reset', builder.calculators.displayTotals)
            .build();
    }

    function createDisplayTable(){
        var table = document.createElement("table");
        table.classList.add('stats-display');
        return table;
    }
}

function DisplayRowBuilder(worldStats){
    var pubsub = PubSub();
    var row, rowLabel, rowData, displayDataElement;

    function getTotals(){
        var total = 0;
        [Cow, Civet, Wolf, PolarBear, FruitBush].forEach(function(thingClass){
            total += worldStats.getThingCount(thingClass);
        });
        return total;
    }

    return {
        createRow: function(){
            row = document.createElement('tr');
            return this;
        },
        addRowClass: function(classToAdd){
            row.classList.add(classToAdd);
            return this;
        },
        addDataLabel: function(label){
            rowLabel = document.createElement("td");
            rowLabel.classList.add(label + '-color');
            rowLabel.innerHTML = label + ": ";
            return this;
        },
        addData: function(id, dataGetter){
            rowData = document.createElement("td");
            displayDataElement = document.createElement("span");
            displayDataElement.setAttribute('id', id);
            displayDataElement.innerHTML = dataGetter();
            rowData.appendChild(displayDataElement);
            return this;
        },
        subscribe: function(event, fun){
            pubsub.subscribe(event, fun.bind(this));
            return this;
        },
        build: function(){
            row.appendChild(rowLabel);
            row.appendChild(rowData);
            return row;
        },
        calculators: {
            displayThingCount: function(clazz){
                return function(addedThing){
                    if(addedThing.getClazz() === clazz){
                        displayDataElement.innerHTML = worldStats.getThingCount(clazz);
                    }
                };
            },
            resetThingCount: function(clazz){
                return function(){
                    displayDataElement.innerHTML = worldStats.getThingCount(clazz);
                };
            },
            displayTurnCount: function(){
                displayDataElement.innerHTML = worldStats.getTurnCount();
            },
            displayTotals: function(){
                displayDataElement.innerHTML = getTotals();
            }
        }
    };
}