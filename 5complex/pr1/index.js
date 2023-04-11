const confirmBtn = document.querySelector("button");
const popup = document.querySelector("akmodal-element");
confirmBtn.addEventListener("click", () => {
  popup.setAttribute("opened", "");
});
