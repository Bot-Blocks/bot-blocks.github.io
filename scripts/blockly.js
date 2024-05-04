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
    workspaceBackgroundColour: '#171717',
    toolboxBackgroundColour: 'blackBackground',
    toolboxForegroundColour: '#ffffff',
    flyoutBackgroundColour: '#1C1C1C',
    flyoutForegroundColour: '#ffffff',
    flyoutOpacity: 0.9,
    scrollbarColour: '#797979',
    insertionMarkerColour: '#ffffff',
    insertionMarkerOpacity: 0.3,
    scrollbarOpacity: 0.5,
    cursorColour: '#d0d0d0',
    blackBackground: '#202224',
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

const backpack = new Backpack(workspace);
backpack.init();

let localSaveCount = 4;
var javascriptCode = '';

async function bulkAddReservedWords(array) {
  if (!Array.isArray(array)) return;

  array.forEach(element => {
    javascript.javascriptGenerator.addReservedWords(String(element));
  });
}

bulkAddReservedWords([
  'forEachGuildServer','guildDelete','newMessage','oldMessage','deletedMessage','message','EmbedBuilder',
  'ActivityType','Events','Collection','SlashCommandBuilder','SlashCommandSubcommandBuilder',
  'PermissionsBitField','Discord','client','interaction','IntentsBitField'
]);

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

  let options = { indent_size: 2, space_in_empty_paren: true };

  code = js_beautify(code, options);

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

client.setMaxListeners(0);

client.on(Events.ClientReady, () => {
  console.log(\`I'm connected as \${client.user.tag}!\`);
});

${code}`;
}

workspace.addChangeListener(updateCode);
updateCode({ event:'event' });

function hasParentOfType(block, type) {
  var currentBlock = block;

  while (currentBlock.getParent()) {
    if (currentBlock.type == type) return true;
    
    currentBlock = currentBlock.getParent();
  }

  return false;
}

async function saveToFile() {
  var xmlDom = await Blockly.Xml.workspaceToDom(workspace);
  var xmlText = await Blockly.Xml.domToText(xmlDom);
  
  var blob = new Blob([xmlText], { type: "application/xml" });

  try {
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: "botblocks",
      types: [{
        description: "Bot Blocks Workspace",
        accept: { "application/xml": [".bbw"] },
      }]
    });
    
    const writableStream = await fileHandle.createWritable();
    
    await writableStream.write(blob);
    await writableStream.close();
    
    console.log("File saved successfully!");
  } catch (err) {
    let textErr = "Error saving file: " + err;
    window.alert(textErr);
    console.error(textErr);
  }
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

async function recoverProject() {
  let confirmRecover = await confirmPopup('Recover Project',"Are you sure? This should only be used if your project could not saved or for other cases. If you confirm, the current project will be replaced with the last attempted saved project.");

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

document.getElementById('alertpopup').style.display = 'none';
document.getElementById('javascriptcodepopup').style.display = 'none';

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
workspace.addChangeListener(shadowBlockConversionChangeListener);

let backpackStorage = localStorage.getItem('backpackContents');

if (backpackStorage) {
  backpack.setContents(backpackStorage.split('|'))
};

backpack.onContentChange = function() {
  localStorage.setItem('backpackContents', backpack.getContents().join('|'));
}

async function confirmPopup(title, content) {
  if (typeof content != 'string' || typeof title != 'string') return;

  document.getElementById('alertpopup').style.display = 'flex';
  document.getElementById('alertpopupcontentP').textContent = content;
  document.getElementById('alertpopupcontenttitle').textContent = title;

  document.getElementById('alertpopup').style.animation = 'appearIn 0.3s forwards';
  document.getElementById('alertpopupcontentdiv').style.animation = 'appearIn 0.3s forwards';

  return new Promise((resolve, reject) => {
    document.getElementById('alertpopupclosebutton').onclick = function () {
      document.getElementById('alertpopup').style.display = 'none';

      resolve(false);
    };

    document.getElementById('alertpopupacceptbutton').onclick = function () {
      document.getElementById('alertpopup').style.display = 'none';

      resolve(true);
    };
  });
}