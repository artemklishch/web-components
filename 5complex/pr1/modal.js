class Modal extends HTMLElement {
  constructor() {
    super();
    this._popupContainer;
    this._opened = false;
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
                top: 15vh;
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
            }
            :host([opened]) #backdrop{
                opacity: 1;
                pointer-events: all; 
            }
            :host([opened]) #modal{
                opacity: 1;
                pointer-events: all; 
            }
            header{
                padding: 1rem;
            }
            header h1{
                font-size: 1.25rem; 
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
                <h1>Please, confirm</h1>
            </header>
            <section id='main'><slot></slot></section> 
            <section id='actions'>
                <button>Cancel</button>
                <button>Ok</button>
            </section>
        </div>
    `;
  }
  //   attributeChangedCallback(attrName, oldValue, newValue) {
  //     // if (attrName === "opened" && this.hasAttribute("opened")) {
  //     //   this.shadowRoot.querySelector("#backdrop").style.opacity = 1;
  //     //   this.shadowRoot.querySelector("#backdrop").style.pointerEvets = "all";
  //     //   this.shadowRoot.querySelector("#modal").style.opacity = 1;
  //     //   this.shadowRoot.querySelector("#modal").style.pointerEvets = "all";
  //     // }
  //   }
  //   static get observedAttributes() {
  //     return ["opened"];
  //   }
}
customElements.define("akmodal-element", Modal);
