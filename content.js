// content.js

(function() {
  console.log("YouTube Effects Modifier loaded");

  // Inject CSS so header title shows a pointer cursor
  const style = document.createElement("style");
  style.textContent = `
    .ytEffectsPanelHeaderTitle {
      cursor: pointer !important;
    }
  `;
  document.head.appendChild(style);

  function toggleElements() {
    const canvasContainer = document.querySelector(".ytEffectsEditorPreviewCanvasContainer");
    const toolbar = document.querySelector(".ytEffectsEditorPreviewToolbarButtons");
    const header = document.querySelector(".ytEffectsPanelHeaderHost");
    if (!canvasContainer || !toolbar || !header) return;

    const previewCanvas = canvasContainer.querySelector("canvas");

    const collapsed = canvasContainer.dataset._collapsed === "true";

    if (!collapsed) {
      // Save old styles
      canvasContainer.dataset._oldStyle = canvasContainer.getAttribute("style") || "";
      toolbar.dataset._oldStyle = toolbar.getAttribute("style") || "";
      header.dataset._oldStyle = header.getAttribute("style") || "";
      if (previewCanvas) {
        previewCanvas.dataset._oldStyle = previewCanvas.getAttribute("style") || "";
      }

      // Collapse elements
      canvasContainer.style.height = "0px";
      canvasContainer.style.width = "0px";
      toolbar.style.display = "none";
      toolbar.style.gap = "0px";
      toolbar.style.padding = "0px";
      toolbar.style.height = "0px";
      if (previewCanvas) {
        previewCanvas.style.height = "0px";
        previewCanvas.style.width = "0px";
      }

      // Remove border from header
      header.style.borderBottom = "none";

      canvasContainer.dataset._collapsed = "true";
    } else {
      // Restore styles
      canvasContainer.setAttribute("style", canvasContainer.dataset._oldStyle || "");
      toolbar.setAttribute("style", toolbar.dataset._oldStyle || "");
      header.setAttribute("style", header.dataset._oldStyle || "");
      if (previewCanvas) {
        previewCanvas.setAttribute("style", previewCanvas.dataset._oldStyle || "");
      }

      canvasContainer.dataset._collapsed = "false";
    }
  }

  // Listen for clicks on header
  document.addEventListener("click", (e) => {
    const header = e.target.closest(".ytEffectsPanelHeaderHost");
    if (header) {
      toggleElements();
    }
  });
})();
