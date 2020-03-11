"use strict";
const sentences = [
	"Am increasing at contrasted in favourable he considered astonished",
	"the valley of desire is filled with nothing but lies - my mother, who was clearly wrong",
	"Mrs chief great maids these which are ham match she",
	"Abode to tried do thing maids",
	"Doubtful disposed returned rejoiced to dashwood is so up",
	"Increasing impression interested expression he my at",
	"Respect invited request charmed me warrant to",
	"Expect no pretty as do though so genius afraid cousin",
	"Girl when of ye snug poor draw. Mistake totally of in chiefly",
	"Justice visitor him entered for. Continue delicate as unlocked entirely mr relation diverted in",
	"Known not end fully being style house. An whom down kept lain name so at easy",
	"I hate writing, except when its on this app",
	"Ferns need to take a chill pill or else",
	"Incommode necessary no it behaviour convinced distrusts an unfeeling he",
	"Could death since do we hoped is in. Exquisite no my attention extensive",
	"The determine conveying moonlight age",
	"Avoid for see marry sorry child",
	"Sitting so totally forbade hundred to",
	"She who arrival end how fertile enabled",
	"lööps bröther",
	"Themselves at dispatched interested insensible am be prosperous reasonably it",
	"In either so spring wished",
	"Melancholy way she boisterous use friendship she dissimilar considered expression",
	"Mr, things do plenty others a great vanity of disbeleif",
	"Foods always perish. They taste best that way",
	"Performed suspicion in certainty so frankness by attention pretended",
	"Newspaper or in tolerably education enjoyment",
	"Extremity excellent certainty discourse sincerity no he so resembled",
	"Joy house worse arise total boy but",
	"Elderly people need to get their lives together, like just dont have osteoporosis",
	"People honestly need to calm down like your lives arent that bad",
	"Behaviour extremely her explained situation yet september gentleman are who",
	"Is a thought really a thought if it not thought by you?",
	"I wonder if you can call parks, that would be pretty insane, like \"hi yes can I reserve a spot in the park\"",
	"Why am I never invited to parties is never a question I have to ask myself. Especially today...",
	"Hear ye hear ye, yall are crazy",
	"you all need to get lives like i clearly have mine together, sitting here on a dumb clicker game",
	"Fifteen winding related may hearted colonel are way studied",
	"County suffer twenty or marked no moment in he. Meet shew or said like he",
	"Valley silent cannot things so remain oh to elinor",
	"Hunting is a scam - youre killing innocent bullets!",
	"Speaking numerous ask did horrible packages set",
	"Ashamed herself has distant can studied mrs",
	"Perpetual darkness isnt that scary because eventually we would all realize that its just nap time for eternity",
	"i need someone to carry my around in a horse drawn carriage",
	"i dont understand geniuses like how can you be so smart but at the same time so dumb",
	"Barton waited twenty always repair in within we do",
	"im delightedly offended at the curiosity my aunt is dashing with BOTH salt and pepper",
	"Boy prosperous increasing surrounded companions her nor advantages sufficient put",
	"John on time down give meet help as of. Him waiting and correct believe now cottage she another",
	"Vexed six shy yet along learn maids her tiled. Through studied shyness evening bed him winding present",
	"Excuses, excuses. Hand over your garlic bread or else",
	"Do greatest at in learning steepest. Breakfast extremity suffering one who all otherwise suspected",
	"He at no nothing forbade up moments. Wholly uneasy at missed be of pretty whence",
	"John way sir high than law who week. Surrounded prosperous introduced it if is up dispatched",
	"Ferns are scary - i honestly think we need to eradicate them before they take over the world with their spores",
	"Put ladies design mrs sister was. Play on a hill, guys.",
	"Why would you play this dumb game instead of something productive",
	"Prosperous middletons is ye inhabiting as assistance me especially.",
	"I am at the stage of introvertedness where I dont even know if anyone else really exists",
	"going to bed is basically turning yourself off and back on again",
	"of iajewopifa howeih goahjweo ijdslkjlaksj dfjwepoiaj faoeiwjfoija",
];


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