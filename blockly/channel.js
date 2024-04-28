Blockly.Blocks['channel_sendchannel'] = {
    init: function () {
        this.appendValueInput("VALUE")
            .setCheck(["String", "Embed"])
            .appendField("send");
        this.appendValueInput("CHANNEL")
            .setCheck("Channel")
            .appendField("to channel");
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(15);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['channel_sendchannel'] = function (block, generator) {
    var value_value = generator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC);
    var value_channel = generator.valueToCode(block, 'CHANNEL', javascript.Order.ATOMIC);

    var code = `${value_channel}.send(${value_value});\n`;

    return code;
};

Blockly.Blocks['channel_channelwithid'] = {
    init: function () {
        this.appendValueInput("ID")
            .setCheck("String")
            .appendField("channel with id equal to");
        this.setInputsInline(true);
        this.setOutput(true, "Channel");
        this.setColour(15);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['channel_channelwithid'] = function (block, generator) {
    var value_id = generator.valueToCode(block, 'ID', javascript.Order.ATOMIC);

    var code = `client.channels.cache.get(${value_id})`;

    return [code, javascript.Order.NONE];
};

// deprecated
Blockly.Blocks['channel_channelid'] = {
    init: function () {
        this.appendValueInput("CHANNEL")
            .setCheck("Channel")
            .appendField("id of channel");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour(15);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

// deprecated
javascript.javascriptGenerator.forBlock['channel_channelid'] = function (block, generator) {
    var value_channel = generator.valueToCode(block, 'CHANNEL', javascript.Order.ATOMIC);

    var code = `${value_channel}.id`;

    return [code, javascript.Order.NONE];
};

Blockly.Blocks['channel_properties'] = {
    init: function () {
        this.appendValueInput("CHANNEL")
            .setCheck("Channel")
            .appendField(new Blockly.FieldDropdown([["name", "name"], ["id", "id"], ["position", "position"], ["type", "type"], ["url", "url"], ["last message", "lastMessage"], ["category", "parent"], ["slowmode", "rateLimitPerUser"], ["creation date", "createdAt"]]), "PROPERTY")
            .appendField("of channel");
        this.setInputsInline(true);
        this.setOutput(true, ["String", "Number", "Message", "Category", "Date"]);
        this.setColour(15);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['channel_properties'] = function (block, generator) {
    var dropdown_property = block.getFieldValue('PROPERTY');
    var value_channel = generator.valueToCode(block, 'CHANNEL', javascript.Order.ATOMIC);

    var code = `${value_channel}.${dropdown_property}`;

    return [code, javascript.Order.NONE];
};

Blockly.Blocks['channel_boolean'] = {
    init: function () {
        this.appendValueInput("CHANNEL")
            .setCheck("Channel")
            .appendField("is channel");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["a text channel", "isTextBased()"], ["a voice channel", "isVoiceBased()"], ["a thread", "isThread()"], ["viewable by the bot", "viewable"], ["manageable by the bot", "manageable"], ["deletable by the bot", "deletable"], ["partial", "partial"]]), "PROPERTY")
            .appendField("?");
        this.setInputsInline(true);
        this.setOutput(true, "Boolean");
        this.setColour(15);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['channel_boolean'] = function (block, generator) {
    var value_channel = generator.valueToCode(block, 'CHANNEL', javascript.Order.ATOMIC);
    var dropdown_property = block.getFieldValue('PROPERTY');

    var code = `${value_channel}.${dropdown_property}`;

    return [code, javascript.Order.NONE];
};