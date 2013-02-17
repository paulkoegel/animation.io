function MovementCloning(actor, parentActor, distanceX, distanceY, triggeredByAction, reactionTargetIndex){
  var movementCloning = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  movementCloning.parentActor = parentActor;
  movementCloning.counter = 0;

  movementCloning.distanceX = distanceX;
  movementCloning.distanceY = distanceY;

  movementCloning.applybehavior = function(){
    // console.log(this.parentActor);
    this.targetObject.position.x = this.parentActor.position.x + this.distanceX;
    this.targetObject.position.y = this.parentActor.position.y + this.distanceY;
    this.targetObject.image.style.left = this.targetObject.position.x + 'px';
    this.targetObject.image.style.top = this.targetObject.position.y + 'px';


    if (this.counter < 20) {
      this.counter++;
    };
  };

  return movementCloning;
}

Actor.prototype.clonesMovement = function(parentActor, distanceX, distanceY, triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new MovementCloning(this, parentActor, distanceX, distanceY, triggeredByAction, reactionTargetIndex));
};