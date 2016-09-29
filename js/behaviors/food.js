function Food(){
}

Food.prototype = Object.create(BaseAction.prototype);

Food.prototype.getEaten = function(){
    this.hp -= 10;
    if(this.hp <= 0){
        this.die(null);
    }
};
