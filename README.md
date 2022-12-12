# concat-audio-by-start-position

Concatenate audio files into single one when each file has a time mark when it should start.

Created to concatenate output files of [subtitles-to-audio](https://github.com/Avol-V/subtitles-to-audio).

Usage:
```
node index.js ./path/to/directory/with/audio-files/
```

Concatenates all audio files with name like:  
`HH-MM-SS-mmm`

Where name is a position of audio file on the timeline:
- `HH` — hours
- `MM` — minutes
- `SS` — seconds
- `mmm` — milliseconds

The output file will be saved to the input directory with name `output.ogg`.
