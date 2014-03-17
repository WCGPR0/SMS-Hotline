var messages = [
["Cause you are the Swagmaster", "Cause you can lift more than Jerry", "Cause you know Python"],
["Cause your a model, and you know it", "Cause you own a gazillion restraunts", "Cause your too smart, but staying in Binghamton for her friends (yeah right, Standford leggo)", "Cause you know the green backpack theory", "Cause you're always balling", "Cause you watch Salad Fingers", "Cause your dirty jokes are soooo weird", "Cause you bring joy to foodime", "Cause your so awesome, I had to make this", "Cause you love Frozen, and you know it ;)", "Cause I took your Silvertung service instead of a cab", " Cause your so popular, guys be oogling and oogling", "Cause you are going to be princess of beverly hills in the future #fabuluxe"],
["Cause your enjoy food as much as me #gordas4ever", "Cause your an amazing photographer, and our facebook never gets boring cause of you", "Cause you are so generous and kind", "Cause your so smart it makes everybody around you smarter", "Cause you always write such nice letters, and gifts yummy presents","Cause you were so fabulous, you turned all the guys gay"],
["Cause your not.","Cause you lift more than the great Victor; oh wait, you don't.", "Cause you eat like baws- though sadly, no gainz.", "Cause you row, why don't you just ask Chris teach you how to lift, like a real. pussy.","Cause you actually are. Wait how did this get in here? Go home boi.", "Are you at the gym? Nah, do you even lift bro?", "Go ask Jason Genova for advice. Join his #mystory", "Cause you haven't converted to dirty bulking, that's actually geniune respect", "Cause you are a bronze low elo scrub. nuff said."]];
var myHash = {"+19179291883":"Master",
		"+15708150898":"Peggy",
		"+16467324333":"Steph",
		"+13472260140":"Jerry"};
var counter = [0,0,0,0];

var twilio = require ('twilio'),
	 qs = require('querystring');
var processRequest = function(req, callback) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        callback(qs.parse(body));
    });
}
var name, from, condition = true;

var http = require('http');
http.createServer(function (req, res) {
var resp = new twilio.TwimlResponse();
 processRequest(req, function(data) {
        from = data.From;
	name = myHash[from];
	condition = (data.Body == "Why am I awesome?");
	if (!name) name = "Monkey";

	if (name == "Master" && condition) {
		resp.message(messages[0][counter[0]]);
		counter[0]++;
		}
	else if (name == "Peggy" && condition) {
		resp.message(messages[1][counter[1]]);
		counter[1]++;
		}
	else if (name == "Steph" && condition) {
		resp.message(messages[2][counter[2]]);
		counter[2]++;
		}
	else if (name == "Jerry") {
		resp.message(messages[3][counter[3]]);
		counter[3]++;
		}
	else resp.message(name + ", what you doing?");
        res.writeHead(200, {
                'Content-Type':'text/xml'
        });
        res.end(resp.toString()); 
	console.log(name);
	console.log(from);   
}); 
}).listen(8080);
