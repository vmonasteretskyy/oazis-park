$(window).on("load", function() {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		$("body").addClass("ios");
	} else {
		$("body").addClass("web");
	}
	$("body").removeClass("loaded");
});

$(document).ready(function() {
	// fixed menu
	let heightHeader = $(".header").height();
	let heightMenu = $(".header__nav").height();

	$(window).scroll(function() {
		let currentPosition = $(window).scrollTop();
		if (currentPosition >= heightHeader - heightMenu) {
			$(".header__nav").addClass("fixed");
			$(".header").css("padding-bottom", heightMenu);
		} else {
			$(".header__nav").removeClass("fixed");
			$(".header").css("padding-bottom", "0");
		}
	});

	// $(".open-phone-list").click(function() {
	// 	$(this).toggleClass("open");
	// 	$(this)
	// 		.next()
	// 		.fadeToggle(400);
	// });

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
		$("body,html").animate(
			{
				scrollTop:
					$(this.hash)
						.find(".scroll-to")
						.offset().top - 120
			},
			1000
		);
	});

	$(window).scroll(function() {
		let scrollbarLocation = $(this).scrollTop();
		scrollLink.each(function() {
			let sectionOffset = $(this.hash).offset().top;
			if (sectionOffset <= scrollbarLocation) {
				$(this)
					.parent()
					.addClass("active");
				$(this)
					.parent()
					.siblings()
					.removeClass("active");
			}
		});
	});

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
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
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

	// slider gallery team
	$(function() {
		$(".slider").slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			adaptiveHeight: true
		});

		$(".open-pop-up").click(function() {
			if ($("#galleryTeam").hasClass("show")) {
				$(".slider").resize();
			}
		});
	});

	$(".tel").mask("(999) 999-9999");

	new WOW().init();

	// animate car on scroll
	const tween = new TimelineLite();

	tween
		.add(
			TweenLite.to("#carMoving", 1, {
				x: "200%",
				ease: Power1.easeInOut
			})
		)
		.add(TweenLite.to(".wheel", 1, { rotation: "+=360" }), "-=1");

	const controller = new ScrollMagic.Controller();

	const scene = new ScrollMagic.Scene({
		triggerElement: ".schedule",
		triggerHook: 0,
		duration: 2400
	})
		.setTween(tween)
		.addTo(controller);

	$(".open-info").click(function() {
		$(this)
			.next(".social-package__info")
			.fadeIn();
	});

	$(".close-info").click(function() {
		$(this)
			.parent()
			.fadeOut();
	});

	// animation dots on map first screen
	[1, 2, 3, 4, 5].forEach(i => {
		const motionPath = MorphSVGPlugin.pathDataToBezier(`#path${i}`, { align: `#dots${i}` });
		const tl = new TimelineMax({ repeat: -1 });
		TweenLite.set(`#dots${i}`, { xPercent: -50, yPercent: -50 });
		tl.to(`#dots${i}`, 160, { bezier: { values: motionPath, type: "cubic", ease: Linear.easeNone, repeatDelay: 0 } });
	});

	$(".car__gallery-link").click(function() {
		$("body").addClass("overflow-hidden");
	});
	$(".lb-close, .lightboxOverlay").click(function() {
		$("body").removeClass("overflow-hidden");
	});
});

if ($("*").is(".cookie")) {
	$(document).ready(function() {
		$(".cookie")
			.fadeIn(400)
			.addClass("show");
		$("body").addClass("overflow-hidden");
		// close cookie
		$(".cookie__close, .cookie__content").click(function(e) {
			e.preventDefault();
			$(".cookie")
				.fadeOut(400)
				.removeClass("show");
			$("body").removeClass("overflow-hidden");
		});

		$(".cookie__body").click(function(e) {
			e.stopPropagation();
		});
	});
}
