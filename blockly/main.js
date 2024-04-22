Blockly.Blocks['main_bottoken'] = {
  init: function() {
    this.appendValueInput("TOKEN")
        .setCheck(["String", "Env"])
        .appendField("connect to Bot with token");
    this.setColour(300);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['main_bottoken'] = function(block, generator) {
  var value_token = generator.valueToCode(block, 'TOKEN', javascript.Order.ATOMIC);
  
  var code = `client.login(${value_token})`;
  
  return code;
};

Blockly.Blocks['process_env'] = {
  init: function() {
    this.appendValueInput("ENV")
        .setCheck("String")
        .appendField("process env");
    this.setInputsInline(true);
    this.setOutput(true, "Env");
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['process_env'] = function(block, generator) {
  var value_env = generator.valueToCode(block, 'ENV', javascript.Order.ATOMIC);
  
  var code = `process.env[${value_env}]`;
  
  return [code, javascript.Order.NONE];
};

Blockly.Blocks['messages_messagecreate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("When a message is sent");
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("When a message is sent");
 this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['messages_messagecreate'] = function(block, generator) {
  var code = 'client.on("messageCreate", async (message) => {})';
  return code;
};

