Blockly.Blocks['game_slots'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("slots");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Play A Game of Slots");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['game_slots'] = function (block, generator) {
  var code = `let { Slots } = require('discord-gamecord');
const Game = new Slots({
  message: message,
  isSlashGame: false,
  embed: {
    title: 'Slot Machine',
    color: '#5865F2'
  },
  slots: ['🍇', '🍊', '🍋', '🍌']
});
  
Game.startGame();
Game.on('gameOver', (result) => {
  console.log(result);
});`
  return code;
};