# Make Text Lowercase

A lightweight Chrome extension that adds a right-click context menu option to convert selected text to lowercase in any input field.

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- 🔤 Convert selected text to lowercase with one click
- ✅ Works with `<input>`, `<textarea>`, and contenteditable elements
- 🔄 Preserves newlines and text formatting
- ⚡ Framework compatible (React, Vue, Angular)
- 🪶 Lightweight - no dependencies

## Installation

### From Source (Developer Mode)

1. Clone this repository:
   ```bash
   git clone https://github.com/farseenabdullah/make-text-lowercase.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **Load unpacked**
5. Select the cloned folder

## Usage

1. Select text in any input field, textarea, or contenteditable element
2. Right-click to open the context menu
3. Click **"Make Lowercase"**
4. Done! Your selected text is now lowercase ✨

## Project Structure

```
make-text-lowercase/
├── manifest.json    # Extension configuration
├── background.js    # Service worker with context menu logic
├── icons/           # Extension icons (16x16, 48x48, 128x128)
└── README.md
```

## Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

## License

MIT License - feel free to use this in your own projects!
