(function($){
 
    $.fn.extend({ 



	// Allows you to style a select by hiding the origional select and replacing it with a UL
	// Pluggin then attaches events to the UL that make it behave like a select	
        styleSelect: function () {
	

			// Make Items appears over the top of every other element
			// Increment the Z-Index of each list item in order
			// Remove the z-index value when closing	
			var toggleZIndex = function ($list,close) {

				var i = 500,
				removeZIndex = function () {
					$list.find('li, .icon').css('zIndex', '');
				};

				// Close Boolean was true
				// Remove inline zIndex value
				if ( close === true) {

					removeZIndex();

				// The List is closed (& The user just opened it)	
				// Incremenet the z index
				} else if ($list.hasClass('is-closed')) {

					$list.find('li, .icon').each( function () {

						$(this).css('zIndex', i);
						i++;

					});

					var $items = $list.find('li').not('.active');

				// The List is open (& The user just closed it)
				// Remove inline zIndex value	
				} else {

					removeZIndex();

				}

			};

			// Returns the select
			// TODO: Return the list instead
            return this.each(function () {




				// Alias the select for speed
				var $select = $(this).css({position : 'absolute', left : '-9999px', top : '-999px'}),

				// Return an array with objects
				// Each object contains the val & text for each option on the select
				// i.e: [{val : theValue, text : 'choose something'}, ... ]
				// We use this to insert each <li> into the new <ul>
				selectItems = (function () {
					var array = [];
					$select.children().each( function () {
						// For Each child of the select construct {val : 'the value', 'text' : 'thetext'}
						array.push({val : $(this).val(), text : $(this).html()});
					});

					return array;
				}()),

				// The Value of the select, as we found it
				// We use this to add the active class
				defaultVal = $select.val(),

				// Construct a unique ID, this gets added to the list
				// Do this because accesing ID's is quicker than elements or classes
				listId = 'fs-' + Math.floor(Math.random()*999),

				// The HTML string for the <ul> (inc id)
				listHtml = "<div class='style-select-wrap'><ul id='" + listId + "' class='style-select is-closed'></ul></div>",

				// Insert the <ul> after the list
				// Dont use this variable, use $list instead
				$ul = (function() {$select.after(listHtml);}()),

				// Alias the new <ul> for easy access
				$list = $('#' + listId),

				// Use this to check the state of the list (open closed).
				// this gets used to mimic a selects interactions
				// true when the user hovers over the list
				overSelect = false;

				// Insert The list items (and the span icon) into the list
				$list.append((function () {
					var items = '';
					// Add each list item to the <ul> & then attach a click event to each <li>
					for (var i=0; i<selectItems.length; i++) {

						// A String that includes an <li> For Each option in the select
						items = (items || '') + '<li data-val="' + selectItems[i].val + '"><span class="pad">' + selectItems[i].text +'</span></li>';

					}

					return items + '<span class="icon"></span>';

				}()));

				// EVENT: Click on an item
				// Attach this event to every item
				$list.find('li').click( function (e) {

					e.preventDefault();

					// The val of the clicked item
					var val = $(this).data('val'),
					i = 500;

					// Tweak the z-index & pos of each item
					toggleZIndex($list);


					// They clicked on the active one 
					if (val == $select.val()) {


						if ($list.hasClass('is-closed')) {

							// Show every item
							$list.find('li').show();

						} else {

							// Hide every item
							$list.find('li').hide();
							$list.find('.active').show();
						}

					} else {

						// Remove Active From exisitng active item
						$list.find('.active').removeClass('active');

						// Hide Every Item
						$list.find('li').hide();

						// add active and show this item
						$(this).addClass('active').show();

						// update the selects value & trigger the change event
						$select.val(val).change();
					}

					// Updated the isclosed / open flag
					$list.toggleClass('is-closed');

					// Update the last item class (used to add rounded corners to the bottom)
					// First we remove the current last class
					// Then we check the index of the active item against the last items index & set the class accordingly
					$list.find('.last').removeClass('last');
					var $lastItem = $list.find('li:last');

					if ($lastItem.index() === $list.find('.active').index()) {
						$lastItem.prev().addClass('last');

					} else {
						$lastItem.addClass('last');

					}

				});





				// Fix the Width of the List
				// Do this so that the width doesnt pop when we show/hide the inactive items
				// Also Add the .icon span to the end of the<li>
				// Use this icon to style the up down arrow
				$list.width($list.width());

				// Find the default Item
				// Add the active Class
				// Hide the rest of the items
				$list.find('li[data-val=' + defaultVal + ']').addClass('active').siblings('li').hide();




				// EVENT: Hover & click outside of select area
				// This is to mimic how interaction with a <select> works.
				$list.hover(function () {

					// SenderUser hovered over the select
					overSelect = true;

				}, function () {

					// Use hovered out of the lists area
					overSelect = false;

					// SenderUser clicked in the document
					$(document).click( function (e) {

						// And has not hovered back over the select
						if (overSelect === false) {

							e.preventDefault();

							// Tweak the z-index of each item
							toggleZIndex($list, true);

							// Hide Every inactive item and change toggle class
							$list.find('li').not('.active').hide();
							$list.addClass('is-closed');

							// Unbind the click event
							$(document).unbind('click');

						}
					});
				});


				// EVENT: Click the icon
				// The Icon gets positioned over the active list item
				// The user might click the icon, but that wouldnt trigger a click event on the active list item.
				// So lets trigger the click event on that item instead
				$list.find('.icon').click(function (e) {
					e.preventDefault();
					$list.find('.active').click();

				});



            });
        }


    }); 
})(jQuery);





