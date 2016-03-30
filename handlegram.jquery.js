// Utility
if (typeof Object.create !== 'function') {
	Object.create = function (object) {
		function F() {};
		F.prototype = object;
		return new F();
	};
}

(function ($, window, document, undefined) {

	var Instagram = {

		init: function (options, elem) {
			var self = this;

			self.elem = elem;
			self.$elem = $(elem);

			self.url = 'https://api.instagram.com/v1/';
			self.options = $.extend({}, $.fn.handlegram.options, options);

			self.run();
		},

		run: function () {
			var self = this;

			self.buildUrl(self.options.get);

			this.fetch().done(function (results) {
				self.buildFrag(results);
				self.attachTemplate();

				if (typeof self.options.onComplete === 'function') {
					self.options.onComplete.apply(self.elem, arguments);
				}
			});
		},

		fetch: function () {
			return $.ajax({
				url: this.url,
				data: { client_id: this.options.clientId, count: this.options.limit },
				dataType: 'jsonp'
			});
		},

		buildUrl: function (get) {
			var recent = '/media/recent',
				endpoint = '';

			switch (get) {
				case 'popular':
					endpoint = 'media/popular';
					break;
				case 'tag':
					endpoint = 'tags/' + this.options.tagName + recent;
					break;
				case 'location':
					endpoint = 'locations/' + this.options.locationId + recent;
					break;
				case 'user':
					endpoint = 'users/' + this.options.userId + recent;
					break;
			}

			this.url = this.url + endpoint;
		},

		buildFrag: function (results) {
			var self = this;

			self.media = $.map(results.data, function (obj, index) {
				return {
					image: obj.images[self.options.resolution].url,
					likes: obj.likes.count,
					caption: obj.caption.text,
					link: obj.link,
					username: obj.user.username,
					date: self.formatTime(obj.caption.created_time)
				}
			});
		},

		attachTemplate: function () {
			var	template = Handlebars.compile(this.options.template.html());
			var html = template(this.media);
			this.$elem.append(html);
		},

		formatTime: function (unixTimestamp) {
			var int = parseInt(unixTimestamp),
				date = new Date(int*1000),
				day = (date.getDate()<10?'0':'') + date.getDate(),
				month = (date.getMonth()<10?'0':'') + (date.getMonth() + 1),
				year = date.getFullYear();

			return day + '/' + month + '/' + year;
		}

	};

	$.fn.handlegram = function (options) {
		var instagram = Object.create(Instagram);
		instagram.init(options, this);
		$.data(this[0], 'handlegram', instagram);

		return this;
	};

	$.fn.handlegram.options = {
		clientId: '97ae5f4c024c4a91804f959f43f2635f',
		get: 'popular',
		resolution: 'low_resolution',
		limit: 10,
		onComplete: null
	};

})(jQuery, window, document);