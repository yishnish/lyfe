describe("thing details", function () {
    it('should show the hp of a thing', function () {
        var thing = new Cow();
        var details = new ThingDetails(thing);
        var displayHtml = details.display().outerHTML;
        expect(displayHtml).toMatch("HP");
        expect(displayHtml).toMatch(thing.hp.toString());
    });
    it('should show the current hp of a thing', function () {
        var thing = new Cow();
        var details = new ThingDetails(thing);
        var displayHtml = details.display().outerHTML;
        expect(displayHtml).toMatch("HP");
        expect(displayHtml).toMatch(thing.hp.toString());
        thing.hp--;
        displayHtml = details.display().outerHTML;
        expect(displayHtml).toMatch(thing.hp.toString());
    });
    it('should show the current vitality of a thing', function () {
        var thing = new Cow();
        var details = new ThingDetails(thing);
        var displayHtml = details.display().outerHTML;
        expect(displayHtml).toMatch("Vitality");
        expect(displayHtml).toMatch(thing.vitality.toString());
        thing.vitality--;
        displayHtml = details.display().outerHTML;
        expect(displayHtml).toMatch(thing.vitality.toString());
    });
    it('should show the how many turns a thing has been alive for', function () {
        var thing = new Cow();
        var details = new ThingDetails(thing);
        var displayHtml = details.display().outerHTML;
        expect(displayHtml).toMatch("Age");
        expect(displayHtml).toMatch(thing.age.toString());
    });
    it('displays "empty" if there is no thing', function () {
        var details = new ThingDetails(null);
        var displayHtml = details.display().outerHTML;
        expect(displayHtml).toMatch("empty");
    });
    it('changing the thing should show the current stats of the new thing', function () {
        var thingoriginal = new Cow();
        var details = new ThingDetails(thingoriginal);
        var displayHtml = details.display().outerHTML;
        expect(displayHtml).toMatch("HP");
        expect(displayHtml).toMatch(thingoriginal.hp.toString());
        var thingnew = new Cow();
        thingnew.hp = 1;
        details.setContents(thingnew);
        displayHtml = details.display().outerHTML;
        expect(displayHtml).toMatch(thingnew.hp.toString());
    });
});