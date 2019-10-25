$(document).ready(function() {
	$(".open-phone-list").click(function() {
		$(this).toggleClass("open");
		$(this)
			.next()
			.fadeToggle(400);
	});

	// open language
	$(".language>li>a").click(function() {
		$(this)
			.next("ul")
			.slideToggle();
	});

	const chooseOptions = ["car", "conditions", "service", "salary", "schedule"];

	chooseOptions.forEach(function(name) {
		$(`input[type=radio][name=${name}]`).change(function() {
			$(`input[name=${name}]`)
				.parent()
				.parent()
				.removeClass("checked");

			if ($(this).is(":checked")) {
				$(this)
					.parent()
					.parent()
					.addClass("checked");
			}
		});
	});

	// scroll to section
	let scrollLink = $(".scroll-section");
	scrollLink.click(function(e) {
		e.preventDefault();
		scrollLink.removeClass("active");
		$(this).addClass("active");
		$("body,html").animate(
			{
				scrollTop: $(this.hash).offset().top
			},
			1000
		);
	});

	// if ($("select").length === 1) {
	// 	$("select").styler();
	// }

	// tabs
	$(".tab-navigation").each(function() {
		$(this)
			.find("li")
			.each(function(i) {
				$(this).attr("data-tab", "tab" + i);
				$(this).click(function() {
					$(this)
						.addClass("active")
						.siblings()
						.removeClass("active");
				});
			});
	});

	$(".tab-content").each(function() {
		$(this)
			.find("div.tab-content__item")
			.each(function(i) {
				$(this).attr("data-tab", "tab" + i);
			});
	});

	// slider car
	$(".car__slider").slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1
		// fade: true
	});

	$(".tab-navigation__item").click(function() {
		let dataTab = $(this).data("tab");
		let getBlock = $(this).closest(".tabs-block");
		let tabContent = $(".tab-content>div.tab-content__item[data-tab=" + dataTab + "]");
		getBlock
			.find(tabContent)
			.addClass("open")
			.siblings()
			.removeClass("open");
	});

	// slider
	$(".reviews__slider").slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		centerMode: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					centerMode: false
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	// accordion
	$(".accordion__header").click(function() {
		$(this)
			.find("span")
			.toggleClass("rotate");
		$(this)
			.next("article")
			.slideToggle();
		$(this)
			.closest("li")
			.siblings("li")
			.find("span")
			.removeClass("rotate");
		$(this)
			.closest("li")
			.siblings("li")
			.find("article")
			.slideUp();
	});

	// slider contacts
	$(".contacts__slider").slick({
		infinite: true,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	// open modal window
	$(".open-pop-up").click(function(e) {
		e.preventDefault();
		let dataTarget = $(this).attr("data-target");
		if ($(this).attr("data-target")) {
			$(dataTarget)
				.fadeIn(400)
				.addClass("show");
			$("body").addClass("overflow-hidden");
		}
	});

	// close modal window
	$(".modal-window__close, .modal-window__content").click(function(e) {
		e.preventDefault();
		$(".modal-window")
			.fadeOut(400)
			.removeClass("show");
		$("body").removeClass("overflow-hidden");
	});

	$(".modal-window__body").click(function(e) {
		e.stopPropagation();
	});

	$(".tel").mask("(999) 999-9999");
});
