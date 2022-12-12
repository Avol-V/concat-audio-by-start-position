const secondsInMinute = 60;
const secondsInHour = secondsInMinute * 60;

/**
 * @param { string } time
 */
export function convertTimeToSeconds( time )
{
	const parts = time.split( '-' ).map( ( item ) => Number( item ) || 0 );
	
	return (
		(parts[0] || 0) * secondsInHour
		+ (parts[1] || 0) * secondsInMinute
		+ (parts[2] || 0)
		+ (parts[3] || 0) / 1000
	);
}
