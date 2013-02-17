function Counting(actor, amount, triggeredByAction, reactionTargetIndex){
  var counting = new Plugin(0,0, actor, triggeredByAction, reactionTargetIndex);

  if (typeof counting.targetObject === 'undefined') {
		counting.targetObject = counting.actor;  	
  };

  counting.targetObject.counter += amount;

  l("counter set to " + counting.targetObject.counter);

  counting.targetObject.counterDiv.innerHTML = counting.targetObject.counter;
  counting.targetObject.counterDiv.position = counting.targetObject.position;

  counting.reset = function(){
	  this.resetPlugin(); // quasi "call to super";
		this.targetObject.counterDiv.position = this.targetObject.position;
		this.targetObject.counterDiv.style.left = this.targetObject.position.x + 'px';
		this.targetObject.counterDiv.style.top = this.targetObject.position.y + 'px';	
  };
  counting.reset();

  counting.applybehavior = function(){
  	this.targetObject.counterDiv.style.left = this.targetObject.position.x + 'px';
  	this.targetObject.counterDiv.style.top = this.targetObject.position.y + 'px';	
  };

  return counting;
};


Actor.prototype.counts = function(amount, triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new Counting(this, amount, triggeredByAction, reactionTargetIndex));
};


Actor.prototype.letsCount = function(targetObject, amount){
  targetObject.counter = 0;

  targetObject.counterDiv = document.createElement('div');
  targetObject.counterDiv.setAttribute('class','counter');
  targetObject.counterDiv.innerHTML = 0;
  targetObject.scene.div.appendChild(targetObject.counterDiv);
  targetObject.counterDiv.style.left = targetObject.position.x + 'px';
  targetObject.counterDiv.style.top = targetObject.position.y + 'px';	
  targetObject.counterDiv.style.pointerEvents = 'none';
  targetObject.counterDiv.style.zIndex = 100000;

  targetObject.counts(0, false, 0);

  this.reacts("this.counts(" + amount + ", true, reactionTargetIndex);", 0, targetObject);
};