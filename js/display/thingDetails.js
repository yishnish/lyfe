function ThingDetails(thing) {
    this.thing = thing;
}

(function () {
    var detailsContainer = createDetailsContainer();

    ThingDetails.prototype.display = function () {
        var hpText = this.thing ? this.thing.hp : "empty";
        detailsContainer.getElementsByClassName("hpvalue")[0].innerHTML = hpText;
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
        var hp = document.createElement("li");
        attributes.appendChild(hp);
        var hpInfo = document.createElement("label");
        hpInfo.innerHTML = "HP: ";
        var hpValue = document.createElement("span");
        hpValue.setAttribute("class", "hpvalue");
        hpInfo.appendChild(hpValue);
        hp.appendChild(hpInfo);
        return detailsContainer;
    }
})();
