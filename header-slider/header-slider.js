/*
 * @param {string} Element ID
 * @param {number} Interval in miliseconds (optional)
 * @param {number} Duration in miliseconds (optional)
 */
var HeaderSlider = function(element_id, interval, duration)
{
	this.element = $('#' + element_id);
	this.interval = interval || 4000;
	this.duration = duration || 600;
}

/*
 * @public
 */
HeaderSlider.prototype.init = function()
{
	if(this.element.find('.slides').length > 1)
	{
		this.visible_slide = this.element.find('.slides:first');

		this.width = parseInt(this.element.width());

		this.element.css({
			position: 'relative',
			overflow: 'hidden'
		})
		.find('.slides').css({
			position: 'absolute',
			left: 0,
			top: 0
		}).end()
		.find('.slides:not(:first)').css({
			left: this.width + 'px'
		});

		// @private
		var slider = this;

		this.element.mouseenter(function(){
			slider.stopped = true;
			clearTimeout(slider.timer);
		})
		.mouseleave(function(){
			slider.stopped = false;
			slider.setTimer();
		});

		this.setTimer();
	}
};

/*
 * @private
 */
HeaderSlider.prototype.getNextSlide = function()
{
	return this.visible_slide.next('.slides').length ?
		this.visible_slide.next('.slides') : this.element.find('.slides:first');
}

/*
 * @private
 */
HeaderSlider.prototype.slide = function(next_slide)
{
	if(this.visible_slide.is(':not(:animated)'))
	{
		this.visible_slide.animate({
			left: '-' + this.width + 'px'
		}, this.duration)
		.animate({
			left: this.width + 'px'
		}, 1);

		next_slide.animate({
			left: 0
		}, this.duration);

		this.visible_slide = next_slide;

		this.setTimer();
	}
}

/*
 * @private
 */
HeaderSlider.prototype.setTimer = function()
{
	if(!this.stopped)
	{
		// @private
		var slider = this;

		this.timer = setTimeout(function(){
			slider.slide(slider.getNextSlide());
		}, this.interval);
	}
}