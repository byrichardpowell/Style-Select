(function($){
 
    $.fn.extend({ 



	// Allows you to style a select by hiding the origional select and replacing it with a UL
	// Pluggin then attaches events to the UL that make it behave like a select	
        styleSelect: function() { 
 
			// Returns the select
			// TODO: Return the list instead
            return this.each(function() {

				// Alias the select for speed
				var $select = $(this),
				
				// Return an array with objects
				// Each object contains the val & text for each option on the select
				// i.e: [{val : theValue, text : 'choose something'}, ... ]
				// We use this to insert each <li> into the new <ul>
				selectItems = function() {
					var array = [];
					$select.children().each( function () {
						// For Each child of the select construct {val : 'the value', 'text' : 'thetext'}
						array.push({val : $(this).val(), text : $(this).html()});
					})

					return array
				}(),
				
				// The Value of the select, as we found it
				// We use this to add the active class
				defaultVal = $select.val(),
				
				// Construct a unique ID, this gets added to the list
				// Do this because accesing ID's is quicker than elements or classes
				listId = 'fs-' + Math.floor(Math.random()*999),
				
				// The HTML string for the <ul> (inc id)
				listHtml = "<ul id='" + listId + "' class='style-select is-closed'></ul>",
				
				// Insert the <ul> after the list
				$list = $select.after(listHtml),
				
				// Alias the new <ul> for easy access
				$list = $('#' + listId),
				

				// Use this to check the state of the list (open closed).
				// this gets used to mimic a selects interactions
				// true when the user hovers over the list
				overSelect = false;
				
				
				// Add each list item to the <ul> & then attach a click event to each <li>
				for (var i=0; i<selectItems.length; i++) {

					// The value for this list item
					// Used to add to a data-val attribute
					// Also used to check if this item is the active item
					var val = selectItems[i].val,
					
					// Create the <li>
						$item = $list.append('<li data-val="' + val + '"><span class="pad">' + selectItems[i].text +'</span></li>');
					// Insert this <li> as the last <li> inside the <ul>
						$item = $list.children(':last');







					// EVENT: Click on an item
					// Attach this event to every item
					$item.click( function() {

						// The val of the clicked item
						var val = $(this).data('val'),
							i = 500;
						
						// Make Sure it appears over every other element
						// Increment the Z-Index of each list item in order
						$list.find('li').each( function() {
							
							$(this).css('zIndex', i);
							i++;
							
						});
						// Lastly apply a z-index Vlaue to the icon
						$list.find('.icon').css('zIndex', i);
						

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
							$list.find('.active').removeClass('active')

							// Hide Every Item
							$list.find('li').hide();

							// add active and show this item
							$(this).addClass('active').show();

							// update the selects value & trigger the change event
							$select.val(val).change();
						}

						// Updated the isclosed / open flag
						$list.toggleClass('is-closed')
						
						// Update the last item class (used to add rounded corners to the bottom)
						// First we remove the current last class
						// Then we check the index of the active item against the last items index & set the class accordingly
						$list.find('.last').removeClass('last');
						var $lastItem = $list.find('li:last')
							
						if ($lastItem.index() === $list.find('.active').index()) {
							$lastItem.prev().addClass('last')
							
						} else {
							$lastItem.addClass('last')
							
						}

					})
				}	

				

				// Fix the Width of the List
				// Do this so that the width doesnt pop when we show/hide the inactive items
				// Also Add the .icon span to the end of the<li>
				// Use this icon to style the up down arrow
				$list.width($list.width()).append("<span class='icon'></span>");

				// Find the default Item
				// Add the active Class
				// Hide the rest of the items
				$list.find('li[data-val=' + defaultVal + ']').addClass('active').siblings('li').hide();




				// EVENT: Hover & click outside of select area
				// This is to mimic how interaction with a <select> works.
				$list.hover(function() {

					// User hovered over the select
					overSelect = true;

				}, function() {

					// Use hovered out of the lists area
					overSelect = false;

					// User clicked in the document
					$(document).click( function() {

						// And has not hovered back over the select
						if (overSelect === false) {

							// Hide Every inactive item and change toggle class
							$list.find('li').not('.active').hide()
							$list.addClass('is-closed')
						}
					})
				})

				// Hide the origional Select of Screen
				// Using absolute positioning rather than display none.
				// This allows us to still acces it
				$select.css({position : 'absolute', left : '-9999px', top : '-9999px'});
				
            });
        }


    }); 
})(jQuery);





