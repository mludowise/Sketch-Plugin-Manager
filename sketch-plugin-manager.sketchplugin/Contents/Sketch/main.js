let kAutoReinstall = true

function run(context, appName, args) {
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

    try { // Attempt to open app via NSTask
        NSTask.launchedTaskWithLaunchPath_arguments(appUrl.URLByAppendingPathComponent("Contents/MacOS/" + appName).fileSystemRepresentation(), args)
    } catch(e) { // Fallback to launchApplication
        removeQuarentine(appUrl)
        let options = { "NSWorkspaceLaunchConfigurationArguments": args }
        NSWorkspace.sharedWorkspace().launchApplicationAtURL_options_configuration_error(appUrl, NSWorkspaceLaunchDefault, options, null)
    }
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

function removeQuarentine(appUrl) {
    try {
        NSTask.launchedTaskWithLaunchPath_arguments("/usr/bin/xattr", ["-dr", "com.apple.quarantine", appUrl.fileSystemRepresentation()])
        return true
    } catch(e) {
        log(e)
        return false
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
