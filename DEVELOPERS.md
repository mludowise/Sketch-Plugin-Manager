Plugin Developers
=================

To add your plugin to **Sketch Plugin Manager**, register your plugin with the [Sketch Plugin Directory](https://github.com/sketchplugins/plugin-directory/) by following their [contribution instructions](https://github.com/sketchplugins/plugin-directory/blob/master/CONTRIBUTING.md).

Tips
----
**Sketch Plugin Manager** uses [Sketch Plugin Directory Plus](https://github.com/mludowise/sketch-plugin-directory-plus) to display plugins in its Catalog. Check there an hour after registering your plugin to verify it was added correctly and follow the guidelines below.

  1. Host your plugin publicly on [GitHub](https://github.com) so that **Sketch Plugin Manager** can use your GitHub repository to check for updates. If for some reason, you don't want to do this, you should implement your own method of updating your plugin.

  2. When you register your plugin with the [Sketch Plugin Directory](https://github.com/sketchplugins/plugin-directory/) use the following guidelines when adding it to [plugins.json](https://github.com/sketchplugins/plugin-directory/blob/master/plugins.json).
      - **owner** & **name** &ndash; These must match the owner and name of your GitHub repository. You can find the owner and name from the URL of the GitHub project `https://github.com/{owner}/{name}`. For example, the owner of this repository is `mludowise` and name is `Sketch-Plugin-Manager`.
      - **title** (optional) &ndash; This is the display name for your plugin. If this is not included, the **name** field will be used as the display name for your plugin.
        - _Note that at least one of **title** or **name** is required. If you do not include at least one of these fields, **Sketch Plugin Manager** will not display your plugin in the Catalog._
      - **author** (optional) &ndash; The name of the plugin author. If this is not included, **owner** will be used instead.
      - **description** (required) &ndash; This should be a 1 sentence description of what your plugin can do.
      - **homepage** (optional) &ndash; This should point to a URL about your app. If it's not included, your GitHub project homepage will be used instead.
        - _If your plugin is not hosted on GitHub, this is required to direct users to a website where they can download your plugin from._
        
  3. It is highly recommended that you check your **manifest.json** file is valid JSON with a [JSON Validator](https://jsonformatter.curiousconcept.com/) and
include the following in your plugin's **manifest.json** file:
      - **version** &ndash; This will be displayed in **Sketch Plugin Manager** to identify the currently installed version as well as the new version for updates. It's highly recommended that you increment this when making updates to your plugin.
      - **identifier** &ndash; This should be a unique identifier for your plugin. **Sketch Plugin Manager** uses this identifier to match the user's currently installed plugins to plugins registered in the [Plugin Directory](https://github.com/sketchplugins/plugin-directory/).
      
  4. To include an icon for your plugin:
      - Create a file in your plugin directory under `{plugin name}.sketchplugin/Contents/Resources/icon.png`.
      - It's recommended that you use a minumum size of 300x300px so it displays nicely on retina displays.
      - _Note that if your plugin is not hosted on GitHub, the icon will only be displayed in the **Installed** and **Updates** tabs and not in the **Catalog** tab._
