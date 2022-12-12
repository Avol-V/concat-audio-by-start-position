import { spawn } from 'node:child_process';
import { handleChildProcessExit } from './handle-child-process-exit.js';

/**
 * @typedef { import( './get-meta.types.js' ).AudioMeta } AudioMeta
 */

/**
 * @param { ReadonlyArray<AudioMeta> } files
 * @param { ReadonlyArray<number> } spaces
 */
export function concatAudio( files, spaces )
{
	/** @type { Array<string> } */
	const inputs = [];
	let timeline = '';
	const spaceSrcs = spaces.map(
		( duration, index ) =>
		{
			inputs.push( '-i', /** @type { AudioMeta } */(files[index]).fileName );
			
			timeline += `[s${index}][${index}:a]`;
			
			return `aevalsrc=0:d=${duration}[s${index}]`;
		},
	);
	
	const child = spawn(
		'ffmpeg',
		[
			'-nostats',
			'-loglevel',
			'error',
			...inputs,
			'-filter_complex',
			`${spaceSrcs.join( ';' )};${timeline}concat=n=${files.length * 2}:v=0:a=1[out]`,
			'-map',
			'[out]',
			'output.ogg',
		],
		{
			stdio: 'inherit',
		},
	);
	
	return handleChildProcessExit( child );
}
