Blockly.Blocks['message_received'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("when message received");
    this.appendStatementInput("CODE")
      .setCheck(null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['message_received'] = function (block, generator) {
  var statements_code = generator.statementToCode(block, 'CODE');

  var code = `client.on(Events.MessageCreate, async (message) => {
${statements_code}
});`;

  return code;
};

Blockly.Blocks['message_reply'] = {
  init: function () {
    this.appendValueInput("REPLY")
      .setCheck(["String", "Embed"])
      .appendField("reply to message with");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['message_reply'] = function (block, generator) {
  var value_reply = generator.valueToCode(block, 'REPLY', javascript.Order.ATOMIC);

  var code = `message.reply(${value_reply});\n`;

  return code;
};

Blockly.Blocks['message_content'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("message content");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['message_content'] = function (block, generator) {
  return ['message.content', javascript.Order.NONE];
};