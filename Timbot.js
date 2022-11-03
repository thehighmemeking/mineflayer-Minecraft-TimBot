const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals: { GoalNear, GoalFollow } } = require('mineflayer-pathfinder');



createBot();
function createBot() {
    console.log("Connecting")
    const bot = mineflayer.createBot({
        host: "localhost",
        port: parseInt(process.argv[2]),
        username: "xxmeme.kingsxx@gmail.com",
        password: "0steoporosis",
        auth: 'microsoft'
    })

    // Install move and pathfinder
    bot.loadPlugin(pathfinder);

    bot.once('spawn', function () {
        console.log("Spawned!");
        const defaultMove = new Movements(bot);


        bot.on('chat', (username, message) => {
            if (username === bot.username) return;
            if (message !== 'come') return;
            const target = bot.players[username]?.entity;
            if (!target) {
                bot.chat("I don't see you !");
                return;
            }
            const { x: playerX, y: lpayerY, z: playerZ } = target.position;

            bot.pathfinder.setMovements(defaultMove);
            bot.pathfinder.setGoal(new GoalFollow(target, 3), true);
        })
    })

    bot.on('end', function (reason) {
        console.log("Disconnected due to " + reason);
        setTimeout(function () {
            createBot();
        }, 10000);
    })
}
