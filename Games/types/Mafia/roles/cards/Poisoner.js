const Card = require("../../Card");
const { PRIORITY_KILL_DEFAULT } = require("../../const/Priority");

module.exports = class Poisoner extends Card {

	constructor(role) {
		super(role);

		this.meetings = {
			"Poison": {
				states: ["Night"],
				flags: ["voting"],
				targets: { include: ["alive"], exclude: ["Mafia"] },
				action: {
					labels: ["effect", "poison"],
					priority: PRIORITY_KILL_DEFAULT,
					run: function () {
						this.target.giveEffect("Poison", this.actor);
						this.target.queueAlert("You have been poisoned!", 0);
					}
				}
			}
		};
	}

}