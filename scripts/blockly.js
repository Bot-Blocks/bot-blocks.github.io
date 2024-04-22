const DarkTheme = Blockly.Theme.defineTheme('DarkTheme', {
  base: Blockly.Themes.Classic,
  componentStyles: {
    workspaceBackgroundColour: '#1e1e1e',
    toolboxBackgroundColour: 'blackBackground',
    toolboxForegroundColour: '#fff',
    flyoutBackgroundColour: '#252526',
    flyoutForegroundColour: '#ccc',
    flyoutOpacity: 1,
    scrollbarColour: '#797979',
    insertionMarkerColour: '#fff',
    insertionMarkerOpacity: 0.3,
    scrollbarOpacity: 0.4,
    cursorColour: '#d0d0d0',
    blackBackground: '#333',
  },
});

const LightTheme = Blockly.Theme.Classic;

// Initialize Blockly workspace
const workspace = Blockly.inject("blocklyDiv", {
  toolbox: document.getElementById("toolbox"),
  grid: {
    spacing: 20,
    length: 3,
    colour: "#ccc",
    snap: false,
  },
  trashcan: true,
  theme: DarkTheme,
  renderer: "zelos",
  sounds: true,
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.18,
    scaleSpeed: 1.2,
    pinch: true,
  },
});

let localSaveCount = 4;
var javascriptCode = '';

function saveRecoverXmlProject() {
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  var xmlText = Blockly.Xml.domToText(xmlDom);

  if (xmlText == "") return;

  localStorage.setItem("recoverXmlProject", xmlText);
}

function updateCode(event) {
  if (event.type == "viewport_change" || event.type == "toolbox_item_select") return;

  localSaveCount -= 1;

  if (localSaveCount < 0) {
    localSaveCount = 4;
    saveRecoverXmlProject();
  }

  var code = Blockly.JavaScript.workspaceToCode(workspace);

  javascriptCode = `const Discord = require("discord.js");
const {
  EmbedBuilder,
  ActivityType,
  Events,
  Collection,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  PermissionsBitField
} = require("discord.js");

const client = new Discord.Client({
  intents: [
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildMessages,
    Discord.IntentsBitField.Flags.MessageContent,
    Discord.IntentsBitField.Flags.GuildPresences,
    Discord.IntentsBitField.Flags.GuildMessageReactions
  ]
});

client.on(Events.ClientReady, () => {
  console.log(\`I'm connected as \${client.user.username}!\`);
});

${code}`;
}

function runCode() {
  try {
    eval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (err) {
    window.alert(err);
  }
}

workspace.addChangeListener(updateCode);
updateCode({ type: "yourmum" });

function saveToFile() {
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  var xmlText = Blockly.Xml.domToText(xmlDom);

  var fileName = prompt("Enter a file name:", "Blockly");

  if (fileName === null) {
    return;
  }

  fileName += ".bbw"; // File format

  var blob = new Blob([xmlText], { type: "application/xml" });
  var link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  link.remove();
}

function loadFromFile() {
  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".bbw";

  fileInput.addEventListener("change", function (e) {
    var file = e.target.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (event) {
        var xmlData = event.target.result;
        workspace.clear();

        var parser = new DOMParser();
        var xmlDom = parser.parseFromString(xmlData, "application/xml");

        window.mouse
        Blockly.Xml.domToWorkspace(xmlDom.documentElement, workspace);

        updateCode({ type: "yourmum" });
      };

      reader.readAsText(file);
    }
  });

  fileInput.click();
  fileInput.remove();
}

function recoverProject() {
  let confirmRecover = window.confirm(
    "Are you sure? This should only be used if your project could not saved or for other cases. If you confirm, the current project will be replaced will the last attempted saved project"
  );

  if (confirmRecover) {
    const recoverData = localStorage.getItem("recoverXmlProject");

    if (recoverData == null) {
      return window.alert("Recovered project was not found. No changes were made");
    } else if (recoverData == '<xml xmlns="https://developers.google.com/blockly/xml"></xml>') {
      return window.alert("Recovered project is empty. No changes were made");
    } else {
      workspace.clear();

      var parser = new DOMParser();
      var xmlDom = parser.parseFromString(recoverData, "application/xml");

      Blockly.Xml.domToWorkspace(xmlDom.documentElement, workspace);

      updateCode({ type: "yourmum" });
    }
  }
}

function javascriptCodePopup() {
  document.getElementById('javascriptcodepopup').style.display = 'block';
  document.getElementById('javascriptcodepopupCodeBlock').textContent = javascriptCode;
}

function closeJavascriptCodePopup() {
  document.getElementById('javascriptcodepopup').style.display = 'none';
}

window.addEventListener('beforeunload', function(event) {
  event.preventDefault();
});
