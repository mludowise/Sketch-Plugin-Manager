Translation Help
================

If you're fluent in multiple languages, you can help Sketch Plugin Manager by translating it into additional languages.

Specifically, I would like to translate into the following languages, but help with additional languages is always welcome.
 * Chinese (Simplified)
 * German
 * French
 * Spanish
 * Italian
 * Portuguese

How to Help
-----------

If you're comfortable using Git, the easiest way to contribute is to clone this repository and open a Pull Request. If you're not comfortable opening Pull Requests, you can instead open an issue.

### To Open a Pull Request

1. Clone this repository and checkout the `localize` branch:
```
git clone git@github.com:mludowise/Sketch-Plugin-Manager.git
git checkout localize
```
2. Copy the `base.lproj` directory and rename it to `[language code].lproj` using the appropriate [Apple supported language code](http://www.ibabbleon.com/iOS-Language-Codes-ISO-639.html). For example, simplified Chinese would be named `zh-Hans.lproj`, Spanish would be named `es.lproj`, etc.
3. Open the `Localizable.strings` file and translate each string to the appropriate language (more details below).
4. Create a pull request to be merged back into the `localize` branch.

### To Open an Issue

1. Download and unzip [localize.zip](https://github.com/mludowise/Sketch-Plugin-Manager/archive/localize.zip).
2. Open the `Localizable.strings` file located in the `base.lproj` folder.
3. Translate each string to the appropriate language (more details below).
4. Create a [New Issue](https://github.com/mludowise/Sketch-Plugin-Manager/issues/new):
   - Attach the updated `Localizable.strings` file.
   - Specify which language you're translating into.

### Translating Localizable.strings

The `Localizable.strings` file is in a special format used by Apple to translate text.

Most of the file looks something like this:
```
/* No comment provided by engineer. */
"1 Update Available" = "1 Update Available";

/* {author.name} */
"<i>by</i> %@" = "<i>by</i> %@";
```

Notation like `%@` or `%d` represents a variable that will be substituted in code. See the comment understand what the variable will be replaced with. In the above example, `%@` will be replaced with the author's name.

To translate a line of text, translate the right-side of the statement to another language. It's important to leave the left-side of the statement the same. For example, translating the above example to Spanish would look like this:
```
/* No comment provided by engineer. */
"1 Update Available" = "1 Actualización Disponible";

/* {author.name} */
"<i>by</i> %@" = "<i>por</i> %@";
```

Translating the Website
-----------------------

You can also help translate [Sketch Plugin Manager's website](https://mludowise.github.io/Sketch-Plugin-Manager/) by translating the [README.md](https://github.com/mludowise/Sketch-Plugin-Manager/blob/master/README.md) file located on the master branch. You can either open a Pull Request or create a new Issue.

### To Open a Pull Request
1. Clone this repository and checkout the `master` branch:
```
git clone git@github.com:mludowise/Sketch-Plugin-Manager.git
git checkout master
```
2. Copy the `README.md` file and rename it to `README-[code].md` using the appropriate [ISO 639-1 Language Code](http://www.metamodpro.com/browser-language-codes) (note that these are slightly different from Apple's codes). For example, Chinese (PRC) would be named `README-zh-cn.md`, Spanish would be named `README-es.md`, etc.
3. Open the copied README file and translate it.
4. Create a pull request to be merged back into the `master` branch.

### To Open an Issue
1. Download and unzip [master.zip](https://github.com/mludowise/Sketch-Plugin-Manager/archive/master.zip).
2. Open the `README.md` file.
3. Translate the file into the appropriate language.
4. Create a [New Issue](https://github.com/mludowise/Sketch-Plugin-Manager/issues/new):
   - Attach the updated `README.md` file.
   - Specify which language you're translating into.
