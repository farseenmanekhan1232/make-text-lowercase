// Create context menu item when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "lowercase-selection",
    title: "Make Lowercase",
    contexts: ["editable"]
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "lowercase-selection") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: lowercaseSelectedText
    });
  }
});

// This function runs in the page context
function lowercaseSelectedText() {
  const activeElement = document.activeElement;
  
  // Check if active element is an input or textarea
  if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
    const start = activeElement.selectionStart;
    const end = activeElement.selectionEnd;
    
    if (start !== end) {
      const text = activeElement.value;
      const beforeSelection = text.slice(0, start);
      const selectedText = text.slice(start, end);
      const afterSelection = text.slice(end);
      const lowercased = selectedText.toLowerCase();
      
      // Replace the selected text with lowercase version
      activeElement.value = beforeSelection + lowercased + afterSelection;
      
      // Restore selection
      activeElement.setSelectionRange(start, start + lowercased.length);
      
      // Trigger input event for React/Vue/Angular compatibility
      activeElement.dispatchEvent(new Event("input", { bubbles: true }));
      activeElement.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
  // Handle contenteditable elements
  else if (activeElement && activeElement.isContentEditable) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && !selection.isCollapsed) {
      const range = selection.getRangeAt(0);
      
      // Clone the range contents to preserve structure
      const fragment = range.cloneContents();
      const tempDiv = document.createElement('div');
      tempDiv.appendChild(fragment);
      
      // Get HTML and lowercase the text content while preserving tags
      const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_TEXT, null, false);
      const textNodes = [];
      while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
      }
      textNodes.forEach(node => {
        node.textContent = node.textContent.toLowerCase();
      });
      
      // Replace the selection with lowercased content
      range.deleteContents();
      while (tempDiv.firstChild) {
        range.insertNode(tempDiv.lastChild);
      }
      
      // Trigger input event
      activeElement.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }
}
