let kAutoReinstall = false
let kDebug = true

function run(context, appName, args) {
    logInfo("run", true)

    if(!hasMinOSXVersion()) {
        return
    }

    let sketch = context.api(),
        appUrl = sketch.resourceNamed(appName + ".app")
        pluginsFolder = getPluginsFolder(),
        pluginFile = context.plugin.url().path()
    args = args || []

    args = args.concat([
        "-plugin-file", pluginFile,
        "-plugins-dir", pluginsFolder,
        "-auto-reinstall", kAutoReinstall.toString()
    ])

    logInfo("Arguments: " + args, true)

    let options = { "NSWorkspaceLaunchConfigurationArguments": args }
    NSWorkspace.sharedWorkspace().launchApplicationAtURL_options_configuration_error(appUrl, NSWorkspaceLaunchDefault, options, null)
    logInfo("end run", true)
}

function hasMinOSXVersion() {
    let currentVersion = NSProcessInfo.processInfo().operatingSystemVersionString()
    logInfo("System Version: " + currentVersion)

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
        logInfo("Plugins Folder URL: " + pluginsFolderURL, true)
        logInfo("URL Class: " + pluginsFolderURL.class(), true)
        logInfo("Plugins Folder: " + pluginsFolderURL.fileSystemRepresentation(), true)

        // Return default plugins folder from Sketch
        return pluginsFolderURL.fileSystemRepresentation()
    } catch(e) {
        // Falback in case Sketch Library changes
        logInfo(e)
        return "~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/"
    }
}

function debug(callback) {
    try {
        callback()
    } catch(e) {
		if (e != null) { // Null error means plugin was exited without error
			logInfo(e)
			alert(e, "Sketch Plugin Manager Error")
		}
	}
}

function alert(msg, title) {
	title = title || "Error occurred in Sketch Plugin Manager"
	var app = NSApplication.sharedApplication()
    app.displayDialog_withTitle(msg, title)
}

function logInfo(value, debug) {
    if (debug && !kDebug) {
        return
    }

    log(kAppBundleID + ": " + value)
}
