/**
 * @typedef { import( 'node:child_process' ).ChildProcess } ChildProcess
 */

/**
 * @param { ChildProcess } child
 * @returns { Promise<void> }
 */
export function handleChildProcessExit( child )
{
	return new Promise(
		( resolve, reject ) =>
		{
			child.once(
				'exit',
				( code ) =>
				{
					if ( code === 0 )
					{
						resolve();
					}
					else
					{
						reject(
							new Error( `Exit with error code: ${code}` ),
						);
					}
				},
			);
			child.once(
				'error',
				( error ) =>
				{
					reject( error );
				},
			);
		},
	);
}
