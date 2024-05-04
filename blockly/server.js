Blockly.Blocks['server_getbyid'] = {
    init: function () {
        this.appendValueInput("ID")
            .setCheck("String")
            .appendField("server with id equal to");
        this.setInputsInline(true);
        this.setOutput(true, "Guild");
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['server_getbyid'] = function (block, generator) {
    var value_id = generator.valueToCode(block, 'ID', javascript.Order.ATOMIC);

    var code = `client.guilds.cache.get(${value_id})`;

    return [code, javascript.Order.NONE];
};

Blockly.Blocks['server_properties'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["name", "name"], ["acronym", "nameAcronym"], ["id", "id"], ["bot join date", "joinedAt"], ["owner id", "ownerId"], ["MFA level", "mfaLevel"], ["NSFW level", "nsfwLevel"], ["amount of members", "memberCount"], ["amount of users", "members.cache.filter(u => !u.bot).size"], ["amount of bots", "members.cache.filter(u => u.bot).size"]]), "PROPERTY");
        this.appendValueInput("GUILD")
            .setCheck("Guild")
            .appendField(new Blockly.FieldLabelSerializable("of server"), "LABEL");
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(function () {
            var type = this.getFieldValue('PROPERTY');
            
            let numberArr = ["memberCount", "members.cache.filter(u => !u.bot).size", "members.cache.filter(u => u.bot).size"];
            
            if (numberArr.indexOf(type) !== -1) {
                this.setOutput(true, "Number");
                this.setFieldValue('in server', 'LABEL');
            } else if (type == "joinedAt"){
                this.setOutput(true, "Date");
                this.setFieldValue('of server', 'LABEL');
            } else {
                this.setOutput(true, "String");
                this.setFieldValue('of server', 'LABEL');
            }
        });
    }
};

javascript.javascriptGenerator.forBlock['server_properties'] = function (block, generator) {
    var dropdown_property = block.getFieldValue('PROPERTY');
    var value_guild = generator.valueToCode(block, 'GUILD', javascript.Order.ATOMIC);

    var code = `${value_guild}.${dropdown_property}`;

    return [code, javascript.Order.NONE];
};

Blockly.Blocks['server_disableinvites'] = {
    init: function () {
        this.appendValueInput("GUILD")
            .setCheck("Guild")
            .appendField("disable invites on server");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['server_disableinvites'] = function (block, generator) {
    var value_guild = generator.valueToCode(block, 'GUILD', javascript.Order.ATOMIC);

    return `${value_guild}.disableInvites(true);\n`;
};

Blockly.Blocks['server_enableinvites'] = {
    init: function () {
        this.appendValueInput("GUILD")
            .setCheck("Guild")
            .appendField("enable invites on server");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['server_enableinvites'] = function (block, generator) {
    var value_guild = generator.valueToCode(block, 'GUILD', javascript.Order.ATOMIC);

    return `${value_guild}.disableInvites(false);\n`;
};

Blockly.Blocks['server_foreach'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("for each server the bot is in");
        this.appendStatementInput("CODE")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['server_foreach'] = function (block, generator) {
    var statements_code = generator.statementToCode(block, 'CODE');

    return `client.guilds.cache.each(forEachGuildServer => {
${statements_code}});\n`;
};

Blockly.Blocks['server_foreachvariable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("server");
        this.setOutput(true, null);
        this.setColour(0);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(function () {
            if (!hasParentOfType(this, 'server_foreach')) {
                this.setWarningText('This block should be used inside a "for each server the bot is in" block');
            } else {
                this.setWarningText(null);
            }
        });
    }
};

javascript.javascriptGenerator.forBlock['server_foreachvariable'] = function (block, generator) {
    return ['forEachGuildServer', javascript.Order.NONE];
};