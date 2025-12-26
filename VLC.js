var STATUS_PATH = "requests/status.xml";
var PLAYLIST_PATH = "requests/playlist.xml";
var playlistIds = {};

function init() {
	script.setUpdateRate(1);
}

function update() {
	if (local.parameters.autoUpdateState.get()) {
		updateData();
	}
}

function updateData() { //a mettre dans dataEvent ? fonction qui s'execute des qu'on recoit un retour sur une autre commande
	local.sendGET(STATUS_PATH);
	local.sendGET(PLAYLIST_PATH);
}

function dataEvent(data, requestURL) {
    for (i = 0; i < data.split(">").length; i++) {
        if (requestURL.contains(STATUS_PATH)) {
            if (data.split(">")[i].split("<")[1] == "/fullscreen") {
                local.values.fullscreen.set(data.split(">")[i].split("<")[0]);
            }

            if (data.split(">")[i].split("<")[1] == "/time") {
                local.values.time.set(data.split(">")[i].split("<")[0]);
            }

            if (data.split(">")[i].split("<")[1] == "/length") {
                local.values.length.set(data.split(">")[i].split("<")[0]);
            }

            if (data.split(">")[i].split("<")[1] == "/volume") {
                local.values.volume.set(data.split(">")[i].split("<")[0]);
            }

            if (data.split(">")[i].split("<")[1] == "/loop") {
                if (data.split(">")[i].split("<")[0] == "true") { local.values.loop.set("true"); }
                    else { local.values.loop.set("false"); }
            }

            if (data.split(">")[i].split("<")[1] == "/repeat") {
                if (data.split(">")[i].split("<")[0] == "true") { local.values.repeat.set("true"); }
                    else { local.values.repeat.set("false"); }
            }

            if (data.split(">")[i].split("<")[1] == "info name='filename'") {
                local.values.videoName.set(data.split(">")[i + 1].split("<")[0]);
            }

            if (data.split(">")[i].split("<")[1] == "/state") {
                local.values.state.set(data.split(">")[i].split("<")[0]);
            }

            if (data.split(">")[i].split("<")[1] == "/position") {
                local.values.position.set(data.split(">")[i].split("<")[0]);
            }
        } else {
            var line = data.split(">")[i];
            if (line.contains("leaf")) {    
                vars = line.split('"');
                var name, id = "";
                for (j = 0; j < vars.length; j++) {
                    if (vars[j].contains("name=")) {
                        name = vars[j + 1].trim();
                    } else if (vars[j].contains("id=")) {
                        id = vars[j + 1].trim();
                    }
                }
                playlistIds[name] = id;
            }
        }
    }
    
}

function play() {
	sendCommand("pl_play");
}

function pause() {
	sendCommand("pl_pause");
}

function stop() {
	sendCommand("pl_stop");
}

function playFile(file) {
	file = "file:///" + file;
	var f = file.replace(":", "%3A").replace("/", "%2D").replace(" ", "%20");
	sendCommand("in_play&input=" + file);
}

function playId(id) {
    sendCommand("pl_play&id=" + id);
}

function playFilename(filename) {
    sendCommand("pl_play&id=" + playlistIds[filename]);
}

function previous() {
	sendCommand("pl_previous");
}

function next() {
	sendCommand("pl_next");
}

function toggleLoop() {
	sendCommand("pl_loop");
}

function toggleRepeat() {
	sendCommand("pl_repeat");
}


function toogleFullscreen() {
	sendCommand("fullscreen");
}

function seekTo(value) {
	sendCommand("seek&val=" + value);
}

function setVolume(value) {
	sendCommand("volume&val=" + parseInt(value * 255));
}

function sendCommand(command) {
	local.sendGET("requests/status.xml?command=" + command);
}
