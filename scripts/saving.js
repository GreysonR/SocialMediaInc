"use strict";
let lost = false;
let defaults = {
	name: "Adam Frasier",

	followers: 0,
	money: 100,
	likes: 0,
	comments: 0,
	rentsPayed: 0,

	numPosts: 0,
	recentPosts: [],
	activePosts: [],

	rentCost: 100,
	timesPayed: 0,
	nextPayment: Infinity,
	completedGoals: [],

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
				likes: 0,
				comments: 0,
			},
		},
		{
			name: "Go outside S",
			desc: "+10% likes",
			amount: 0.10,
			level: 1,
			type: "like",
			cost: {
				likes: 100,
				comments: 20,
			},
			requires: {
				likes: 0,
				comments: 20,
			},
		},
		{
			name: "Make up Drama M",
			desc: "+15% comments",
			amount: 0.15,
			level: 1,
			type: "comment",
			cost: {
				likes: 200,
				comments: 50,
			},
			requires: {
				likes: 0,
				comments: 50,
			},
		},
		{
			name: "Go outside M",
			desc: "+20% likes",
			amount: 0.2,
			level: 1,
			type: "like",
			cost: {
				likes: 100,
				comments: 20,
			},
			requires: {
				likes: 1000,
				comments: 0,
			},
		},
		{
			name: "Make up Drama L",
			desc: "+40% comments",
			amount: 0.40,
			level: 1,
			type: "comment",
			cost: {
				likes: 20000,
				comments: 15000,
			},
			requires: {
				likes: 25000,
				comments: 0,
			},
		},
		{
			name: "Go outside L",
			desc: "+50% likes",
			amount: 0.50,
			level: 1,
			type: "like",
			cost: {
				likes: 40000,
				comments: 1000,
			},
			requires: {
				likes: 25000,
				comments: 0,
			},
		},
		{
			name: "Merch",
			desc: "+100% likes",
			amount: 1,
			buyOnce: true,
			level: 1,
			type: "like",
			cost: {
				likes: 100000,
				comments: 25000,
			},
			requires: {
				likes: 100000,
				comments: 0,
			},
		},
		{
			name: "Win",
			desc: "You win the game - what comes next?",
			amount: 0,
			level: 1,
			type: "win",
			cost: {
				followers: 1000000,
			},
			requires: {
				followers: 0,
			},
		},
	],
	sponsorships: [
		{
			name: "Attack Darkness Myths",
			amount: 100,
			requires: {
				likes: 50,
				comments: 0,
			},
		},
		{
			name: "Burrow Bear",
			amount: 150,
			requires: {
				likes: 500,
				comments: 0,
			},
		},
		{
			name: "Previous Pass",
			amount: 200,
			requires: {
				likes: 1500,
				comments: 0,
			},
		},
		{
			name: "AbilityShare",
			amount: 300,
			requires: {
				likes: 10000,
				comments: 1000,
			},
		},
		{
			name: "wisk.com",
			amount: 500,
			requires: {
				likes: 25000,
				comments: 500,
			},
		},
		{
			name: "hearable.com",
			amount: 750,
			requires: {
				likes: 100000,
				comments: 500,
			},
		},
		{
			name: "Nectar",
			amount: 1500,
			requires: {
				likes: 250000,
				comments: 10000,
			},
		},
	],
	
	likeGain: 1,
	commentGain: 1,
	followerGain: 1,
};

let yourStats = JSON.parse(localStorage.getItem("socialMediaInc")) || defaults;

let currentVersion = "0.55";
let version = localStorage.getItem("version");
if (version != currentVersion) {
	version = currentVersion;
	localStorage.setItem("version", currentVersion);
	yourStats = defaults;
}

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





function format(number, fixed) {
	if (typeof(number) == "string") {
		let end = number.replace(/[0-9]/g, "").replace(".", "");
		let newNum = number.replace(end, "") * 1;
		if (isNaN(newNum)) return;
		
		// Basically Clicker Heroes abbreviation but better
		if (end === "!") {	   // Quattuordecillion
			newNum *= 1e45;
		}
		else if (end === "T") {// Tredecillian
			newNum *= 1e42;
		}
		else if (end === "D") {// Duodecillian
			newNum *= 1e39;
		}
		else if (end === "U") {// Undecillian
			newNum *= 1e36;
		}
		else if (end  === "d") {// Decillian
			newNum *= 1e33;
		}
		else if (end === "N") {// Nonillian
			newNum *= 1e30;
		}
		else if (end === "O") {// Octillian
			newNum *= 1e27;
		}
		else if (end === "S") {// Septillion
			newNum *= 1e24;
		}
		else if (end === "s") {// Sextillion
			newNum *= 1e21;
		}
		else if (end === "Q") {// Quintillion
			newNum *= 1e18;
		}
		else if (end === "q") {// Quadrillion
			newNum *= 1e15;
		}
		else if (end === "t") {// Trillion
			newNum *= 1e12;
		}
		else if (end === "B") {// Billion
			newNum *= 1e9;
		}
		else if (end === "m") {// Million
			newNum *= 1e6;
		}
		else if (end === "k") {// Thousand
			newNum *= 1e3;
		}
		return newNum;
	}
	else {
		number = Math.round(number*100)/100;
		if (number/1e45 >= 1) {
			number /= 1e45;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "!";
		}
		else if (number/1e42 >= 1) {
			number /= 1e42;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "T";
		}
		else if (number/1e39 >= 1) {
			number /= 1e39;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "D";
		}
		else if (number/1e36 >= 1) {
			number /= 1e36;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "U";
		}
		else if (number/1e33 >= 1) {
			number /= 1e33;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "d";
		}
		else if (number/1e30 >= 1) {
			number /= 1e30;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "N";
		}
		else if (number/1e27 >= 1) {
			number /= 1e27;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "O";
		}
		else if (number/1e24 >= 1) {
			number /= 1e24;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "S";
		}
		else if (number/1e21 >= 1) {
			number /= 1e21;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "s";
		}
		else if (number/1e18 >= 1) {
			number /= 1e18;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "Q";
		}
		else if (number/1e15 >= 1) {
			number /= 1e15;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "q";
		}
		else if (number/1e12 >= 1) {
			number /= 1e12;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "t";
		}
		else if (number/1e9 >= 1) {
			number /= 1e9;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "B";
		}
		else if (number/1e6 >= 1) {
			number /= 1e6;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "m";
		}
		else if (number/1e3 >= 1) {
			number /= 1e3;
			number = (Math.round(number*100)/100);
			number = (!fixed) ? number : number.toFixed(1);
			number += "k";
		}

		if (typeof(number) == "string" && number.search("Infinity") > -1) {
			return "&#8734;";
		}
		else {
			return number;
		}
	}
}