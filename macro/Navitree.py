# -*- coding: iso-8859-1 -*-
"""
    MoinMoin - Navitree Macro

    Originally authored by Jennifer Vanderputten (Jen@RabidWeasel.com)
    Based on Navigation.py

    Copyright(c) 2021 Georg Schweflinghaus
    Usage:
    1. copy to wiki/data/plugin/macro/
    2. in wiki if editing page content add e.g.:
        <<Navitree(childtree,2)>>     for a childtree depths 2 (default unordered list)
        <<Navitree(childtree,2,ol)>>  for a childtree depth 2 (ordered list style)
"""

import re
from MoinMoin import config
from MoinMoin.Page import Page

Dependencies = ["namespace"]

def _getParent(pagename):
    """ Return parent of pagename.
    """
    pos = pagename.rfind('/')
    if pos >= 0:
        return pagename[:pos]
    return None


def _getPages(request, filter_regex=None):
    """ Return a (filtered) list of pages names.
    """
    filter = None
    if filter_regex:
        filter = re.compile(filter_regex).match
    pages = request.rootpage.getPageList(filter=filter)
    pages.sort()
    return pages


def _getLinks(request, pagename, filter_regex=None):
    """ Return pagename for up, first, prev, next, last; each can be None.
    """
    pos, size, first, prev, next, last = 0, 0, None, None, None, None

    all_pages = _getPages(request, filter_regex)
    size = len(all_pages)

    if all_pages:
        try:
            pos = all_pages.index(pagename)
        except ValueError:
            # this should never happen in theory, but let's be sure
            pass
        else:
            if pos > 0:
                first = all_pages[0]
                prev = all_pages[pos-1]
            if pos+1 < len(all_pages):
                next = all_pages[pos+1]
                last = all_pages[-1]

    return pos, size, (first, prev, next, last)


class Navitree:
    """ Dispatcher class implementing the navitree schemes.
    """

    # querystring for slideshow links
    PROJECTION = 'action=print&media=projection'

    def __init__(self, macro, args):
        """ Prepare common values used during processing.
        """
        self.macro = macro
        self.args = args.split(',')
        self._ = self.macro.request.getText

        self.pagename = self.macro.formatter.page.page_name
        self.print_mode = self.macro.request.form.has_key('action') \
            and self.macro.request.form['action'][0] == 'print'
        self.media = self.macro.request.form.get('media', [None])[0]
        self.querystr = self.print_mode and self.PROJECTION or ''


    def dispatch(self):
        """ Return None if in plain print mode (no navigational
            elements in printouts), else the proper HTML code.
        """
        if self.print_mode and self.media != 'projection':
            return None

        scheme = self.args[0] or '<default>'
        return getattr(self, 'do_'+scheme, self.badscheme)()


    def badscheme(self):
        """ Bad scheme argument.
        """
        _ = self._
        scheme = self.args[0]
        return (self.macro.formatter.sysmsg(1) +
                self.macro.formatter.text(
            _("Unsupported navitree scheme '%(scheme)s'!") %
            {'scheme': scheme}) +
                self.macro.formatter.sysmsg(0))


    def do_childtree(self):
        return self.do_tree(root=self.pagename, currentdepth=0, parents={})

    def do_tree(self, root=None, currentdepth=0, parents={}):
        """ Navigate to subpages from a parent page.
        """
        _ = self._
        try:
            depth = int(self.args[1])
        except (IndexError, TypeError, ValueError):
            depth = 0

        try:
            liststyle = self.args[2]
        except (IndexError, TypeError, ValueError):
            liststyle = "ul"

        # get parent page name if no root was specified
        parent = root or _getParent(self.pagename)
        if not parent:
            return (self.macro.formatter.sysmsg(1) +
                    self.macro.formatter.text(_('No parent page found!'))+
                    self.macro.formatter.sysmsg(0))
        else:
            parents[parent] = 1

        # limit depth if a depth was specified
        if depth and currentdepth >= depth:
            return ''

        # iterate over children, adding links to all of them
        result = []
        result.append('<%s>' % liststyle)
        children = _getPages(self.macro.request, '^%s/' % parent)
        for child in children:
            # display short page name, leaving out the parent path
            # (and make sure the name doesn't get wrapped)
            shortname = child[len(parent)+1:]

            if shortname.count('/') > 0:
                shortname = re.sub('/.*$', '', shortname)
                child = parent + '/' + shortname

            if parents.has_key(child):
                continue

            result.append('<li>')

            if child == self.pagename:
                # do not link to focus
                result.append(self.macro.formatter.text(shortname))
            else:
                # link to child
                result.append(Page(self.macro.request, child).link_to(self.macro.request, text=shortname, querystr=self.querystr))

            result.append('</li>')

            result.append(self.do_tree(root=child, currentdepth=currentdepth+1, parents=parents))

        result.append('</%s>' % liststyle)
        return ''.join(result)


def execute(macro, args):
    # get HTML code with the links
    navi = Navitree(macro, args or '').dispatch()

    if navi:
        return '%s' % navi

    # navigation disabled in plain print mode
    return ''
