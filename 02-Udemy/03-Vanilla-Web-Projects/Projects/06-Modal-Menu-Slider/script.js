const open = document.getElementById("open");
const close = document.getElementById("close");
const modal = document.getElementById("modal");
const toggle = document.getElementById("toggle");
const navbar = document.getElementById("navbar");

function closeNavbar(event) {
  if (
    document.body.classList.contains("show-nav") &&
    event.target !== toggle &&
    !toggle.contains(event.target) &&
    event.target !== navbar &&
    !navbar.contains(event.target)
  ) {
    document.body.classList.toggle("show-nav");
    document.body.removeEventListener("click", closeNavbar);
  } else if (!document.body.classList.contains("show-nav")) {
    document.body.removeEventListener("click", closeNavbar);
  }
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
  document.body.addEventListener("click", closeNavbar);
});

open.addEventListener("click", () => modal.classList.add("show-modal"));

close.addEventListener("click", () => modal.classList.remove("show-modal"));

window.addEventListener("click", (event) =>
  event.target == modal ? modal.classList.remove("show-modal") : false
);
