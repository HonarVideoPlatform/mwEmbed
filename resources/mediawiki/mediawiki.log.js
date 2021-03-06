/*
 * Implementation for mediaWiki.log stub
 */

(function ($, mw) {

	/**
	 * Log output to the console.
	 *
	 * In the case that the browser does not have a console available, one is created by appending a
	 * <div> element to the bottom of the body and then appending a <div> element to that for each
	 * message.
	 *
	 * @author Michael Dale <mdale@wikimedia.org>
	 * @author Trevor Parscal <tparscal@wikimedia.org>
	 * @param {string} string Message to output to console
	 */
	mediaWiki.log = function( string ) {
		// Exit if not in debug
		if( ! mw.config.get('debug') === true ) {
			return ;
		}
		// Exit if a filter is defined and the string is filtered out
		if( mw.config.get('debugFilter') !== null ) {
			if ( string.match( mw.config.get('debugFilter') ) === null ){
				return;
			}
		}
		// Allow log messages to use a configured prefix
		if ( mw.config.exists( 'mw.log.prefix' ) ) {
			string = mw.config.get( 'mw.log.prefix' ) + '> ' + string;
		}
		if ( mw.config.get('debugTarget') !== null ){
			var target = $("#" + mw.config.get('debugTarget'), window.parent.document);
			if ( target.length ){
				var html = target.html() ? target.html() + "<br>" : "";
				target.html( html + string );
				if ( mw.config.get('autoScrollDebugTarget') === true ){
					target.scrollTop( Number.MAX_VALUE );
				}
			}
		}
		// Try to use an existing console
		if ( window && typeof window.console !== 'undefined' &&
			(typeof window.console.log == 'function' || typeof window.console.log == 'object') ) {
			if (Function.prototype.bind)
			{
				var log = Function.prototype.bind.call(console.log, console);
				log.apply(console, $.makeArray( arguments ));
			} else {
				console.log($.makeArray( arguments ));
			}
		}
		// the injected log caused issues in IE iframes
		/*else {
			// Set timestamp
			var d = new Date();
			var time = ( d.getHours() < 10 ? '0' + d.getHours() : d.getHours() ) +
				 ':' + ( d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes() ) +
				 ':' + ( d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds() ) +
				 '.' + ( d.getMilliseconds() < 10 ? '00' + d.getMilliseconds() : ( d.getMilliseconds() < 100 ? '0' + d.getMilliseconds() : d.getMilliseconds() ) );
			// Show a log box for console-less browsers
			var $log = $( '#mw-log-console' );
			if ( !$log.length ) {
				$log = $( '<div id="mw-log-console"></div>' )
					.css( {
						'position': 'fixed',
						'overflow': 'auto',
						'z-index': 500,
						'bottom': '0px',
						'left': '0px',
						'right': '0px',
						'height': '150px',
						'background-color': 'white',
						'border-top': 'solid 2px #ADADAD'
					} )
					.appendTo( 'body' );
			}
			$log.append(
				$( '<div></div>' )
					.css( {
						'border-bottom': 'solid 1px #DDDDDD',
						'font-size': 'small',
						'font-family': 'monospace',
						'padding': '0.125em 0.25em'
					} )
					.text( string )
					.append( '<span style="float:right">[' + time + ']</span>' )
			);
		} */
	};

})(jQuery, mediaWiki);
