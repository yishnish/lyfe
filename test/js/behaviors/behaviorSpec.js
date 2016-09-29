describe("behavior", function(){
    it("should execute traits", function(){
        var myTrait = {
            acted : false,
            act: function(turn){
                this.acted = !this.acted;
            }
        };
        var behavior = new Behavior();
        behavior.addAction(myTrait);
        expect(myTrait.acted).toBe(false);
        behavior.behave(null);
        expect(myTrait.acted).toBe(true);
    });

    it("should execute all traits until it finds one that succeeds", function(){
        function MyTrait(mockSuccess){
            this.acted = false;
            this.mockSuccess = mockSuccess;
            this.act = function(turn){
                this.acted = true;
                return this.mockSuccess;
            };
        }
        var runs = new MyTrait(false);
        var alsoRuns = new MyTrait(true);
        var neverRuns = new MyTrait(true);

        var behavior = new Behavior();
        behavior.addAction(runs).addAction(alsoRuns).addAction(neverRuns);
        behavior.behave(null);
        expect(runs.acted).toBe(true);
        expect(alsoRuns.acted).toBe(true);
        expect(neverRuns.acted).toBe(false);
    });

});