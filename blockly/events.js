Blockly.Blocks['events_guildcreate'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when the bot joins a server");
        this.appendStatementInput("CODE")
            .setCheck(null);
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['events_guildcreate'] = function (block, generator) {
    var statements_code = generator.statementToCode(block, 'CODE');

    var code = `Client.on(Events.GuildCreate, async (guildCreate) => {
${statements_code}});`;

    return code;
};

Blockly.Blocks['events_guildcreatevariable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("server the bot joined");
        this.setOutput(true, "Guild");
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(function () {
            var parent = this.getRootBlock();

            if (parent.type != ('events_guildcreate')) {
                this.setWarningText('This block should be used in a "when the bot joins a server" event');
            } else {
                this.setWarningText(null);
            }
        });
    }
};

javascript.javascriptGenerator.forBlock['events_guildcreatevariable'] = function (block, generator) {
    return ['guildCreate', javascript.Order.NONE];
};

Blockly.Blocks['events_guilddelete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when the bot leaves from a server");
        this.appendStatementInput("CODE")
            .setCheck(null);
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['events_guilddelete'] = function (block, generator) {
    var statements_code = generator.statementToCode(block, 'CODE');

    var code = `Client.on(Events.GuildDelete, async (guildDelete) => {
${statements_code}});`;

    return code;
};

Blockly.Blocks['events_guilddeletevariable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("server the bot left");
        this.setOutput(true, "Guild");
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(function () {
            var parent = this.getRootBlock();

            if (String(parent.type) != ('events_guilddelete')) {
                this.setWarningText('This block should be used in a "when the bot leaves from a server" event');
            } else {
                this.setWarningText(null);
            }
        });
    }
};

javascript.javascriptGenerator.forBlock['events_guilddeletevariable'] = function (block, generator) {
    return ['guildDelete', javascript.Order.NONE];
};

Blockly.Blocks['events_messagedelete'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when a message is deleted");
        this.appendStatementInput("CODE")
            .setCheck(null);
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Blocks['events_messageedited'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when a message is edited");
        this.appendStatementInput("CODE")
            .setCheck(null);
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['events_messagedelete'] = function (block, generator) {
    var statements_code = generator.statementToCode(block, 'CODE');

    var code = `Client.on(Events.MessageDelete, async (deletedMessage) => {
${statements_code}});`;

    return code;
};

javascript.javascriptGenerator.forBlock['events_messageedited'] = function (block, generator) {
    var statements_code = generator.statementToCode(block, 'CODE');

    var code = `Client.on(Events.MessageUpdate, async (oldMessage, newMessage) => {
${statements_code}});`;

    return code;
};

Blockly.Blocks['events_messagedeletevariable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("message deleted");
        this.setOutput(true, "Message");
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(function () {
            var parent = this.getRootBlock();

            if (String(parent.type) != ('events_messagedelete')) {
                this.setWarningText('This block should be used in a "when a message is deleted" event');
            } else {
                this.setWarningText(null);
            }
        });
    }
};

Blockly.Blocks['events_messageeditedvariable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("old message");
        this.setOutput(true, "Message");
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(function () {
            var parent = this.getRootBlock();

            if (String(parent.type) != ('events_messageedited')) {
                this.setWarningText('This block should be used in a "when a message is edited" event');
            } else {
                this.setWarningText(null);
            }
        });
    }
};
Blockly.Blocks['events_messageeditednewvariable'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("new message");
        this.setOutput(true, "Message");
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");

        this.setOnChange(function () {
            var parent = this.getRootBlock();

            if (String(parent.type) != ('events_messageedited')) {
                this.setWarningText('This block should be used in a "when a message is edited" event');
            } else {
                this.setWarningText(null);
            }
        });
    }
};

javascript.javascriptGenerator.forBlock['events_messagedeletevariable'] = function (block, generator) {
    return ['deletedMessage', javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['events_messageeditedvariable'] = function (block, generator) {
    return ['oldMessage', javascript.Order.NONE];
};

javascript.javascriptGenerator.forBlock['events_messageeditednewvariable'] = function (block, generator) {
    return ['newMessage', javascript.Order.NONE];
};