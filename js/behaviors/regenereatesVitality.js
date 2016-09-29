function RegeneratesVitality(){}

RegeneratesVitality.prototype.act = function(turn){
    var actor = turn.actor;
    actor.vitality = Math.min(actor.MAX_VITALITY, actor.vitality + 10);
};