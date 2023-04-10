class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipIcon;
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
  // color: var(--color-primary, #ccc); // it means that we can define the '--color-primary' variable in the CSS in the light DOM
  // and in case we don't define it - we use the default value - '#ccc'
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
    this.style.position = "relative";
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    console.log("first", attrName, oldValue, newValue); // by default this function doesn't observe the
    // attribute changes because of the optimization - there could be multiple attributes and
    // we probably are not interesed at observing everyone of them;
    // for observing we have to get the respective attribute in the getter 'observedAttributes'
    if (oldValue === newValue) {
      return;
    }
    if (attrName === "text") {
      this._tooltipText = newValue;
    }
  }
  static get observedAttributes() {
    // 'observedAttributes' is reserved getter name
    return ["text"]; // here we return the aray of the attributes we want to listen for changes
  }
  disconnectedCallback() {
    console.log("Disconnected!");
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltop);
    this._tooltipIcon.removeEventListener("mouseleave", this._removeTooltip);
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
