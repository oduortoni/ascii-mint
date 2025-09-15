package ascii

/*
* author: @toni
* date: 2025-09-15
* description: ASCII meme backend entrypoint
 */

import (
	"strings"
)

type MemeRequest struct {
	Content string `json:"content"`
	Frame   string `json:"frame"`
}

type MemeResponse struct {
	Preview string `json:"preview"`
}

// Simple frames (we can expand with more later)
var Frames = map[string][2]string{
	"classic": {"+", "+"}, // corners
	"hash":    {"#", "#"},
	"star":    {"*", "*"},
}

func GenerateMeme(content, frame string) string {
	lines := strings.Split(content, "\n")

	// Find max line length
	maxLen := 0
	for _, l := range lines {
		if len(l) > maxLen {
			maxLen = len(l)
		}
	}

	// Pick frame chars
	border, side := Frames[frame][0], Frames[frame][1]

	// Top border
	result := border + strings.Repeat(border, maxLen+2) + border + "\n"

	// Content lines (centered-ish)
	for _, l := range lines {
		padding := (maxLen - len(l)) / 2
		spaces := strings.Repeat(" ", padding)
		line := side + " " + spaces + l + spaces
		// Adjust for odd spacing
		if len(line) < maxLen+4 {
			line += " "
		}
		line += side
		result += line + "\n"
	}

	// Bottom border
	result += border + strings.Repeat(border, maxLen+2) + border

	return result
}
