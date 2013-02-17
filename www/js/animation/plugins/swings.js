function Swinging(actor, radius, hertz, swingcenterX, swingcenterY, triggeredByAction, reactionTargetIndex){
  var swinging = new Plugin(0, 0, actor, triggeredByAction, reactionTargetIndex);
  var degrees = 0; // used/set later
  var runningValue = 0; // used/set later

	swinging.applybehavior = function(){
		runningValue = Math.sin((new Date) * hertz/1000);
		degrees = (runningValue * radius);

		this.actor.image.style.webkitTransformOrigin = swingcenterX + 'px ' + swingcenterY + 'px';
		this.actor.image.style.webkitTransform = 'rotate(' + degrees/2 + 'deg)';
	};

  return swinging;
};

Actor.prototype.swings = function(radius, hertz, swingcenterX, swingcenterY, triggeredByAction, reactionTargetIndex) {
  this.addBehavior(new Swinging(this, radius, hertz, swingcenterX, swingcenterY, triggeredByAction, reactionTargetIndex));
};
