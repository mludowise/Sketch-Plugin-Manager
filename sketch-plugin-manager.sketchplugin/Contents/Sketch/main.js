let kAutoReinstall = false

function run(context, appName, args) {
    log("run")

    if(!hasMinOSXVersion()) {
        return
    }

    let sketch = context.api(),
        appUrl = sketch.resourceNamed(appName + ".app")
        pluginsFolder = getPluginsFolder(),
        pluginFile = context.plugin.url().path()
    args = args || []

    args.concat([
        "-plugin-file", pluginFile,
        "-plugins-dir", pluginsFolder,
        "-auto-reinstall", kAutoReinstall
    ])

    let options = { "NSWorkspaceLaunchConfigurationArguments": args }
    NSWorkspace.sharedWorkspace().launchApplicationAtURL_options_configuration_error(appUrl, NSWorkspaceLaunchDefault, options, null)
    log("end run")
}

function hasMinOSXVersion() {
    let currentVersion = NSProcessInfo.processInfo().operatingSystemVersionString()
    log("System Version: " + currentVersion)

    try {
        if (NSAppKitVersionNumber >= NSAppKitVersionNumber10_12) {
            return true
        }
    } catch (e) { }

    alert("Sketch Plugin Manager requires OS X Version 10.12 (Sierra) or higher.\n\nYour system is running " + currentVersion, "Minimum System Requirements")

    return false
}

function getPluginsFolder() {
    try {
        let pluginsFolderURL = MSPluginManager.mainPluginsFolderURL()
        log("Plugins Folder URL: " + pluginsFolderURL)
        log("URL Class: " + pluginsFolderURL.class())
        log("Plugins Folder: " + pluginsFolderURL.fileSystemRepresentation())

        // Return default plugins folder from Sketch
        return pluginsFolderURL.fileSystemRepresentation()
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
