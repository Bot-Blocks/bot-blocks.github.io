Blockly.Blocks['slash_main'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create slash commands");
        this.appendStatementInput("CMDS")
            .setCheck(null);
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['slash_main'] = function (block, generator) {
    var statements_cmds = generator.statementToCode(block, 'CMDS');

    var code = `let slashCommands = async function() {
  const { REST, Routes } = require('discord.js');
      
  const commands = [${statements_cmds}];
      
  const rest = new REST().setToken(client.token);
      
  await rest.put(
    Routes.applicationCommands(message.client.user.id),
    { body: commands },
  );
};
slashCommands();\n`;

    return code;
};

Blockly.Blocks['slash_create'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("slash command");
        this.appendValueInput("NAME")
            .setCheck("String")
            .appendField("name");
        this.appendValueInput("DESCRIPTION")
            .setCheck("String")
            .appendField("description");
        this.appendStatementInput("INPUTS")
            .setCheck(null)
            .appendField("inputs");
        this.setInputsInline(false);
        this.setColour(230);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['slash_create'] = function (block, generator) {
    var value_name = generator.valueToCode(block, 'NAME', javascript.Order.ATOMIC);
    var value_description = generator.valueToCode(block, 'DESCRIPTION', javascript.Order.ATOMIC);
    var statements_inputs = generator.statementToCode(block, 'INPUTS');
    var code = `new SlashCommandBuilder().setName(${value_name}).setDescription(${value_description})${statements_inputs},`;
    return code;
};

Blockly.Blocks['slash_input'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("create")
            .appendField(new Blockly.FieldDropdown([["text", "String"], ["integer", "Integer"], ["number", "Number"], ["boolean", "Boolean"], ["user", "User"], ["channel", "Channel"], ["role", "Role"], ["attachment", "Attachment"]]), "TYPE")
            .appendField("input");
        this.appendValueInput("NAME")
            .setCheck("String")
            .appendField("name");
        this.appendValueInput("DESCRIPTION")
            .setCheck("String")
            .appendField("description");
        this.appendValueInput("REQUIRED")
            .setCheck("Boolean")
            .appendField("required");
        this.setInputsInline(false);
        this.setColour(220);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['slash_input'] = function (block, generator) {
    var type = block.getFieldValue('TYPE');
    var name = generator.valueToCode(block, 'NAME', javascript.Order.ATOMIC) || 'name';
    var description = generator.valueToCode(block, 'DESCRIPTION', javascript.Order.ATOMIC) || 'description';
    var required = generator.valueToCode(block, 'REQUIRED', javascript.Order.ATOMIC) || false;

    return `.add${type}Option(option => option.setName(${name}).setDescription(${description}).setRequired(${required}))`;
    return code;
};

Blockly.Blocks['slash_getinput'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("value of")
            .appendField(new Blockly.FieldDropdown([["text", "String"], ["integer", "Integer"], ["number", "Number"], ["boolean", "Boolean"], ["user", "User"], ["channel", "Channel"], ["role", "Role"], ["attachment", "Attachment"]]), "TYPE");
        this.appendValueInput("NAME")
            .setCheck("String")
            .appendField("input named");
        this.setInputsInline(true);
        this.setOutput(true, ["String", "Number", "Boolean", "User", "Channel", "Role", "Attachment"]);
        this.setColour(220);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['slash_getinput'] = function (block, generator) {
    var dropdown_type = block.getFieldValue('TYPE');
    var value_name = generator.valueToCode(block, 'NAME', javascript.Order.ATOMIC);

    var code = `interaction.options.get${dropdown_type}(${value_name})`;

    return [code, javascript.Order.NONE];
};

Blockly.Blocks['slash_received'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("when slash command runs");
        this.appendStatementInput("CODE")
            .setCheck(null);
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['slash_received'] = function (block, generator) {
    var statements_code = generator.statementToCode(block, 'CODE');
    var code = `client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
${code}});\n`;
    return code;
};

Blockly.Blocks['slash_commandname'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("command name");
        this.setOutput(true, "String");
        this.setOutputShape("1");
        this.setColour(240);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['slash_commandname'] = function (block, generator) {
    return ['interaction.commandName', javascript.Order.NONE];
};