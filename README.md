# Style Select

This jQuery Pluggin allows you create select in html that is completely stylable in CSS Stylesheets

## How?

It goes a lil something like this:

1. Call the .styleSelect() on a jQuery object that is a select
2. The pluggin positions the select offscreen
3. Inserts an unordered list after the select
4. Adds list items to match the selects options
5. Attaches events to each list item that create select like behaviour
6. When the user selects an item in the unordered the list, it updates the value of the select and then fires its changes event

You can style the select by changing the CSS in gloabl.css.  I've used LESS to compile this CSS, so you might find that easier.

## Features?

None. It does exactly what it says on the tin and nothing more.  I might add a new feature if you request it, otherwise I'll add features as I need them.

## Support?

Chrome, Safari, FF4.

I tested an earlier version of this in ie8 and above, but it has changed since then so I may have introduced new bugs.

## Bugs?

Yes, probably.  If you spot any I'd be hugely grateful for feedback

## Questions?

You can reach me by any of these methods:

* richardo@gmail.com
* www.byrichardpowell.co.uk
* @byrichardpowell
