# export
Version **0.0.1**

This filter delete all unwanted files from your addon.

## Usage
This filter requires that you have [nodejs](https://nodejs.org/en/) installed.

Install this filter by running (`regolith install github.com/Fabrimat/regolith-filters/deleter`). Apply the filters similar to the example:

```json
{
	"filters": [
		{
			"filter": "deleter",
			"settings": {
                "path": ".",
				"files": [
                  "*.png",
                  "test.json"
                ]
			}
		}
	]
}
```

### Settings

Name | Default | Description
---- |---------| -----------
`path` | `'.'`   | Relative path.
`files` | `[]`    | Files to delete, wildcard supported.