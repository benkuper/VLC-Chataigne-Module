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

function setVolume(value)
{
	sendCommand("volume&val="+parseInt(value*255));
}

function sendCommand(command)
{
	local.sendGET("requests/status.xml?command="+command);
}
