import { spawn } from 'node:child_process';
import { handleChildProcessExit } from './handle-child-process-exit.js';

/**
 * @param { string } fileName
 */
export async function getAudioDuration( fileName )
{
	const child = spawn(
		'ffprobe',
		[
			'-loglevel',
			'error',
			'-i',
			fileName,
			'-show_entries',
			'format=duration',
			'-of',
			'csv=p=0',
		],
		{
			stdio: ['ignore', 'pipe', 'inherit'],
		},
	);
	
	let output = '';
	
	for await ( const chunk of child.stdout.setEncoding( 'utf8' ) )
	{
		output += chunk;
	}
	
	await handleChildProcessExit( child );
	
	return Number( output );
}
