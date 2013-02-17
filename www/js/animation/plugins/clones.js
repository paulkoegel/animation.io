function movementCloning(actor, parentActor, distanceX, distanceY, triggeredByAction, reactionTargetIndex){
  var movementCloning = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);
  movementCloning.parentActor = parentActor;
  movementCloning.distanceX = distanceX;
  movementCloning.distanceY = distanceY;
  
  movementCloning.actor.position = movementCloning.parentActor.position;

  movementCloning.applybehavior = function(){
    this.targetObject.vector.x = this.parentActor.vector.x;
    this.targetObject.vector.y = this.parentActor.vector.y;
  };

  return movementCloning;
}

Actor.prototype.clonesMovement = function(parentActor, distanceX, distanceY) {
  this.addBehavior(new Drifting(this, forceX, forceY, triggeredByAction, reactionTargetIndex));
};


Actor.prototype.clonesMovementOnTouch = function(forceX, forceY){
  this.reacts("this.clonesMovement(" + forceX + "," + forceY + ", true, reactionTargetIndex);", 1);
};

Actor.prototype.letsDrift = function(targetObject, forceX, forceY){
  this.reacts("this.clonesMovement(" + forceX + "," + forceY + ", true, reactionTargetIndex);", 1, targetObject);
};