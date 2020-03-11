"use strict";

let posts = {
	get sentence() {
		return sentences[Math.floor(Math.random() * sentences.length)];
	},
}

let feed = document.getElementById("feed");
let postButton = document.getElementById("postButton");
let input = document.getElementById("postInput");
let inputPosition = 0;
let currentPost = posts.sentence;


window.addEventListener("contextmenu", event => {
	event.preventDefault();
});

input.addEventListener("keydown", event => {
	// Check that key is a letter
	requestAnimationFrame(() => {
		input.value = "";

		if (inputPosition < currentPost.length) { // Go to next character
			if ((event.which >= 65 && event.which <= 90 || event.which === 32) && !event.ctrlKey) {
				inputPosition++;
			}

			input.value = currentPost.slice(0, inputPosition);
		}
		else { // Show you can post
			postButton.classList.add("active");
			input.value = currentPost;
			
			if (event.which === 13) {
				post();
			}
		}
	});
});

function post() {
	if (postButton.classList.contains("active")) {
		createPost({
			creator: "you",
			text: currentPost,
			likes: 0,
			comments: 0,
		});
		resetPost();
	}
}
function resetPost() {
	postButton.classList.remove("active");
	inputPosition = 0;
	input.value = "";
	let lastPost = currentPost;

	// Make sure you always get a new sentence
	while (true) {
		currentPost = posts.sentence;

		if (currentPost !== lastPost) {
			break;
		}
	}
}

/*
	<div id="postWrapper">
		<div id="profile"></div>
		<div id="values">
			<div id="name">Adam Frasier</div>
			<div id="text">Lorem ipsum dolor sit amet, consectetur</div>
		</div>
		<div id="likes">8.8k</div>
		<div id="comments">8.8k</div>
	</div>
 */
function createPost(options) {
	let { creator, text, likes, comments, totalLikes, totalComments, save } = options;
	save = save === undefined ? true : save;
	let isViralPost = false;
	
	if (save === true) {
		// 2.5% chance of being viral post
		let viral = Math.random() < 0.025 ? 10 : 1; // 10x likes + comments if viral
		totalLikes = Math.round(Math.random() * (yourStats.followers + 1) + 7) * viral;
		totalComments = Math.round(Math.random() * (yourStats.followers + 8) * 0.1) * viral;

		if (viral != 1) {
			isViralPost = true;
		}
	}

	if (creator === "you") {
		creator = yourStats.yourName;
	}

	let wrapper = document.createElement("div");
	let profile = document.createElement("div");
	let values = document.createElement("div");
	let name = document.createElement("div");
	let textDiv = document.createElement("div");
	let likesDiv = document.createElement("div");
	let commentsDiv = document.createElement("div");

	wrapper.id = "postWrapper";
	wrapper.className = "post";
	profile.id = "profile";
	values.id = "values";
	name.id = "name";
	textDiv.id = "text";
	likesDiv.id = "likes";
	commentsDiv.id = "comments";

	wrapper.appendChild(profile);
	wrapper.appendChild(values);
	wrapper.appendChild(likesDiv);
	wrapper.appendChild(commentsDiv);

	values.appendChild(name);
	values.appendChild(textDiv);

	name.innerText = yourStats.yourName;
	textDiv.innerText = text;
	likesDiv.innerText = likes;
	commentsDiv.innerText = comments;

	feed.insertBefore(wrapper, feed.children[0]);

	// Remove 6th post
	let allPosts = feed.getElementsByClassName("post");
	if (allPosts.length > 5) {
		let oldPost = allPosts[allPosts.length - 1];
		oldPost.parentNode.removeChild(oldPost);
		yourStats.recentPosts.shift();
	}
	
	Object.defineProperty(wrapper, "values", {
		get: function() {
			return {
				creator: creator,
				text: text,

				likes: Number(likesDiv.innerText),
				comments: Number(commentsDiv.innerText),

				initialLikes: likes,
				initialComments: comments,

				totalLikes: totalLikes,
				totalComments: totalComments,
				
				viral: isViralPost
			};
		}
	});

	if (save) {
		yourStats.numPosts++;
		let ending = yourStats.numPosts === 1 ? "" : "s";
		document.getElementById("numPosts").innerText = `${yourStats.numPosts} post${ending}`;

		yourStats.recentPosts.push(wrapper.values);
		saveGame();
	}
}



load();