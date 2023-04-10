class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (event) => {
      if (!confirm("Do you realy want tot leave?")) {
        event.preventDefault();
      }
    });
  }
}
customElements.define("ak-confirm-link", ConfirmLink, { extends: "a" });
