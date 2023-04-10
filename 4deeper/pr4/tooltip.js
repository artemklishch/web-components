class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipIcon;
    this._tooltipVisible = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        div {
          font-weight: normal;
          background-color: black;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          color: white;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.2);
        }
        ::slotted(.highlight){
          border-bottom: 1px dotted red;
        }
        .icon{
          background-color: black;
          color: white;
          padding: 0.15rem 0.5rem;
          text-alight: center;
          border-radius: 50%;
        }
        :host(.customElem){
          background-color: var(--color-primary, #ccc);
          padding: 0.15rem;
        }
        :host-context(p){
          font-weight: bold;
        }
        :host{
          position: relative;
        }
      </style>
      <slot>Some default text</slot>
      <span class='icon'>?</span>
     `;
  }
  // lifesycle methods ==== start
  connectedCallback() {
    this._tooltipText = this.getAttribute("text") || "Some dummy tooltip text!";
    this._tooltipIcon = this.shadowRoot.querySelector("span");
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltop.bind(this)
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._removeTooltip.bind(this)
    );
    this.shadowRoot.appendChild(this._tooltipIcon);
    this._render();
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (attrName === "text") {
      this._tooltipText = newValue;
    }
  }
  static get observedAttributes() {
    return ["text"];
  }
  disconnectedCallback() {
    console.log("Disconnected!");
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltop);
    this._tooltipIcon.removeEventListener("mouseleave", this._removeTooltip);
  }
  // lifesycle methods ==== end

  // methods == start
  _showTooltop() {
    this._tooltipVisible = true;
    this._render();
  }
  _removeTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
  _render() {
    let tooltipContainer = this.shadowRoot.querySelector("div");
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }
  // methods == end
}

customElements.define("akuc-tooltip", Tooltip);
