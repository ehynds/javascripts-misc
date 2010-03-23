/*

This is a ridiculous yet effective jQuery class for creating dropdown menus.  It is intended to address
the following issues that are seemingly impossible to address with other CSS or JS implementations,
shy of writing invalid markup or other hackery:

	- keeps an active class on the triggering item throughout the entire hover.
	- hovering in the space between list items OR in the space between the
	  main nav and the dropdown won't close it.  this is particularly annoying
	  in IE

Assumes markup of (id is not relevant):

	<ul id="navigation">
	<li>
		<a href="">Item</a>
		<ul>
		<li><a href="">Sub item 1</a></li>
		<li><a href="">Sub item 2</a></li>
		</ul>
	</li>
	</ul>
	
Create a new dropdown object for each item that has a subnav:

	$("#navigation > li a:has(~ ul)").each(function(){
		return new Dropdown(this);
	});


*/

(function($){

	function Dropdown(item){
		this.onItem = false;
		this.onSubNav = false;
		this.isOpen = false;
		this.item = $(item);
		this.subnav = this.item.siblings("ul");
		
		// bind events & start
		this.init();
		
		return this;
	}
	
	Dropdown.prototype.start = function(){
		var self = this;
		
		this.timer = window.setInterval(function(){
			if(!self.onItem && !self.onSubNav && self.isOpen){
				self.stop();
			}
		}, 200);
	}
	
	Dropdown.prototype.stop = function(){
		window.clearInterval(this.timer);
		this.subnav.hide();
		this.isOpen = false;
		this.item.removeClass("active");
	}
	
	Dropdown.prototype.init = function(){
		var self = this;
		
		// bind to the main item
		this.item.bind("mouseenter mouseleave", function(e){
			
			// assume no
			self.onItem = false;
			
			if(e.type === "mouseenter"){
				$(this).addClass("active");
				self.start();
				self.subnav.show();
				self.onItem = true;
				self.isOpen = true;
			}
		});
		
		// bind to subnav
		this.subnav.bind("mouseenter mouseleave", function(e){
			self.onSubNav = (e.type === "mouseenter") ? true : false;
		});
	}
	
})(jQuery);
