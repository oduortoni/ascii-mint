# Meme Preview API

This document describes the API endpoint for previewing ASCII memes.

## Endpoint

`POST /api/meme/preview`

## Request Body

```bash
curl -X POST http://localhost:9000/api/meme/preview \
  -H "Content-Type: application/json" \
  -d '{
    "content": "HODL THE LINE\nTO THE MOON",
    "frame": "hash"
  }'
```

## Response

```json
{
  "preview": "####################\n#                  #\n# HODL THE LINE    #\n# TO THE MOON     #\n#                  #\n####################"
}
```

## Parameters

- `content` (string): The text content of the meme. Supports multiple lines separated by `\n`.
- `frame` (string): The frame of the meme.
    - Options: `classic`, `hash`, `star`
    - Default: `classic`

