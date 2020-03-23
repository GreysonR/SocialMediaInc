"use strict";

function checkAchievements() {
	let goals = document.getElementById("goals").children[1];
	if (yourStats.likes >= 15 || yourStats.completedGoals.includes(0)) {
		goals.children[0].classList.add("completed");

		if (!yourStats.completedGoals.includes(0)) {
			yourStats.completedGoals.push(0);
		}
		saveGame();
	}
	if (yourStats.upgrades[0].level > 1) {
		goals.children[1].classList.add("completed");

		if (!yourStats.completedGoals.includes(1)) {
			yourStats.completedGoals.push(1);
		}
		saveGame();
	}
	if (yourStats.likes >= 100 && yourStats.comments >= 20 || yourStats.completedGoals.includes(2)) {
		goals.children[2].classList.add("completed");

		if (!yourStats.completedGoals.includes(2)) {
			yourStats.completedGoals.push(2);
		}
		saveGame();
	}
	if (yourStats.likes >= 50 && yourStats.nextPayment === Infinity || yourStats.completedGoals.includes(3)) {
		goals.children[3].classList.add("completed");

		if (!yourStats.completedGoals.includes(3)) {
			yourStats.completedGoals.push(3);
			yourStats.nextPayment = 60;
		}
		saveGame();
	}
	if (yourStats.likes >= 0 && yourStats.comments >= 50 || yourStats.completedGoals.includes(4)) {
		goals.children[4].classList.add("completed");

		if (!yourStats.completedGoals.includes(4)) {
			yourStats.completedGoals.push(4);
		}
		saveGame();
	}
	if (yourStats.likes >= 1000 && yourStats.comments >= 0 || yourStats.completedGoals.includes(5)) {
		goals.children[5].classList.add("completed");

		if (!yourStats.completedGoals.includes(5)) {
			yourStats.completedGoals.push(5);
		}
		saveGame();
	}
	if (yourStats.likes >= 0 && yourStats.comments >= 500 || yourStats.completedGoals.includes(6)) {
		goals.children[6].classList.add("completed");

		if (!yourStats.completedGoals.includes(6)) {
			yourStats.completedGoals.push(6);
		}
		saveGame();
	}
	if (yourStats.likes >= 500 && yourStats.comments >= 0 || yourStats.completedGoals.includes(7)) {
		goals.children[7].classList.add("completed");

		if (!yourStats.completedGoals.includes(7)) {
			yourStats.completedGoals.push(7);
		}
		saveGame();
	}
	if (yourStats.likes >= 1500 && yourStats.comments >= 0 || yourStats.completedGoals.includes(8)) {
		goals.children[8].classList.add("completed");

		if (!yourStats.completedGoals.includes(8)) {
			yourStats.completedGoals.push(8);
		}
		saveGame();
	}
	if (yourStats.likes >= 10000 && yourStats.comments >= 1000 || yourStats.completedGoals.includes(9)) {
		goals.children[9].classList.add("completed");

		if (!yourStats.completedGoals.includes(9)) {
			yourStats.completedGoals.push(9);
		}
		saveGame();
	}
	if (yourStats.likes >= 100000 && yourStats.comments >= 0 || yourStats.completedGoals.includes(10)) {
		goals.children[10].classList.add("completed");

		if (!yourStats.completedGoals.includes(10)) {
			yourStats.completedGoals.push(10);
		}
		saveGame();
	}
	if (yourStats.followers >= 1000000 && yourStats.comments >= 0 || yourStats.completedGoals.includes(11)) {
		goals.children[11].classList.add("completed");

		if (!yourStats.completedGoals.includes(11)) {
			yourStats.completedGoals.push(11);
		}
		saveGame();
	}
}