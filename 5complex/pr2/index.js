const confirmBtn = document.querySelector("button");
const popup = document.querySelector("akmodal-element");
confirmBtn.addEventListener("click", () => {
  // popup.setAttribute("opened", "");
  if (!popup.isOpen) {
    popup.open();
  }
  // console.log(popup.isOpen)
});

popup.addEventListener("confirm", () => {
  console.log("Confirming...");
});
popup.addEventListener("cancel", () => {
  console.log("Cancelled...");
});
