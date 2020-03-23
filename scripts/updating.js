"use strict";
let lastUpdate = new Date().getTime();
let fps = 60;
function updatePosts() {
	if (lost) return;

	let likeGain = yourStats.likeGain;
	let commentGain = yourStats.commentGain;
	let followerGain = yourStats.followerGain;


	let allPosts = feed.getElementsByClassName("post");
	let updateTime = new Date().getTime();
	fps = 1000 / (updateTime - lastUpdate);
	lastUpdate = updateTime;

	for (let i = yourStats.recentPosts.length; i--;) {
		let wrapper = allPosts[yourStats.recentPosts.length - i - 1];
		let likesDiv = wrapper.children["likes"];
		let commentsDiv = wrapper.children["comments"];

		let recentPost = yourStats.recentPosts[i];
		let { likes, initialLikes, comments, initialComments, totalLikes, totalComments, timeAlive } = recentPost;
		timeAlive = timeAlive === undefined ? 0 : timeAlive;

		let newLikes = (totalLikes - initialLikes) * (Math.pow(timeAlive, 0.5) - timeAlive*0.5) / 0.5;
		let newComments = (totalComments - initialComments) * (Math.pow(timeAlive, 0.5) - timeAlive*0.5) / 0.5;

		if (Math.round(newLikes) < totalLikes && timeAlive < 0.6) { // Update likes + comments on post
			let lastLikes = likes;
			let lastComments = comments;

			likes = Math.ceil(newLikes);
			comments = Math.round(newComments);
			timeAlive +=  1 / fps / 10;

			if (lastComments != comments) {
				yourStats.comments += (comments - lastComments) * commentGain;
				document.getElementById("totalComments").innerText = format(Math.round(yourStats.comments), true);
			}
			if (lastLikes != likes) {
				yourStats.likes += (likes - lastLikes) * likeGain;
				document.getElementById("totalLikes").innerText = format(Math.round(yourStats.likes), true);

				// Get less followers if viral
				let newFollowers = Math.round(((likes - lastLikes) * 0.4 + 0.5) * Math.random() * (recentPost.viral ? 0.1 : 0.8));

				if (newFollowers > 0) {
					yourStats.followers += newFollowers * followerGain;
					document.getElementById("totalFollowers").children[0].innerText = format(Math.round(yourStats.followers), true);
				}

				loadUpgrades();
				loadSponsorships();
				checkAchievements();
			}
			else if (comments != lastComments) {
				loadUpgrades(); // Used to make sure it doesn't reload 2x
				loadSponsorships();
				checkAchievements();
			}
	
			yourStats.recentPosts[i] = {
				...recentPost,
				likes: likes,
				comments: comments,
				timeAlive: timeAlive,
			};

			likesDiv.innerText = format(likes, true);
			commentsDiv.innerText = format(comments, true);
		}
		else if (likesDiv.innerText != format(Math.ceil(likes), true)) {
			likesDiv.innerText = format(Math.ceil(likes), true);/**/
		}

		let totalMoneyDiv = document.getElementById("totalMoney");
		if (format(yourStats.money, true) != totalMoneyDiv.innerHTML) {
			totalMoneyDiv.innerHTML = format(yourStats.money, true);
		}
	}

	requestAnimationFrame(updatePosts);
}
updatePosts();


function formatTime(seconds) {
	if (seconds === undefined) seconds = this;

	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(seconds / 3600);
	seconds = seconds % 60;

	hours = hours ? `${hours} hour${(hours === 1 ? "" : "s")}` : "";
	minutes = minutes ? `${minutes} minute${(minutes === 1 ? "" : "s")}` : "";
	seconds = (minutes || hours) && seconds === 0 ? "" : `${seconds} second${(seconds === 1 ? "" : "s")}`;

	return `${hours} ${minutes} ${seconds}`.trim();
}
Number.prototype.toTime = formatTime;
setInterval(() => {
	let paymentWrapper = document.getElementById("nextPaymentWrapper");
	if (yourStats.nextPayment == Infinity) {
		if (!paymentWrapper.classList.contains("inactive")) {
			paymentWrapper.classList.add("inactive");
		}
	}
	else {
		if (paymentWrapper.classList.contains("inactive")) {
			paymentWrapper.classList.remove("inactive");
		}

		yourStats.nextPayment = yourStats.nextPayment - 1;
		if (yourStats.nextPayment < 0) {
			yourStats.money -= yourStats.rentCost;

			if (yourStats.money < 0) {
				document.getElementById("loseWrapper").classList.add("active");
				lost = true;

				yourStats = defaults;
				saveGame();
				return;
			}

			yourStats.timesPayed++;
			yourStats.nextPayment = 60 + yourStats.timesPayed*5;
			yourStats.rentCost = Math.round(yourStats.rentCost * 1.5 / 15) * 15;

			document.getElementById("paymentAmount").innerHTML = `$${yourStats.rentCost}`;
		}
		document.getElementById("paymentTime").innerHTML = yourStats.nextPayment.toTime();
		
		if (yourStats.nextPayment % 5 === 0) {
			saveGame();
		}
	}

}, 1000);



loadUpgrades();
loadSponsorships();
checkAchievements();