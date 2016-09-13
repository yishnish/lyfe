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
        var tdBuilder = new DisplayDataBuilder(worldStats);
        var column = tdBuilder.withId(thingName.toLowerCase() + '-count')
            .withInitialValue(69)
            .subscribe('thing-added', tdBuilder.calculators.displayThingCount(clazz))
            .subscribe('thing-removed', tdBuilder.calculators.displayThingCount(clazz))
            .subscribe('reset', tdBuilder.calculators.resetThingCount(clazz));
        return builder.createRow().addRowClass('stats-display-row')
            .addRowLabel(thingName + 's')
            .addData2(column)
            .build();
    }

    function createTurnsRow(){
        var builder = new DisplayRowBuilder(worldStats);
        return builder.createRow().addRowClass('stats-display-row')
            .addRowLabel('Turns')
            .addData('turns-count', worldStats.getTurnCount)
            .subscribe('turn-stats-updated', builder.calculators.displayTurnCount)
            .subscribe('reset', builder.calculators.displayTurnCount)
            .build();
    }

    function createTotalRow(){
        var builder = new DisplayRowBuilder(worldStats);
        return builder.createRow().addRowClass('stats-display-row')
            .addRowLabel('Total')
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
    var rowDatas = [];
    var rowDataBuilders = [];
    var row, rowLabel, displayDataElement;

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
        addRowLabel: function(label){
            rowLabel = document.createElement("td");
            rowLabel.classList.add(label + '-color');
            rowLabel.innerHTML = label + ": ";
            return this;
        },
        addData: function(id, initialValueSetter){
            var rowData = document.createElement("td");
            displayDataElement = document.createElement("span");
            displayDataElement.setAttribute('id', id);
            displayDataElement.innerHTML = initialValueSetter();
            rowDatas.push(displayDataElement);
            rowData.appendChild(displayDataElement);
            return this;
        },
        addData2: function(rowDataBuilder){
            rowDataBuilders.push(rowDataBuilder);
            return this;
        },
        subscribe: function(event, fun){
            pubsub.subscribe(event, fun.bind(this));
            return this;
        },
        build: function(){
            if(rowLabel){
                row.appendChild(rowLabel);
            }
            rowDatas.forEach(function(datum){
                row.appendChild(datum);
            });
            rowDataBuilders.forEach(function(builder){
                row.appendChild(builder.build());
            });
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

function DisplayDataBuilder(worldStats){
    var td = document.createElement("td");
    var id, initialValueSetter;

    return {
        withId: function(_id){
            id = _id;
            return this;
        },
        withInitialValue: function(_initialValueSetter){
            initialValueSetter = _initialValueSetter;
            return this;
        },
        subscribe: function(event, handler){
            PubSub().subscribe(event, function(eventData){
                handler(eventData);
            });
            return this;
        },
        build: function(){
            if(id){
                td.setAttribute("id", id);
            }
            if(initialValueSetter){
                if(typeof initialValueSetter === 'function'){
                    initialValueSetter = initialValueSetter();
                }
                td.innerHTML = initialValueSetter;
            }
            return td;
        },
        calculators: {
            displayThingCount: function(clazz){
                return function(addedThing){
                    if(addedThing.getClazz() === clazz){
                        td.innerHTML = worldStats.getThingCount(clazz);
                    }
                };
            },
            resetThingCount: function(clazz){
                return function(){
                    td.innerHTML = worldStats.getThingCount(clazz);
                };
            },
            displayTurnCount: function(){
                td.innerHTML = worldStats.getTurnCount();
            },
            displayTotals: function(){
                td.innerHTML = getTotals();
            }
        }
    };
}
