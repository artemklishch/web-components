class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
  }
  // lifesycle methods ==== start
  connectedCallback() {
    this._tooltipText = this.getAttribute("text") || "Some dummy tooltip text!";
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " (?)";
    tooltipIcon.addEventListener("mouseenter", this._showTooltop.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._removeTooltip.bind(this));
    this.appendChild(tooltipIcon);
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
    this.appendChild(this._tooltipContainer);
  }
  _removeTooltip() {
    this.removeChild(this._tooltipContainer);
  }
  // methods == end
}

customElements.define("akuc-tooltip", Tooltip);

