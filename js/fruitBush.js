function FruitBush(){
    Food.call(this);

    this.takeTurn = function(){
        this.hp = Math.min(this.MAX_VITALITY, this.hp + 1);
    }
}