"use strict";

let defaults = {
	yourName: "Adam Frasier",

	followers: 0,
	money: 0,
	likes: 0,
	comments: 0,
	rentsPayed: 0,

	numPosts: 0,
	recentPosts: [],
	activePosts: [],

	upgrades: [
		{
			name: "Make up Drama S",
			desc: "+10% comments",
			amount: 0.1,
			level: 1,
			type: "comment",
			cost: {
				likes: 10,
				comments: 1,
			},
			requires: {
				likes: 16,
				comments: 0,
			},
		}
	],
	
	likeGain: 1,
	commentGain: 1,
	followerGain: 1,
};

let yourStats = JSON.parse(localStorage.getItem("socialMediaInc")) || defaults;


function saveGame() {
	localStorage.setItem("socialMediaInc", JSON.stringify(yourStats));
}
function reset() {
	localStorage.removeItem("socialMediaInc");
	window.location.reload();
}
function load() {
	for (let i = 0; i < yourStats.recentPosts.length; i++) {
		createPost({...yourStats.recentPosts[i], save: false});
	}
}

window.addEventListener("keydown", event => {
	if (event.which === 88 && event.ctrlKey) {
		reset();
	}
});


// REMOVE
yourStats.likes = 15;
yourStats.comments = 1;