import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { handleChildProcessExit } from './handle-child-process-exit.js';

/**
 * @typedef { import( './get-meta.types.js' ).AudioMeta } AudioMeta
 */

/**
 * @param { ReadonlyArray<AudioMeta> } files
 * @param { ReadonlyArray<number> } spaces
 */
export async function concatAudio( files, spaces )
{
	/** @type { Array<string> } */
	const inputs = [];
	let timeline = '';
	const spaceSrcs = spaces.map(
		( duration, index ) =>
		{
			inputs.push( '-i', /** @type { AudioMeta } */(files[index]).fileName );
			
			timeline += `[s${index}][${index}:a]`;
			
			return `aevalsrc=0:s=48000:d=${duration}[s${index}]`;
		},
	);
	
	const filterComplex = `${spaceSrcs.join( ';' )};${timeline}concat=n=${files.length * 2}:v=0:a=1[out]`;
	const filterFileName = 'ffmpeg_filter_complex.txt';
	
	await writeFile( filterFileName, filterComplex, 'utf8' );
	
	const child = spawn(
		'ffmpeg',
		[
			'-nostats',
			'-loglevel',
			'error',
			...inputs,
			'-filter_complex_script',
			filterFileName,
			'-map',
			'[out]',
			'-ac',
			'1',
			'-ar',
			'48000',
			'-b:a',
			'80K',
			'output.ogg',
		],
		{
			stdio: 'inherit',
		},
	);
	
	return handleChildProcessExit( child );
}
