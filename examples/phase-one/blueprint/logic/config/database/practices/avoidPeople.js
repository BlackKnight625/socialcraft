const pathfinder = require('mineflayer-pathfinder').pathfinder
const {GoalNear} = require('mineflayer-pathfinder').goals
const Practice = require("../../../practice.js")
const {Vec3} = require("vec3");

class AvoidPeople extends Practice {

    _targetPosition;

    constructor(bot, agent, timeout = 20) {
        super(bot, "AvoidPeople", agent, timeout);
        this._targetPosition = null;
    }

    getSalience(context) {
        return (1 - this._agent._personality_traits["Agreeableness"]) * context._listOfSurroundingPeople.length;
    }

    setup(context) {
        let botPosition = this._bot.entity.position
        let nearestTargetPosition = this._bot.nearestEntity((entity => entity.type === "player").position)
        let vector = new Vec3(nearestTargetPosition.x, nearestTargetPosition.y, nearestTargetPosition.z)
        this._targetPosition = (vector.subtract(botPosition).normalize().dot(new Vec3(5, 0, 5)))
        this._targetPosition.add(botPosition)
    }

    start() {
        super.start()
        let goal = new GoalNear(this._targetPosition.x, this._targetPosition.y, this._targetPosition.z, 0.5);
        this._bot.pathfinder.setGoal(goal)
    }

    update() {
       //pass
    }

    isPossible() {
        return true
    }

    hasEnded() {
        return super.hasEnded() || this._targetPosition.xzDistanceTo(this._bot.entity.position) < 1
    }

    exit() {
        super.exit()
        this._targetPosition = null;
        this._bot.pathfinder.setGoal(null)
    }
}
module.exports = {AvoidPeople};
