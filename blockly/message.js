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
${statements_code}});`;

  return code;
};

Blockly.Blocks['message_receivednobot'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("when message received & author is a user");
    this.appendStatementInput("CODE")
      .setCheck(null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

javascript.javascriptGenerator.forBlock['message_receivednobot'] = function (block, generator) {
  var statements_code = generator.statementToCode(block, 'CODE');

  var code = `client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;
${statements_code}});`;

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

    this.setOnChange(function () {
      var parent = this.getRootBlock();
      
      if (!parent.type.startsWith('message_received')) {
        this.setWarningText('This block should be used in a "when message received" event');
      } else {
        this.setWarningText(null);
      }
    });
  }
};

javascript.javascriptGenerator.forBlock['message_reply'] = function (block, generator) {
  var value_reply = generator.valueToCode(block, 'REPLY', javascript.Order.ATOMIC);

  return `message.reply(${value_reply});\n`;
};

Blockly.Blocks['message'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("message");
    this.setOutput(true, "Message");
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(function () {
      var parent = this.getRootBlock();

      if (!parent.type.startsWith('message_received')) {
        this.setWarningText('This block should be used in a "when message received" event');
      } else {
        this.setWarningText(null);
      }
    });
  }
};

javascript.javascriptGenerator.forBlock['message'] = function (block, generator) {
  return ['message', javascript.Order.NONE];
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

    this.setOnChange(function () {
      var parent = this.getRootBlock();
      
      if (!parent.type.startsWith('message_received')) {
        this.setWarningText('This block should be used in a "when message received" event');
      } else {
        this.setWarningText(null);
      }
    });
  }
};

javascript.javascriptGenerator.forBlock['message_content'] = function (block, generator) {
  return ['message.content', javascript.Order.NONE];
};

Blockly.Blocks['message_user'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("message author");
    this.setInputsInline(true);
    this.setOutput(true, "User");
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(function () {
      var parent = this.getRootBlock();
      
      if (!parent.type.startsWith('message_received')) {
        this.setWarningText('This block should be used in a "when message received" event');
      } else {
        this.setWarningText(null);
      }
    });
  }
};

javascript.javascriptGenerator.forBlock['message_user'] = function (block, generator) {
  return ['message.author', javascript.Order.NONE];
};

Blockly.Blocks['message_member'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("message member");
    this.setInputsInline(true);
    this.setOutput(true, "Member");
    this.setColour(45);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(function () {
      var parent = this.getRootBlock();
      
      if (!parent.type.startsWith('message_received')) {
        this.setWarningText('This block should be used in a "when message received" event');
      } else {
        this.setWarningText(null);
      }
    });
  }
};

javascript.javascriptGenerator.forBlock['message_member'] = function (block, generator) {
  return ['message.member', javascript.Order.NONE];
};

Blockly.Blocks['message_channel'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("message channel");
    this.setInputsInline(true);
    this.setOutput(true, "Channel");
    this.setColour(15);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(function () {
      var parent = this.getRootBlock();
      
      if (!parent.type.startsWith('message_received')) {
        this.setWarningText('This block should be used in a "when message received" event');
      } else {
        this.setWarningText(null);
      }
    });
  }
};

javascript.javascriptGenerator.forBlock['message_channel'] = function (block, generator) {
  return ['message.channel', javascript.Order.NONE];
};

Blockly.Blocks['message_guild'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("message server");
    this.setInputsInline(true);
    this.setOutput(true, "Guild");
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(function () {
      var parent = this.getRootBlock();
      
      if (!parent.type.startsWith('message_received')) {
        this.setWarningText('This block should be used in a "when message received" event');
      } else {
        this.setWarningText(null);
      }
    });
  }
};

javascript.javascriptGenerator.forBlock['message_guild'] = function (block, generator) {
  return ['message.guild', javascript.Order.NONE];
};

Blockly.Blocks['message_property'] = {
  init: function () {
    this.appendValueInput("MESSAGE")
      .setCheck("Message")
      .appendField(new Blockly.FieldDropdown([["content", "content"], ["id", "id"], ["creation date", "createdAt"], ["author", "author"], ["author member", "member"], ["channel", "channel"], ["server", "guild"], ["type", "type"], ["url", "url"]]), "PROPERTY")
      .appendField("of message");
    this.setInputsInline(true);
    this.setOutput(true, "String");
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange(function () {
      var type = this.getFieldValue('PROPERTY');

      if (type == 'channel') {
        this.setOutput(true, "Channel");
      } else if (type == 'guild') {
        this.setOutput(true, "Guild");
      } else if (type == 'author') {
        this.setOutput(true, "User");
      } else if (type == 'member') {
        this.setOutput(true, "Member");
      } else {
        this.setOutput(true, "String");
      }
    });
  }
};

javascript.javascriptGenerator.forBlock['message_property'] = function (block, generator) {
  var dropdown_property = block.getFieldValue('PROPERTY');
  var value_message = generator.valueToCode(block, 'MESSAGE', javascript.Order.ATOMIC);

  return [`${value_message}.${dropdown_property}`, javascript.Order.NONE];
};