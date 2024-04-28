Blockly.Blocks['colour_hsv_sliders'] = {
    init: function () {
        this.appendDummyInput()
            .appendField('hsv')
            .appendField(new FieldColourHsvSliders('#ff0000'), 'COLOUR');
        this.setOutput(true, 'Colour');
        this.setStyle('colour_blocks');
    },
};

javascript.javascriptGenerator.forBlock['colour_hsv_sliders'] = function (block, generator) {
    const code = generator.quote_(block.getFieldValue('COLOUR'));
    return [code, javascript.Order.ATOMIC];
};