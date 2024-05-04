Blockly.Blocks['embed_create'] = {
    init: function () {
        var validator = function (newValue) {
            return newValue.replace(/[^a-zA-Z0-9_$]/g, '');
        }

        this.appendDummyInput()
            .appendField("create embed named")
            .appendField(new Blockly.FieldTextInput("embed", validator), "NAME");
        this.appendStatementInput("EMBED")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#eb9d31");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['embed_create'] = function (block, generator) {
    var text_name = block.getFieldValue('NAME');
    var statements_embed = generator.statementToCode(block, 'EMBED');

    var code = `let embedCreator${text_name} = new EmbedBuilder()
${statements_embed}`;

    return code;
};

Blockly.Blocks['embed_settitle'] = {
    init: function () {
        this.appendValueInput("TITLE")
            .setCheck("String")
            .appendField("set title to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#eb9d31");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['embed_settitle'] = function (block, generator) {
    var value_title = generator.valueToCode(block, 'TITLE', javascript.Order.ATOMIC);

    return `.setTitle(${value_title})\n`;
};

Blockly.Blocks['embed_setcolour'] = {
    init: function () {
        this.appendValueInput("COLOUR")
            .setCheck("Colour")
            .appendField("set colour to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#eb9d31");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['embed_setcolour'] = function (block, generator) {
    var value_colour = generator.valueToCode(block, 'COLOUR', javascript.Order.ATOMIC);

    return `.setColor(${value_colour})\n`;
};

Blockly.Blocks['embed_setdescription'] = {
    init: function () {
        this.appendValueInput("DESCRIPTION")
            .setCheck("String")
            .appendField("set description to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#eb9d31");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['embed_setdescription'] = function (block, generator) {
    var value_description = generator.valueToCode(block, 'DESCRIPTION', javascript.Order.ATOMIC);

    return `.setDescription(${value_description})\n`;
};

Blockly.Blocks['embed_seturl'] = {
    init: function () {
        this.appendValueInput("URL")
            .setCheck("String")
            .appendField("set")
            .appendField(new Blockly.FieldDropdown([["image", "setImage"], ["thumbnail", "setThumbnail"], ["title", "setURL"]]), "TYPE")
            .appendField("url to");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#eb9d31");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['embed_seturl'] = function (block, generator) {
    var dropdown_type = block.getFieldValue('TYPE');
    var value_url = generator.valueToCode(block, 'URL', javascript.Order.ATOMIC);

    return `.${dropdown_type}(${value_url})`;
};

Blockly.Blocks['embed_setfooter'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("set footer");
        this.appendValueInput("TEXT")
            .setCheck("String")
            .appendField("text");
        this.appendValueInput("ICON")
            .setCheck("String")
            .appendField("(?) icon url");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#eb9d31");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['embed_setfooter'] = function (block, generator) {
    var value_text = generator.valueToCode(block, 'TEXT', javascript.Order.ATOMIC);
    var value_icon = generator.valueToCode(block, 'ICON', javascript.Order.ATOMIC);

    if (value_icon != '') {
        return `.setFooter({ text:${value_text},iconURL:${value_icon}})\n`;
    } else {
        return `.setFooter(${value_text})\n`;
    }
};

Blockly.Blocks['embed_addfield'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("add field");
        this.appendValueInput("TITLE")
            .setCheck("String")
            .appendField("title");
        this.appendValueInput("DESCRIPTION")
            .setCheck("String")
            .appendField("description");
        this.appendValueInput("INLINE")
            .setCheck("Boolean")
            .appendField("inline");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#eb9d31");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['embed_addfield'] = function (block, generator) {
    var value_title = generator.valueToCode(block, 'TITLE', javascript.Order.ATOMIC);
    var value_description = generator.valueToCode(block, 'DESCRIPTION', javascript.Order.ATOMIC);
    var value_inline = generator.valueToCode(block, 'INLINE', javascript.Order.ATOMIC);

    return `.addFields({ name:${value_title},value:${value_description},inline:${value_inline} })\n`;
};

Blockly.Blocks['embed_getembed'] = {
    init: function () {
        var validator = function (newValue) {
            return newValue.replace(/[^a-zA-Z0-9_$]/g, '');
        }

        this.appendDummyInput()
            .appendField("get embed with name")
            .appendField(new Blockly.FieldTextInput("embed", validator), "NAME");
        this.appendValueInput("CONTENT")
            .setCheck("String")
            .appendField("(?) with message content");
        this.setOutput(true, "Embed");
        this.setColour("#eb9d31");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['embed_getembed'] = function (block, generator) {
    var text_name = block.getFieldValue('NAME');
    var value_content = generator.valueToCode(block, 'CONTENT', javascript.Order.ATOMIC);

    var code = `{ embeds:[embedCreator${text_name}],content:${value_content} }`;

    return [code, javascript.Order.NONE];
};