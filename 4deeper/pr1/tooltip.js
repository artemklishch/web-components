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
        .highlight {
          background-color: red;
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
        :host{

        }
        :host(.customElem){
          background-color: #ccc;
        }
        :host-context(p){
          font-weight: bold;
        }
      </style>
      <slot>Some default text</slot>
      <span class='icon'>?</span>
     `;
  }
  // ::slotted(*){} // styling of all content inserted to the 'slot' tag
  // ::slotted(.highlight){} // styling '.highlight' class of content inserted to the 'slot' tag
  // ::slotted(span a){} // styling of the 'a' is impossible - only top level tags
  // CSS styles from the light DOM will overwrite '::slotted' styles
  // :host{} // this selector id fro the host element, the 'akuc-tooltip' tag in this case, the parent for others
  // and the custom element itself; and it would be overwritten by CSS srtyls from the lght DOM
  // :host(.customElem){} // if we assign to our custom element the class '.customElem' - this way will style the element here
  // :host-context(p){} // this allow to style the surrounding elements - in this example - the tag 'p', that wraps the host element
  // it is possible to write the CSS selectors: :host-context(p p){}, :host-context(p.textClass){}, :host-context(p > div){}
  // :host-context(p){} // but - it will style only content inside the host element!!!
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
