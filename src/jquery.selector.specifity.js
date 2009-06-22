(function($) {
	
	$.selector.SimpleSelector.prototype.specifity = function() {
		if (this.spec) return this.spec;
		
		var spec = [
			0,
			this.id ? 1 : 0, 
			this.classes.length + this.attrs.length + this.pseudo_classes.length, 
			((this.tag && this.tag != '*') ? 1 : 0) + this.pseudo_els.length
		];
		$.each(this.nots, function(i,not){
			var ns = not.specifity(); spec[1] += ns[1]; spec[2] += ns[2]; sspec[3] += ns[3]; 
		});
		
		return this.spec = spec;
	}

	$.selector.Selector.prototype.specifity = function() {
		if (this.spec) return this.spec;
		
		var spec = [this.important?1:0,0,0,0];
		$.each(this.parts, function(i,part){
			if (i%2) return;
			var ps = part.specifity(); spec[1] += ps[1]; spec[2] += ps[2]; spec[3] += ps[3]; 
		});
		
		return this.spec = spec;	
	}
	
})(jQuery);
