
function continueButtonPressed () {
    try {
        webkit.messageHandlers.continue.postMessage(null);
    } catch(err) {
        console.log('The native context does not exist yet');
    }
}

function reinstallPluginsButtonsPressed() {
    try {
        webkit.messageHandlers.reinstallPlugins.postMessage(null);
    } catch(err) {
        console.log('The native context does not exist yet');
    }
}
