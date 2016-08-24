function ThingDetails(thing) {
    this.thing = thing;
}

(function () {
    var hpClass = 'hpValue', vitalityClass = 'vitalityValue', ageClass = 'ageValue';
    var detailsContainer = createDetailsContainer();

    ThingDetails.prototype.display = function () {
        var hpText = this.thing ? this.thing.hp : "empty";
        var vitalityText = this.thing ? this.thing.vitality : "empty";
        var ageText = this.thing ? this.thing.age : "empty";
        detailsContainer.getElementsByClassName(hpClass)[0].innerHTML = hpText;
        detailsContainer.getElementsByClassName(vitalityClass)[0].innerHTML = vitalityText;
        detailsContainer.getElementsByClassName(ageClass)[0].innerHTML = ageText;
        return detailsContainer;
    };

    ThingDetails.prototype.setContents = function(newThing) {
        this.thing = newThing;
    };

    function createDetailsContainer() {
        var detailsContainer = document.createElement("div");
        detailsContainer.setAttribute("class", "details");
        var attributes = document.createElement("ul");
        detailsContainer.appendChild(attributes);
        attributes.appendChild(createStatRow("HP", hpClass));
        attributes.appendChild(createStatRow("Vitality", vitalityClass));
        attributes.appendChild(createStatRow("Age", ageClass));
        return detailsContainer;
    }

    function createStatRow(label, className){
        var hp = document.createElement("li");
        var hpInfo = document.createElement("label");
        hpInfo.innerHTML = label + ": ";
        var hpValue = document.createElement("span");
        hpValue.setAttribute("class", className);
        hpInfo.appendChild(hpValue);
        hp.appendChild(hpInfo);
        return hp;
    }
})();
