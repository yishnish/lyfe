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
        var tdBuilder = new DisplayDataBuilder();
        var column = tdBuilder.withId(thingName.toLowerCase() + '-count')
            .withInitialValue(0)
            .subscribe('thing-added', displayThingCount(clazz))
            .subscribe('thing-removed', displayThingCount(clazz))
            .subscribe('reset', resetThingCount(clazz));
        return builder.createRow().addRowClass('stats-display-row')
            .addRowLabel(thingName + 's')
            .addData(column)
            .build();
    }

    function createTurnsRow(){
        var builder = new DisplayRowBuilder();
        var tdBuilder = new DisplayDataBuilder();
        var column = tdBuilder.withId('turns-count')
            .withInitialValue(worldStats.getTurnCount)
            .subscribe('turn-stats-updated', displayTurnCount)
            .subscribe('reset', displayTurnCount);
        return builder.createRow().addRowClass('stats-display-row')
            .addRowLabel('Turns')
            .addData(column)
            .build();
    }

    function createTotalRow(){
        var builder = new DisplayRowBuilder();
        var tdBuilder = new DisplayDataBuilder();
        var column = tdBuilder.withId('total-count')
            .withInitialValue(displayTotals)
            .subscribe('turn-stats-updated', displayTotals)
            .subscribe('thing-added', displayTotals)
            .subscribe('reset', displayTotals);
        return builder.createRow().addRowClass('stats-display-row')
            .addRowLabel('Total')
            .addData(column)
            .build();
    }

    function createDisplayTable(){
        var table = document.createElement("table");
        table.classList.add('stats-display');
        return table;
    }

    function getTotals(){
        var total = 0;
        [Cow, Civet, Wolf, PolarBear, FruitBush].forEach(function(thingClass){
            total += worldStats.getThingCount(thingClass);
        });
        return total;
    }

    function displayThingCount(clazz){
        return function(addedThing){
            if(addedThing.getClazz() === clazz){
                return worldStats.getThingCount(clazz) || 0;
            }
        };
    }

    function resetThingCount(clazz){
        return function(){
            return worldStats.getThingCount(clazz);
        };
    }

    function displayTurnCount(){
        return worldStats.getTurnCount();
    }

    function displayTotals(){
        return getTotals();
    }
}

function DisplayRowBuilder(){
    var pubsub = PubSub();
    var rowData = [];
    var row, rowLabel;

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
        addData: function(rowDataBuilder){
            rowData.push(rowDataBuilder);
            return this;
        },
        subscribe: function(event, fun){
            pubsub.subscribe(event, fun);
            return this;
        },
        build: function(){
            if(rowLabel){
                row.appendChild(rowLabel);
            }
            rowData.forEach(function(builder){
                row.appendChild(builder.build());
            });
            return row;
        }
    };
}

function DisplayDataBuilder(){
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
                var newValue = handler(eventData);
                if(newValue || newValue === 0){
                    td.innerHTML = handler(eventData);
                }
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
        }
    };
}
