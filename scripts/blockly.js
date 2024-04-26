function registerContextMenuOptions() {
  const workspaceItem = {
    displayText: 'Copy JavaScript Code',
    preconditionFn: function(scope) {
      if (scope.block.disabled) {
        return 'disabled';
      } else {
        return 'enabled';
      }
    },
    callback: function(scope) {
      const blockCode = Blockly.JavaScript.blockToCode(scope.block);

      navigator.clipboard.writeText(blockCode);
      console.log(String(blockCode));
    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    id: 'copy_js_block_code',
    weight: 100,
  };

  Blockly.ContextMenuRegistry.registry.register(workspaceItem);
}

registerContextMenuOptions();

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
    insertionMarkerColour: '#ffffff',
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
    colour: "#383838",
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

function emptyXml(xml) {
  return xml == '<xml xmlns="https://developers.google.com/blockly/xml"></xml>'  || xml == '';
}

function saveRecoverXmlProject() {
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  var xmlText = Blockly.Xml.domToText(xmlDom);

  if (emptyXml(xmlText)) return;

  localStorage.setItem("recoverXmlProject", xmlText);
}

function updateCode(event) {
  if (event?.type == 'viewport_change' || event?.type == 'toolbox_item_select') return;

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
  console.log(\`I'm connected as \${client.user.tag}!\`);
});

${code}`;
}

workspace.addChangeListener(updateCode);
updateCode({ event:'event' });

function saveToFile() {
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  var xmlText = Blockly.Xml.domToText(xmlDom);

  fileName += ".bbw"; // File format

  var blob = new Blob([xmlText], { type: "application/xml" });

  const fileHandle = window.showSaveFilePicker({
    suggestedName: "botblocks",
    types: [{
      description: "Bot Blocks Workspace",
      accept: { "application/xml": [".bbw"] },
    }]
  });

  const fileStream = fileHandle.createWritable();

  fileStream.write(blob);
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

        Blockly.Xml.domToWorkspace(xmlDom.documentElement, workspace);

        updateCode({ event:'event' });
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

    if (!recoverData) {
      return window.alert("Recovered project was not found. No changes were made");
    } else if (emptyXml(recoverData)) {
      return window.alert("Recovered project is empty. No changes were made");
    } else {
      workspace.clear();

      var parser = new DOMParser();
      var xmlDom = parser.parseFromString(recoverData, "application/xml");

      Blockly.Xml.domToWorkspace(xmlDom.documentElement, workspace);

      updateCode({ event:'event' });
    }
  }
}

function javascriptCodePopup() {
  document.getElementById('javascriptcodepopup').style.display = 'flex';
  document.getElementById('javascriptcodepopupCodeBlock').textContent = javascriptCode;
}

function closeJavascriptCodePopup() {
  document.getElementById('javascriptcodepopup').style.display = 'none';
}

function copyJavascriptCodePopup() {
  navigator.clipboard.writeText(javascriptCode);
  alert('Code was copied!');
}

window.addEventListener('beforeunload', function(event) {
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  var xmlText = Blockly.Xml.domToText(xmlDom);

  if (emptyXml(xmlText)) return;

  event.preventDefault();
});

workspace.addChangeListener(Blockly.Events.disableOrphans);