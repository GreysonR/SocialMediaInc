"use strict";

function goToTab(tab) {
	document.getElementById("posts").classList.remove("active");
	document.getElementById("dashboard").classList.remove("active");
	document.getElementById(tab).classList.add("active");

	if (tab === "posts") {
		document.getElementsByClassName("sectionTab")[0].classList.add("active");
		document.getElementsByClassName("sectionTab")[1].classList.remove("active");
	}
	else if (tab === "dashboard") {
		document.getElementsByClassName("sectionTab")[0].classList.remove("active");
		document.getElementsByClassName("sectionTab")[1].classList.add("active");
	}
}