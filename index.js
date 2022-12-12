import { getMeta } from './lib/get-meta.js';
import { calcSpaces } from './lib/calc-spaces.js';
import { concatAudio } from './lib/concat-audio.js';

async function main()
{
	const inputPath = process.argv[2];
	
	if ( !inputPath )
	{
		throw new Error( 'Path to the target directory is required' );
	}
	
	process.chdir( inputPath );
	
	const audioMeta = await getMeta();
	const spaces = calcSpaces( audioMeta );
	
	await concatAudio( audioMeta, spaces );
}

main()
	.catch(
		( error ) =>
		{
			console.error( error );
			process.exit( 1 );
		},
	);
