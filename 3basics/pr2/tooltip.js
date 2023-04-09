class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
  }
  // lifesycle methods ==== start
  connectedCallback() {
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " (?)";
    tooltipIcon.addEventListener("mouseenter", this._showTooltop.bind(this));
    // tooltipIcon.addEventListener("mouseout", this._removeTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._removeTooltip.bind(this));
    this.appendChild(tooltipIcon);
  }
  // lifesycle methods ==== end

  // properties === start
  // properties === end

  // methods == start
  _showTooltop() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = "This is the tooltip text!";
    this.appendChild(this._tooltipContainer);
  }
  _removeTooltip() {
    // this._tooltipContainer.remove();
    // this._tooltipContainer.parentElement.removeChild(this._tooltipContainer)
    this.removeChild(this._tooltipContainer);
  }
  // methods == end
}

customElements.define("akuc-tooltip", Tooltip);
