class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this.attachShadow({ mode: "open" }); // 'open' value mean that we don't access to tis local DOM outside
    // - if we want to access - set it to 'close'
    const template = document.getElementById("tooltip-template");
    this.shadowRoot.appendChild(template.content.cloneNode(true)); // 'true' value means - deep clonning
  }
  // lifesycle methods ==== start
  connectedCallback() {
    this._tooltipText = this.getAttribute("text") || "Some dummy tooltip text!";
    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.addEventListener("mouseenter", this._showTooltop.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._removeTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative";
  }
  // lifesycle methods ==== end

  // methods == start
  _showTooltop() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this._tooltipContainer.style.position = "absolute";
    this._tooltipContainer.style.background = "black";
    this._tooltipContainer.style.color = "white";
    this._tooltipContainer.style.zIndex = "10";
    this.shadowRoot.appendChild(this._tooltipContainer);
  }
  _removeTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
  // methods == end
}

customElements.define("akuc-tooltip", Tooltip);
