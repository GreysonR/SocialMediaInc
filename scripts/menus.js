"use strict";

function goToTab(tab) {
	let tabs = document.getElementsByClassName("sectionTab");
	document.getElementById("posts").classList.remove("active");
	document.getElementById("dashboard").classList.remove("active");
	document.getElementById(tab).classList.add("active");

	if (tab === "posts") {
		tabs[0].classList.add("active");
		tabs[1].classList.remove("active");
	}
	else if (tab === "dashboard") {
		tabs[0].classList.remove("active");
		tabs[1].classList.add("active");
	}
	
	tabs[0].classList.remove("alert");
	tabs[1].classList.remove("alert");
}

setTimeout(() => {
	window.scrollTo(0, 0);
}, 0);