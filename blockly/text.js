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

Blockly.Blocks['text_multilineinput'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("multiline")
            .appendField(new Blockly.FieldImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAn0lEQVQI1z3OMa5BURSF4f/cQhAKjUQhuQmFNwGJEUi0RKN5rU7FHKhpjEH3TEMtkdBSCY1EIv8r7nFX9e29V7EBAOvu7RPjwmWGH/VuF8CyN9/OAdvqIXYLvtRaNjx9mMTDyo+NjAN1HNcl9ZQ5oQMM3dgDUqDo1l8DzvwmtZN7mnD+PkmLa+4mhrxVA9fRowBWmVBhFy5gYEjKMfz9AylsaRRgGzvZAAAAAElFTkSuQmCC", 12, 12, { alt: "\"", flipRtl: "TRUE" }))
            .appendField(new Blockly.FieldMultilineInput(), "TEXT")
            .appendField(new Blockly.FieldImage("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAKCAQAAAAqJXdxAAAAqUlEQVQI1z3KvUpCcRiA8ef9E4JNHhI0aFEacm1o0BsI0Slx8wa8gLauoDnoBhq7DcfWhggONDmJJgqCPA7neJ7p934EOOKOnM8Q7PDElo/4x4lFb2DmuUjcUzS3URnGib9qaPNbuXvBO3sGPHJDRG6fGVdMSeWDP2q99FQdFrz26Gu5Tq7dFMzUvbXy8KXeAj57cOklgA+u1B5AoslLtGIHQMaCVnwDnADZIFIrXsoXrgAAAABJRU5ErkJggg==", 12, 12, { alt: "\"", flipRtl: "TRUE" }));
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

javascript.javascriptGenerator.forBlock['text_multilineinput'] = function (block, generator) {
    var text = generator.multiline_quote_(block.getFieldValue('TEXT'));

    return [text, javascript.Order.ATOMIC];
};