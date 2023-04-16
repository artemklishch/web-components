class Modal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
        <style>
            #backdrop{
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0,0,0,0.75);
                z-index: 10; 
                opacity: 0;
                pointer-events: none;
            }
            #modal{
                position: fixed;
                top: 10vh;
                left: 25%;
                width: 50%;
                z-index: 100;
                background: white;
                border-radius: 3px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease-out;
            }
            :host([opened]) #backdrop{
                opacity: 1;
                pointer-events: all; 
            }
            :host([opened]) #modal{
                opacity: 1;
                pointer-events: all; 
            }
            :host([opened]) #modal{
                top: 15vh;
            }
            header{
                padding: 1rem;
                border-bottom: 1px solid #ccc;
            }
            ::slotted(h1){
                font-size: 1.25rem; 
                margin: 0;
            }
            #main{
                padding: 1rem; 
            }
            #actions{
                border-top: 1px solid #ccc;    
                padding: 1rem;
                display: flex;
                justify-content: flex-end;
            }
            #actions button{
                margin: 0 0.25rem;
            }
        </style>
        <div id='backdrop'></div>
        <div id='modal'>
            <header>
                <slot name='title'>Please Confirm Payment</slot>
            </header>
            <section id='main'><slot></slot></section> 
            <section id='actions'>
                <button id='cancelBtn'>Cancel</button>
                <button id='confirmBtn'>Ok</button>
            </section>
        </div>
    `;
    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", (event) => {
      console.dir(slots[1]);
      console.dir(slots[1].assignedNodes());
    }); // this event happens whenever new content arrives
    const cancelBtn = this.shadowRoot.getElementById("cancelBtn");
    const confirmBtn = this.shadowRoot.getElementById("confirmBtn");
    cancelBtn.addEventListener("click", this._cancel.bind(this));
    // cancelBtn.addEventListener("cancel", () => {
    //   console.log("Cancel event happend");
    // });
    confirmBtn.addEventListener("click", this._confirm.bind(this));
    const backdrop = this.shadowRoot.getElementById("backdrop");
    backdrop.addEventListener("click", this._cancel.bind(this));
  }
  attributeChangedCallback(name, oldVal, newVal) {
    if (this.hasAttribute("opened")) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }
  static get observedAttributes() {
    return ["opened"];
  }

  open() {
    this.setAttribute("opened", "");
    // this.isOpen = true;
  }
  hide() {
    if (this.hasAttribute("opened")) {
      this.removeAttribute("opened");
    }
    this.isOpen = false;
  }
  _cancel(event) {
    this.hide();
    // const cancelEvent = new Event("cancel");
    // this.dispatchEvent(cancelEvent);
    const cancelEvent = new Event("cancel", { bubbles: true, composed: true });
    // by default in this case we have no bubbling that is why we set it to 'true'
    // 'composed' allowes us to share bubbling out of the 'shadowDOM'
    // the custom element - 'akmodal-element' in our case - stays out of the 'shadowDOM'
    event.target.dispatchEvent(cancelEvent);
  }
  _confirm() {
    this.hide();
    const confirmEvent = new Event("confirm");
    this.dispatchEvent(confirmEvent);
  }
}
customElements.define("akmodal-element", Modal);
