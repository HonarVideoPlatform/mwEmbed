/**
* TimedText loader.
*/
// Scope everything in "mw" ( keeps the global namespace clean )
( function( mw, $ ) {

	/**
	* Check if the video tags in the page support timed text
	* this way we can add our timed text libraries to the player
	* library request.
	*/
	// Update the player loader request with timedText library if the embedPlayer
	// includes timedText tracks.
	$( mw ).bind( 'EmbedPlayerUpdateDependencies', function( event, playerElement, classRequest ) {
		if( mw.isTimedTextSupported( playerElement ) ) {
			classRequest = $.merge( classRequest, ['mw.TimedText'] );
		}
	} );
	// On new embed player check if we need to add timedText
	$( mw ).bind( 'EmbedPlayerNewPlayer', function( event, embedPlayer ){
		if( mw.isTimedTextSupported( embedPlayer ) ){
			embedPlayer.timedText = new mw.TimedText( embedPlayer );
		}
	});

	/**
	 * Check timedText is active for a given embedPlayer
	 * @param {object} embedPlayer The player to be checked for timedText properties
	 */
	mw.isTimedTextSupported = function( embedPlayer ) {
		if( mw.getConfig( 'TimedText.ShowInterface' ) == 'always' ) {
			return true;
		}
		// Check for standard 'track' attribute:
		if ( $( embedPlayer ).find( 'track' ).length != 0 ) {
			return true;
		} else {
			return false;
		}
	};

} )( window.mediaWiki, window.jQuery );