module.exports = function WorldBamNotifier(mod) {
	
	//add your own by finding templateId and matching it to huntingZoneId
	const bossName = {
		35: 	{msg: "Found Nyxarras!"},
		9050: 	{msg: "Found Yunaras Snaggletooth!"},
		7011: 	{msg: "Found Linyphi!"},
		33: 	{msg: "Found Betsael!"},
		5011: 	{msg: "Found Tempest Kanash!"},
		99: 	{msg: "Found Divine Reaver!"}
	};

	//templateId,huntingZoneId
	const bossId = [
		[35,38], 	//Nyxarras
		[9050,52],  //Yunaras Snaggletooth
		[7011,51],  //Linyphi
		[33,57], 	//Betsael
		[5011,4], 	//Tempest Kanash
		[99,10], 	//Divine Reaver
	]; 

	function sendMsg(msg) {
		mod.toClient('S_CHAT', 2, {
			channel: 21,
			authorName: 'WBNotify',
			message: msg
		});
	}

	mod.hook("S_SPAWN_NPC", 11, event => {
		const { templateId, huntingZoneId } = event;
		for (let i = 0, len = bossId.length; i < len; ++i) {
			var boss = bossId[i].split(",");
			if (templateId === boss[0] && huntingZoneId === boss[1]) {
				sendMsg(bossName[templateId].msg);
			}
		}
	});
};