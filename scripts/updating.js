"use strict";

let lastUpdate = new Date().getTime();
let fps = 60;
function updatePosts() {
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

			if (lastLikes != likes) {
				yourStats.likes += (likes - lastLikes) * likeGain;
				document.getElementById("totalLikes").innerText = format(Math.round(yourStats.likes), true);

				// Get less followers if viral
				let newFollowers = Math.round(((likes - lastLikes) * 0.4 + 0.5) * Math.random() * (recentPost.viral ? 0.1 : 0.8));

				if (newFollowers > 0) {
					yourStats.followers += newFollowers * followerGain;
					document.getElementById("totalFollowers").children[0].innerText = format(Math.round(yourStats.followers), true);
				}
			}
			if (lastComments != comments) {
				yourStats.comments += (comments - lastComments) * commentGain;
				document.getElementById("totalComments").innerText = format(Math.round(yourStats.comments), true);
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

	}

	requestAnimationFrame(updatePosts);
}
updatePosts();