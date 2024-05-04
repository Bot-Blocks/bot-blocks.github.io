Blockly.Blocks['main_bottoken'] = {
  init: function () {
    this.appendValueInput("TOKEN")
      .setCheck(["String", "Env"])
      .appendField("connect to bot with token");
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['main_bottoken'] = function (block, generator) {
  var value_token = generator.valueToCode(block, 'TOKEN', javascript.Order.ATOMIC);

  var code = `client.login(${value_token})`;

  return code;
};

Blockly.Blocks['client_connected'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("when the bot connects");
    this.appendStatementInput("CODE")
      .setCheck(null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['client_connected'] = function (block, generator) {
  var statements_code = generator.statementToCode(block, 'CODE');

  var code = `client.on(Events.ClientReady, async () => {
${statements_code}});`;

  return code;
};

Blockly.Blocks['client'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("bot/client");
    this.setInputsInline(true);
    this.setOutput(true, "Client");
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['client'] = function (block, generator) {
  return ['client', javascript.Order.NONE];
};

Blockly.Blocks['process_env'] = {
  init: function () {
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

javascript.javascriptGenerator.forBlock['process_env'] = function (block, generator) {
  var value_env = generator.valueToCode(block, 'ENV', javascript.Order.ATOMIC);

  var code = `process.env[${value_env}]`;

  return [code, javascript.Order.NONE];
};

Blockly.Blocks['client_setstatus'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("set bot status to")
      .appendField(new Blockly.FieldDropdown([["online", "online"], ["idle", "idle"], ["invisible", "invisible"], ["do not disturb", "dnd"]]), "STATE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['client_setstatus'] = function (block, generator) {
  var dropdown_state = block.getFieldValue('STATE');

  var code = `client.user.setStatus('${dropdown_state}');\n`;

  return code;
};