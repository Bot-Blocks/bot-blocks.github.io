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
            .setCheck("Number")
            .appendField("channel with id equal to");
        this.setInputsInline(true);
        this.setOutput(true, null);
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

Blockly.Blocks['channel_channelid'] = {
    init: function () {
        this.appendValueInput("CHANNEL")
            .setCheck("Channel")
            .appendField("id of channel");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(15);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['channel_channelid'] = function (block, generator) {
    var value_channel = generator.valueToCode(block, 'CHANNEL', javascript.Order.ATOMIC);

    var code = `${value.channel}.id`;

    return [code, Blockly.javascript.ORDER_NONE];
};