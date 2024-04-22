Blockly.Blocks['text_newline'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("newline");
        this.setOutput(true, "String");
        this.setColour(165);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['text_newline'] = function (block, generator) {
    var code = "'\\n'";
    return [code, javascript.Order.NONE];
};