function run(context, checkForUpdates, alwaysShowUpdateAlert, tab) {
    let sketch = context.api(),
        pluginsFolder = getPluginsFolder(),
        pluginFile = context.plugin.url().path()
    checkForUpdates = checkForUpdates || false
    alwaysShowUpdateAlert = alwaysShowUpdateAlert || false
    tab = tab || 0

    // Point to plugin directory this plugin is installed in
    if (loadFrameworks(sketch)) {
        [PluginManagerObjc startWithPluginDirectory:pluginsFolder
                                         pluginFile:pluginFile
                                    checkForUpdates:checkForUpdates
                              alwaysShowUpdateAlert:alwaysShowUpdateAlert
                                                tab:tab
        ];
        return true
    }
    
    return false
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

function loadFramework(frameworkName, frameworkClass, directory) {
    var mocha = [Mocha sharedRuntime];

    if (mocha.valueForKey(frameworkName) || NSClassFromString(frameworkClass) != null) {
        log("😎 " + frameworkName + " already loaded.")
        return true
    } else if([mocha loadFrameworkWithName:frameworkName inDirectory:directory]) {
        log("✅ " + frameworkName + " was loaded.")
        log(frameworkClass + ": " + NSClassFromString(frameworkClass))
        return true
    } else {
        log("❌ " + frameworkName + " could not be loaded.")
        return false
    }
}

function loadFrameworks(sketch) {
    let frameworkFolder = sketch.resourceNamed("Frameworks").path()

    return loadFramework('ObjectiveGit', 'GTRepository', frameworkFolder) &&
        loadFramework('DateTools', 'DTTimePeriod', frameworkFolder) &&
        loadFramework('MagicalRecord', 'MagicalRecord', frameworkFolder) &&
        loadFramework('SketchPluginManagerFramework', 'PluginManagerObjc', frameworkFolder);
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
