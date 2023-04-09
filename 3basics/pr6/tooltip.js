class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: black;
          position: absolute;
          color: white;
          z-index: 10;
        }
      </style>
      <slot>Some default text</slot>
      <span> (?)</span>
     `;
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
    this.shadowRoot.appendChild(this._tooltipContainer);
  }
  _removeTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
  // methods == end
}

customElements.define("akuc-tooltip", Tooltip);
