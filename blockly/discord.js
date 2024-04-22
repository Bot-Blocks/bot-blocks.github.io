Blockly.Blocks['discord_bottoken'] = {
  init: function() {
    this.appendValueInput("TOKEN")
        .setCheck(["String", "Env"])
        .appendField("connect to Bot with token");
    this.setColour(300);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['discord_bottoken'] = function(block, generator) {
  var value_token = generator.valueToCode(block, 'TOKEN', javascript.Order.ATOMIC);
  var code = `client.login(${value_token})`;
  return code;
};
