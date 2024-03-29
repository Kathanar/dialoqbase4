import { createChatButton } from "./button";
import { OPEN_SVG } from "./svg";
import { createChatWidget } from "./widget";
function setupChatWidget(): void {
  let scriptElement: HTMLScriptElement =
    document.currentScript as HTMLScriptElement;

  const widgetIcon = scriptElement.getAttribute("data-widget-icon");

  if (document.readyState === "complete") {
    createChatButton(scriptElement);
    createChatWidget(scriptElement);
  } else {
    document.addEventListener("readystatechange", function () {
      if (document.readyState === "complete") {
        createChatButton(scriptElement);
        createChatWidget(scriptElement);
      }
    });
  }

  window.addEventListener("message", function (event: MessageEvent) {
    // close dailoq widget
    if (event.data === "db-iframe-close") {
      let widgetContainer: HTMLDivElement = document.querySelector(
        "#dialoq"
      ) as HTMLDivElement;
      let chatButton: HTMLButtonElement = document.querySelector(
        "#dialoq-btn"
      ) as HTMLButtonElement;
      if (widgetContainer) {
        widgetContainer.style.display = "none";
      }
      if (chatButton) {
        chatButton.innerHTML = widgetIcon
          ? `<img src="${widgetIcon}" style="width: 30px; height: 30px; margin: 0 auto;" />`
          : OPEN_SVG;
      }
    }
  });
}

setupChatWidget();
