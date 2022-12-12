/**
 * @typedef { import( './get-meta.types.js' ).AudioMeta } AudioMeta
 */

/**
 * @param { ReadonlyArray<AudioMeta> } meta
 */
export function calcSpaces( meta )
{
	/** @type { Array<number> } */
	const spaces = [];
	let prevEnd = 0;
	let overlap = 0;
	
	for ( const audio of meta )
	{
		if ( prevEnd > audio.start )
		{
			spaces.push( 0 );
			overlap += prevEnd - audio.start;
		}
		else
		{
			let space = audio.start - prevEnd - overlap;
			
			if ( space < 0 )
			{
				overlap = Math.abs( space );
				space = 0;
			}
			else
			{
				overlap = 0;
			}
			
			spaces.push( space );
		}
		
		prevEnd = audio.start + audio.duration + overlap;
	}
	
	return spaces;
}
