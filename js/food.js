function Food(){
    Thing.call(this);

    this.getEaten = function(){
        this.hp--;
        if(this.hp <=0 ) {
            this.die(null);
        }
    }
}