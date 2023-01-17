const Card = require("../../Card");
const { PRIORITY_KILL_DEFAULT } = require("../../const/Priority");

module.exports = class RevealTargetOnDeath extends Card {

	constructor(role) {
		super(role);

		this.meetings = {
			"Reveal on Death": {
				states: ["Night"],
				flags: ["voting"],
				action: {
					labels: ["hidden", "absolute"],
					priority: PRIORITY_KILL_DEFAULT - 1,
					run: function () {
						this.actor.role.data.playerToReveal = this.target;
					}
				}
			}
		};
		this.listeners = {
			"death": function (player, killer, deathType) {
				if (player == this.player && this.data.playerToReveal)
					this.data.playerToReveal.role.revealToAll();
			}
		};
		this.stealableListeners = {
			"death": this
		};
	}

}