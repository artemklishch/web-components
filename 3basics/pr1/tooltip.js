class Tooltip extends HTMLElement {
  constructor() {
    super();
  }
  // lifesycle methods ==== start
  connectedCallback() {
    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " (?)";
    this.appendChild(tooltipIcon);
  } // when DOM is mounted, here we can attach our caustom element
  disconnectedCallback() {} // when DOM tree is destroyed, here we can make cleanup logic
  attributeChangedCallback(attrName, oldValue, newValue) {} // observes changes of attrubutes values and DOM and is executed at this moment of time
  // lifesycle methods ==== end
}

customElements.define("akuc-tooltip", Tooltip);
// 'tooltip' name - is not valid, we have to devide at least two words by dash
