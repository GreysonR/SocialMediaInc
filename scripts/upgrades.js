"use strict";

function fromCamel(str) {
	str = str || this;

	str = str.split("");
	for (let i = str.length; i--;) {
		let l = str[i];
		if (l.toLowerCase() != l) {
			str[i] = " "+str[i].toUpperCase();
		}
	}
	str[0] = str[0].toUpperCase();
	str = str.join("");
	return str;
}
function toCamel(str) {
	str = str || this;

	str = str.split(" ");
	for (let i = str.length; i--;) {
		str[i] = str[i].slice(0, 1).toUpperCase() + str[i].slice(1, str[i].length);
	}

	str = str.join("");
	str = str.slice(0, 1).toLowerCase() + str.slice(1, str.length);

	return str;
}
String.prototype.toCamel = toCamel;
String.prototype.fromCamel = fromCamel;

function createElem(options, callback) {
	let {id, className, elemType, text, parent} = options;
	id = !id ? "" : id;
	className = !className ? "" : className;
	text = !text ? "" : text;
	elemType = !elemType ? "div" : elemType;
	parent = !parent ? document.body : parent;

	let elem = document.createElement(elemType);
	elem.id = id;
	elem.className = className;
	elem.innerText = text;
	parent.appendChild(elem);

	if (typeof callback === "function")
		callback(elem);

	return elem;
}

/*
	<div class="upgrade" id="makeDramaSmall">
		<div id="upgradeTitle">Make up Drama S</div>
		<div id="upgradeDesc">
			+10% comments on next 5 posts
		</div>
		<div>
			<div id="upgradeCostTitle">Costs</div>
			<div id="costs">
				<div id="likes">10</div>
				<div id="comments">5</div>
			</div>
		</div>
	</div>
 */
function checkPrereq(upgrade) {
	if (!upgrade.requires) return true;
	let {likes, comments} = upgrade.requires;
	return (likes <= yourStats.likes && comments <= yourStats.comments || upgrade.shown);
}
function loadUpgrades() {
	let allUpgradesWrapper = document.getElementById("upgrades");
	allUpgradesWrapper.innerHTML = "";
	
	for (let i = 0; i < yourStats.upgrades.length; i++) {
		let upgrade = yourStats.upgrades[i];
		if (upgrade.bought) continue;
		if (!checkPrereq(upgrade)) continue;
		let {name, desc, cost} = upgrade;
		upgrade.shown = true;

		let wrapper = createElem({
			id: name.toCamel(),
			className: "upgrade",
			parent: allUpgradesWrapper,
		});
		createElem({
			id: "upgradeTitle",
			parent: wrapper,
			text: name,
		});
		createElem({
			id: "upgradeDesc",
			parent: wrapper,
			text: desc,
		});

		wrapper.addEventListener("click", buyUpgrade);
		wrapper.upgrade = upgrade;


		let div = createElem({
			parent: wrapper,
		});
		createElem({
			id: "upgradeCostTitle",
			text: "Costs",
			parent: div,
		});
		let costs = createElem({
			id: "costs",
			parent: div,
		});
		createElem({
			id: "likes",
			parent: costs,
			text: cost.likes || 0,
		});
		createElem({
			id: "comments",
			parent: costs,
			text: cost.comments || 0,
		});
	}
}
loadUpgrades();


function buyUpgrade(event) {
	let elem = event.path.filter(a => a.classList && a.classList.contains("upgrade"))[0];
	let upgrade = elem.upgrade;
	let {likes, comments} = upgrade.cost;

	if (!upgrade.bought && yourStats.likes >= likes && yourStats.comments >= comments && !elem.classList.contains("bought") && !elem.classList.contains("blocked")) {
		yourStats.likes -= likes;
		yourStats.comments -= comments;

		// Update upgrades
		upgrade.cost.likes = Math.round(upgrade.cost.likes * 1.5);
		upgrade.cost.comments = Math.round(upgrade.cost.comments * 1.5);
		upgrade.level++;

		if (upgrade.buyOnce) {
			upgrade.bought = true;
		}

		yourStats[upgrade.type+"Gain"] += upgrade.amount;
		upgrade.desc = `Next: +${Math.round(upgrade.amount*upgrade.level*100)}% ${upgrade.type}s`;

		// Update UI
		document.getElementById("totalLikes").innerHTML = format(Math.round(yourStats.likes), true);
		document.getElementById("totalComments").innerHTML = format(Math.round(yourStats.comments), true);
		elem.children["upgradeDesc"].innerHTML = upgrade.desc;

		let costs = elem.children[2].children[1];
		costs.children["likes"].innerText = format(Math.round(upgrade.cost.likes), true);
		costs.children["comments"].innerText = format(Math.round(upgrade.cost.comments), true);

		elem.classList.add("bought");
		setTimeout(() => {
			elem.classList.remove("bought");
		}, 200);
		
		saveGame();
	}
	else {
		elem.classList.add("blocked");
		setTimeout(() => {
			elem.classList.remove("blocked");
		}, 200);
	}
}