//
//  PluginManager.swift
//  Sketch Plugin Manager
//
//  Created by Melissa Ludowise on 4/28/17.
//  Copyright © 2017 Mel Ludowise. All rights reserved.
//

import Cocoa

@objc public final class PluginManager: NSObject, PluginManagerProtocol {
    
    static let finishedLoadingNotificationName = NSNotification.Name(rawValue: "PluginManager.finishedLoading")
    
    private static var sharedManager: PluginManager?
    
    // For debug purposes. Change to false to skip reloading the catalog view.
    private var reloadCatalog = true
    
    private var localPluginManagerFinishedLoading = false
    private var catalogManagerFinishedLoading = false
    
    private var autoReinstall = true
    
    private var isRunning = false
    
    var pluginFile: String? = nil {
        didSet {
            if let _pluginFile = pluginFile {
                let expandedFile = (_pluginFile as NSString).expandingTildeInPath
                if FileManager.default.fileExists(atPath: expandedFile) {
                    pluginFile = expandedFile
                } else {
                    pluginFile = nil
                }
            }
        }
    }
    
    private override init() {
        super.init()
        
        // Register for notifications
        NotificationCenter.default.addObserver(self, selector: #selector(localPluginManagerDidFinishLoading), name: LocalPluginManager.finishedLoadingNotificationName, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(catalogPluginManagerDidFinishLoading), name: CatalogManager.finishedLoadingNotificationName, object: nil)
        
        // Perform cleanup when application terminates
        NotificationCenter.default.addObserver(self, selector: #selector(applicationWillTerminate), name: NSNotification.Name.NSApplicationWillTerminate, object: NSApplication.shared())
    }
    
    @objc public static func shared() -> PluginManager {
        if sharedManager == nil {
            sharedManager = PluginManager()
        }
        
        return sharedManager!
    }
    
    // MARK: - Start
    
    @objc public func start(pluginDirectory: String? = nil, pluginFile: String? = nil, checkForUpdates: Bool = false, alwaysShowUpdateAlert: Bool = false, autoReinstall: Bool = true, tab: UInt8 = 0) {
        
        // Do nothing if the manager is already running
        if isRunning {
            return
        }
        
        // Mark that plugin manager is open
        isRunning = true
        
        if let pluginDirectory = pluginDirectory {
            LocalPluginManager.shared().pluginDirectories = [pluginDirectory]
        }
        
        if let pluginFile = pluginFile {
            PluginManager.shared().pluginFile = pluginFile
        }
        
        self.autoReinstall = autoReinstall
        
        let windowManager = WindowManager.shared()
        windowManager.shouldCheckForUpdates = checkForUpdates
        windowManager.alwaysShowUpdateAlert = alwaysShowUpdateAlert
        
        // Set initial tab for main window
        windowManager.tab = WindowTab(rawValue: tab) ?? .catalog
        
        // Load plugins & open window
        windowManager.start()
        loadPlugins()
    }
    
    // MARK: - Load and cleanup
    
    func loadPlugins() {
        localPluginManagerFinishedLoading = false
        catalogManagerFinishedLoading = false
        
        // Load plugins
        if reloadCatalog {
            CatalogManager.shared().loadPlugins()
        }
        LocalPluginManager.shared().loadPlugins()
    }
    
    @objc public func stopManager() {
        CatalogManager.shared().stopManager()
        LocalPluginManager.shared().stopManager()
        
        // Mark that plugin manager is no longer open
        isRunning = false
    }
    
    @objc private func applicationWillTerminate() {
        MagicalRecord.cleanUp()
    }
    
    // MARK: - Check if this plugin needs to be reinstalled
    
    // Check if this plugin has a repo and reinstall it if it does not
    private func checkForReinstall() {
        // Check if auto-reinstall is disabled
        if !autoReinstall {
            return
        }
        
        // Get current plugins directory and current plugin file
        guard let pluginsDirectory = LocalPluginManager.shared().pluginDirectories.first,
            let pluginFile = pluginFile else {
                return
        }
        
        // Verify that pluginFile is contained in the pluginsDirectory
        if !pluginFile.hasPrefix(pluginsDirectory) {
            return
        }
        
        // Get filename relative to plugins directory
        var components = (pluginFile as NSString).pathComponents
        let directoryComponentsCount = (pluginsDirectory as NSString).pathComponents.count
        components.removeFirst(directoryComponentsCount)
        let relativeFileName = components.joined(separator: "/")
        
        // Check that plugin exists
        guard let plugin = LocalPlugin.mr_findFirst(with: NSPredicate(format: "(fileName == %@) AND (path == %@)", relativeFileName, pluginsDirectory)) else {
            return
        }
        
        // Reinstall if unmanaged
        if plugin.isUnmanaged {
            let installManager = GitInstallPluginManager(repoUrl: kPluginManagerRepo, errorHandler: { (error) in
                print("Error reinstalling Plugin Manager: %@", error)
            })
            DispatchQueue.global().async {
                installManager.reinstall(overwritePlugin: plugin)
            }
        }
    }
    
    // MARK: - Notification handling
    
    // Wait until both local and catalog plugins are finished loading to find potential catalog matches
    
    @objc private func localPluginManagerDidFinishLoading() {
        if catalogManagerFinishedLoading || !reloadCatalog {
            localAndCatalogPluginManagersDidFinishLoading()
        } else {
            localPluginManagerFinishedLoading = true
        }
    }
    
    @objc private func catalogPluginManagerDidFinishLoading() {
        if localPluginManagerFinishedLoading {
            localAndCatalogPluginManagersDidFinishLoading()
        } else {
            catalogManagerFinishedLoading = true
        }
    }
    
    private func localAndCatalogPluginManagersDidFinishLoading() {
        LocalPluginManager.shared().linkUnmanagedPlugins()
        checkForReinstall()
        NotificationCenter.default.post(Notification(name: PluginManager.finishedLoadingNotificationName))
    }
}
