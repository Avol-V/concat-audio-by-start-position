import { readdir } from 'node:fs/promises';
import { parse } from 'node:path';
import { convertTimeToSeconds } from './convert-time-to-seconds.js';
import { getAudioDuration } from './get-audio-duration.js';

/**
 * @typedef { import( './get-meta.types.js' ).AudioMeta } AudioMeta
 */

const audioExtensions = new Set([
	'wav',
	'mp3',
	'ogg',
	'aac',
	'm4a',
	'flac',
]);

const fileNameRegExp = /^\d\d-\d\d-\d\d-\d\d\d$/;

export async function getMeta()
{
	/** @type { Array<AudioMeta> } */
	const meta = [];
	
	for ( const file of await readdir( process.cwd() ) )
	{
		const parsedFile = parse( file );
		
		if (
			!audioExtensions.has( parsedFile.ext.substring( 1 ) )
			|| !fileNameRegExp.test( parsedFile.name )
		)
		{
			continue;
		}
		
		const start = convertTimeToSeconds( parsedFile.name );
		const duration = await getAudioDuration( file );
		
		meta.push({
			fileName: file,
			duration,
			start,
		});
	}
	
	return meta;
}
