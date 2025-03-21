function init() {
	script.setUpdateRate(1);
}

function update() {
	if (local.parameters.autoUpdateState.get()) {
		updateData();
	}
}

function updateData() { //a mettre dans dataEvent ? fonction qui s'execute des qu'on recoit un retour sur une autre commande
	local.sendGET("requests/status.xml");
}

function dataEvent(data, requestURL) 
{

	for(i = 0; i < data.split(">").length; i++) {
		if(data.split(">")[i].split("<")[1] == "/fullscreen") {
			local.values.fullscreen.set(data.split(">")[i].split("<")[0]);
		}

		if(data.split(">")[i].split("<")[1] == "/time") {
			local.values.time.set(data.split(">")[i].split("<")[0]);
		}
		
		if(data.split(">")[i].split("<")[1] == "/length") {
			local.values.length.set(data.split(">")[i].split("<")[0]);
		}
		
		if(data.split(">")[i].split("<")[1] == "/volume") {
			local.values.volume.set(data.split(">")[i].split("<")[0]);
		}

		if(data.split(">")[i].split("<")[1] == "/loop") {
			if(data.split(">")[i].split("<")[0] == "true") { local.values.loop.set("true"); }
			else { local.values.loop.set("false"); }
		}

		if(data.split(">")[i].split("<")[1] == "/repeat") {
			if(data.split(">")[i].split("<")[0] == "true") { local.values.loop.set("repeat"); }
		}

		if(data.split(">")[i].split("<")[1] == "info name='filename'") {
			local.values.videoName.set(data.split(">")[i+1].split("<")[0]);
		}

		if(data.split(">")[i].split("<")[1] == "/state") {
			local.values.state.set(data.split(">")[i].split("<")[0]);
		}

	}
	
	
}

function play()
{
	sendCommand("pl_play");
}

function pause()
{ 
	sendCommand("pl_pause");
}

function stop()
{
	sendCommand("pl_stop");
}

function playFile(file)
{
	file = "file:///"+file;
	var f = file.replace(":","%3A").replace("/","%2D").replace(" ","%20");
	sendCommand("in_play&input="+file);
}

function previous()
{
	sendCommand("pl_previous");
}

function next()
{
	sendCommand("pl_next");
}

function toggleLoop()
{
	sendCommand("pl_loop");
}

function toogleFullscreen() {
	sendCommand("fullscreen");
}

function seekTo(value) {
	sendCommand("seek&val="+value);
}

function setVolume(value)
{
	sendCommand("volume&val="+parseInt(value*255));
}

function sendCommand(command)
{
	local.sendGET("requests/status.xml?command="+command);
}
