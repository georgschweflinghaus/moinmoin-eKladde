moinmoin-eKladde
=================

A simple [MoinMoin][] theme based on memodump which features [Bootstrap 5][].  
Adapted to Bootstrap 5 including Bootstrap icons.
Featuring add sub page form.
Featuring improved textual edit mode.

You can create your own sidebar by creating a page called `SideBar`.

Tested with MoinMoin 1.9.11 on Python 2.7.17.

For details, please refer to [the project wiki][Wiki Home].


Screenshot
----------

![Main](https://github.com/dossist/moinmoin-memodump/wiki/memodump.png)

[More][Wiki Screenshots]


Install
-------

1. Get files by cloning the repository or download a zip and unpack it.  
   To clone:

    ```console
    $ git clone https://github.com/georgschweflinghaus/moinmoin-eKladde.git
    ```

2. Copy `ekladde.py` into plugin directory `data/plugin/theme/`.
   Location of the directory varies according to how you installed MoinMoin.

3. Copy directory `ekladde` into static files directory `MoinMoin/web/static/htdocs/`.
   Again location of that directory will vary. It could be:
    * `/usr/share/moin/htdocs` if you installed MoinMoin from Ubuntu package
    * `/usr/local/lib/python2.7/dist-packages/MoinMoin/web/static/htdocs` if you installed MoinMoin from zip
    * and so on

4. Done!
   If you run MoinMoin on a server, you might have to terminate running MoinMoin processes to reflect changes.  
   e.g. on Ubuntu:

    ```console
    $ pkill moin
    ```


How to use
----------

There are two ways to apply the theme.

### As your personal theme, keeping default theme unchanged ###

* Log into your wiki and go to user preferences page.
  (**Settings** near the upper left corner, then **Preferences**)
* Choose **ekladde** from Preferred theme dropdown box.
* Hit *save* button at the bottom of the page.

### As the default theme ###

Edit `wikiconfig.py` to change `theme_default`.

```python
    theme_default = 'ekladde'
```

Please note that indentations are important in python codes, and here you must
indent the line by exactly 4 spaces.


Customization
-------------
For details, please refer to [the project wiki][Wiki Home].


### SideBar ###

Create a page named `SideBar` to create your own site-wide sidebar.
In sidebar, list items receive special menu-like styles.  


### Site logo ###

If you go with the default wikiconfig, the default logo picture will run off the navbar height.
This theme is not optimized for the default logo picture (although it won't break page design).
By disabling the logo, MoinMoin will use your site name as a text logo with a link to the FrontPage.
To do it, just comment out `logo_string` in `wikiconfig.py`:

```python
    logo_string = ...
```
↓
```python
#   logo_string = ...
```


### Location area ###

On top of page contents, we have an area which shows where in the wiki you are now, and when it was updated last time.  
However, showing the info on every page feels a bit redundant.
You can define a list of pages which comes without the info.  
Define a list `memodump_hidelocation` in `wikiconfig.py`. The list has page names as its entries.  
Example:

        memodump_hidelocation = [page_front_page, u'SideBar', ]

By default, `page_front_page` is the only page in the list.


### Menu items ###

Basic knowledge of python language is required!

By defining `memodump_menuoverride` in `wikiconfig.py`, you can override menu entries.  
Example:

        memodump_menuoverride = [
            'raw',
            'print',
        ]

For details, please refer to [the project wiki][Wiki EditMenu].


Limitations
-----------

* Some words in the theme are not translated. (Can be translated via [WikiDictionary][Wiki Translation] pages, though)
* Sidebar area is reserved even if `SideBar` page does not exist nor is accessible.
* editbar and actionsMenu are replaced with the theme's own menu functionality, and settings
  on the replaced will not affect the new menu.
* Original actionsMenu were listing all additional actions automatically, but the menu of this theme
  won't do so automatically.


License and copyrights
----------------------

Copyright 2021 gejosch.  
This theme is licensed under [GNU GPL][].  
[Twitter Bootstrap][] is copyrighted by Twitter, Inc and licensed under [the MIT license][MIT].  
[MoinMoin][] is copyrighted by [The MoinMoin development team](https://moinmo.in/MoinCoreTeamGroup) and licensed under [GNU GPL][].  
Icons were taken from [Bootstrap icons](https://icons.getbootstrap.com/).  



[MoinMoin]: https://moinmo.in/
[Bootstrap 5]: https://getbootstrap.com/docs/5.0/getting-started/introduction/
[Wiki Home]: https://github.com/dossist/moinmoin-memodump/wiki
[Wiki EditMenu]: https://github.com/dossist/moinmoin-memodump/wiki/EditMenu
[Wiki Translation]: https://github.com/dossist/moinmoin-memodump/wiki/Translation
[Wiki Screenshots]: https://github.com/dossist/moinmoin-memodump/wiki/Screenshots
[GNU GPL]: http://www.gnu.org/licenses/gpl
[MIT]: https://github.com/twbs/bootstrap/blob/master/LICENSE
