function Dissolving(actor, startAfter, dissolveLength, triggeredByAction, reactionTargetIndex){  
  var dissolving = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);
  dissolving.originalOpacity = actor.currentOpacity;
  dissolving.originalVisibility = actor.image.style.visibility;
  dissolving.startAfter = startAfter;
  dissolving.newOpacity = 0;
  dissolving.opacityStep = 60 / dissolveLength; // assuming 60 frames per seconds

  dissolving.reset = function(){
    this.resetPlugin();
    this.newOpacity = this.originalOpacity;
    this.actor.image.style.visibility = dissolving.originalVisibility;
    l("dissolving.originalVisibility: " + dissolving.originalVisibility);
    // l("dissolve " + this.targetObject.filename + " resetted: " + this.targetObject.currentOpacity);
  };
  dissolving.reset();

  dissolving.applybehavior = function(){
    if (!this.done && (this.targetObject.age() > this.startAfter)) {
      this.newOpacity = this.newOpacity.subtractUntilZero(this.opacityStep);
      this.targetObject.alterOpacity(this.newOpacity);

      this.isDoneWhen(this.newOpacity <= 0 && this.targetObject.currentOpacity <= 0);
      if (this.done) {
        this.targetObject.setInvisible();
      };
    };
  };

  return dissolving;
};

Actor.prototype.dissolves = function(startAfter, dissolveLength, triggeredByAction, reactionTargetIndex) {
  var behavior = new Dissolving(this, startAfter, dissolveLength, triggeredByAction, reactionTargetIndex);
  if(typeof triggeredByAction !== 'undefined'){
    behavior.triggeredByAction = triggeredByAction;
  }
  this.addBehavior(behavior);
};

Actor.prototype.dissolvesOnTouch = function(dissolveLength){
  this.reacts("this.dissolves(0, " + floatValueOfOr(dissolveLength, 1000) + ", true, reactionTargetIndex);", 1);
};

Actor.prototype.letsDissolve = function(targetObject, dissolveLength){
  this.reacts("this.dissolves(0, " + floatValueOfOr(dissolveLength, 1000) + ", true, reactionTargetIndex);", 1, targetObject);
};

