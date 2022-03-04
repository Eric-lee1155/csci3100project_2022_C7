const PlayerModel = require('./Player');
const player = PlayerModel.create({
    name: 'TestPlayer',
    TotalWin: '999'
})
console.log(player);