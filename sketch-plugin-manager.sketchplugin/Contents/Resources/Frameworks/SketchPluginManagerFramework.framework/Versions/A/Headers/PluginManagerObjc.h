//
//  PluginManagerObjc.h
//  SketchPluginManagerFramework
//
//  Created by Melissa Ludowise on 4/29/17.
//  Copyright © 2017 Mel Ludowise. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface PluginManagerObjc : NSObject

+(void) startWithPluginDirectory: (NSString*)pluginDirectory
                      pluginFile:(NSString*)pluginFile
                 checkForUpdates:(BOOL)checkForUpdates
           alwaysShowUpdateAlert:(BOOL)alwaysShowUpdateAlert
                   autoReinstall:(BOOL)autoReinstall
                             tab:(UInt8)tab;

+(void) stopManager;

@end
