function StatsDisplay(worldStats){
    var stats = createDisplayList();
    var turnsRow = createTurnsRow();
    var cowsRow = createThingRow('Cow');
    var wolvesRow = createThingRow('Wolf');
    var fruitBushRow = createThingRow('FruitBush');
    var civetRow = createThingRow('Civet');
    var polarBearRow = createThingRow('PolarBear');
    var totalRow = createTotalRow();
    stats.appendChild(turnsRow);
    stats.appendChild(cowsRow);
    stats.appendChild(wolvesRow);
    stats.appendChild(fruitBushRow);
    stats.appendChild(civetRow);
    stats.appendChild(polarBearRow);
    stats.appendChild(totalRow);

    this.getDisplay = function(){
        return stats;
    };

    function createThingRow(thingName){
        var builder = new DisplayRowBuilder(worldStats);
        return builder.createRow().addRowClass('stats-display-row')
            .addDataLabel(thingName + 's')
            .addData(thingName.toLowerCase() + '-count', worldStats.getTurnCount)
            .subscribe('thing-added', function(thing){
                if(thing === thingName){
                    this.displayDataElement.innerHTML = worldStats.getThingCount(thingName);
                }
            })
            .subscribe('reset', function(){
                this.displayDataElement.innerHTML = '0';
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
                this.displayDataElement.innerHTML = '0';
            })
            .build();
    }
    function getTotals(){
        var total = 0;
        ['Cow', 'Civet', 'Wolf', 'PolarBear', 'FruitBush'].forEach(function(thing){
            total += worldStats.getThingCount(thing);
        });
        return total;
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