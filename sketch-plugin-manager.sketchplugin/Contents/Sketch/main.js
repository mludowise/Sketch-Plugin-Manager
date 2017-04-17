function runApp(context, appName, args) {
    let sketch = context.api()
    let appUrl = sketch.resourceNamed(kHelperAppName)

    let pluginsFolder = getPluginsFolder()

    // Point to plugin directory this plugin is installed in
    var updatedArgs = [
        "-plugins-dir", pluginsFolder,
        "-plugin-file", context.plugin.url().path(),
    ]
    if (args != null) {
        updatedArgs = updatedArgs.concat(args)
    }

    let options = { "NSWorkspaceLaunchConfigurationArguments": updatedArgs }

    return [[NSWorkspace sharedWorkspace] launchApplicationAtURL:appUrl options:NSWorkspaceLaunchDefault configuration:options error:nil]
}

function getPluginsFolder() {
    try {
        // Return default plugins folder from Sketch
        return MSPluginManager.mainPluginsFolderURL().fileSystemRepresentation()
    } catch(e) {
        // Falback in case Sketch Library changes
        log(e)
        return "~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/"
    }
}

function debug(callback) {
    try {
        callback()
    } catch(e) {
		if (e != null) { // Null error means plugin was exited without error
			log(e)
			alert(e, "Sketch Plugin Manager Error")
		}
	}
}

function alert(msg, title) {
	title = title || "Error occurred in Sketch Plugin Manager"
	var app = NSApplication.sharedApplication()
    app.displayDialog_withTitle(msg, title)
}
