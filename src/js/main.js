$(document).ready(function() {
		$('[data-select]').autoSuggest({
			options: {
				editable: false,
				value: 'Выберите тип системы',
				attrs: {
					name: 'select'
				},
			}
		})

		$(".js-suggest-list").niceScroll({
			cursorcolor:"#3E9CDC",
			cursorwidth:"7px",
			cursorborder: "none",
			cursorborderradius: "3px",
			autohidemode: false,
		})

		$("[data-slider]").slider({
			slide : function(event, ui) {
				$("[data-slider-value]").text(ui.value + " ");
			}
		});
		$("[data-slider-value]").text($( "[data-slider]" ).slider("value"));
});

var Menu = {
	options: {
		menu: $('.js-mobile-menu')
	},
	init: function () {
		$(document).on('touchstart', '.js-mobile-btn', this.onToggle)
		$(document).on('touchstart', '.js-mobile-close', this.close)
	},
	onToggle: function () {
		if (Menu.options.menu.hasClass('is-opened')) {
			Menu.close()
		} else {
			Menu.open()
		}
	},
	open: function () {
		Menu.options.menu.addClass('is-opened')
	},
	close: function () {
		Menu.options.menu.removeClass('is-opened')
	},
}
$(function () {
	Menu.init();
})