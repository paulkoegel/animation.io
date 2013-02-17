function Appearing(actor, startAfter, appearLength, triggeredByAction, reactionTargetIndex){
  var appearing = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  appearing.newOpacity = 0;
  appearing.opacityStep = 0;
  appearing.appearLength = appearLength;

  appearing.reset = function(){
    this.resetPlugin(); // quasi "call to super";
    this.targetObject.setInitialOpacity(0);
    this.newOpacity = 0;
    this.opacityStep = 60 / this.appearLength; // assuming 60 frames per second
  }
  appearing.reset();

  appearing.applybehavior = function(){
    if (!this.done && (this.targetObject.age() > startAfter)) {
      this.targetObject.setVisible();
      this.newOpacity = this.newOpacity.addUntilTarget(this.opacityStep, 1);
      this.targetObject.alterOpacity(this.newOpacity);
      this.isDoneWhen(this.targetObject.currentOpacity >= 1);
    };
  };

  return appearing;
};

Actor.prototype.appears = function(startAfter, appearLength, triggeredByAction, reactionTargetIndex) {
  var behavior = new Appearing(this, startAfter, appearLength, triggeredByAction, reactionTargetIndex);
  if(typeof triggeredByAction !== 'undefined'){
    behavior.triggeredByAction = triggeredByAction;
  }
  this.addBehavior(behavior);
};

Actor.prototype.appearsOnTouch = function(appearLength){
  this.setInitialOpacity(0);
  this.reacts("this.appears(0," + appearLength + ", true, reactionTargetIndex);", 1);
};

Actor.prototype.letsAppearStartsVisible = function(targetObject, appearLength, startVisible){
  this.reacts("this.appears(0, " + floatValueOfOr(appearLength, 1000) + ", true, reactionTargetIndex);", 1, targetObject);
};

Actor.prototype.letsAppear = function(targetObject, appearLength, startVisible){
  targetObject.setInvisible();
  this.letsAppearStartsVisible(targetObject, appearLength, startVisible);
};

