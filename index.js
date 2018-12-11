module.exports = function WorldBamNotifier(dispatch) {
	//add your own by finding templateId and matching it to huntingZoneId
	const bossName = {
		35: 	{msg: "Found Nyxarras!"},
		9050: 	{msg: "Found Yunaras Snaggletooth!"},
		7011: 	{msg: "Found Linyphi!"},
		33: 	{msg: "Found Betsael!"},
		5011: 	{msg: "Found Tempest Kanash!"},
		99: 	{msg: "Found Divine Reaver!"}
	};

	// templateId : huntingZoneId
	const bossId = [
		[35, 38], 	// Nyxarras
		[9050, 52], // Yunaras Snaggletooth
		[7011, 51], // Linyphi
		[33, 57], 	// Betsael
		[5011, 4], 	// Tempest Kanash
		[99, 10], 	// Divine Reaver
	]; 
	
/*
	// 42 Blue Shiny Text, 31 Normal Text
	const msg-chat = {unk1: 42, unk2: 0, unk3: 27, message: ""}; 	
	const msg-whisp = { channel: 7, authorName: "", message: ""};
	
	const systemMessage = msg => {
		msgObject.message = whisperObj.message = msg;
		toClient("S_CHAT", 1, whisperObj);
		toClient("S_DUNGEON_EVENT_MESSAGE", 1, msgObject);
  };
*/

	function sendMsg(msg) {
		dispatch.toServer('C_CHAT', 1, {
			channel: 21,
			message: msg
		});
	}

	dispatch.hook("S_SPAWN_NPC", 5, event => {
		const { templateId, huntingZoneId } = event;
		for (let i = 0, len = bossId.length; i < len; ++i) {
			const boss = bossId[i];
			if (templateId === boss[0] && huntingZoneId === boss[1]) {
				sendMsg(bossName[0].msg);
			}
		}
	});
};