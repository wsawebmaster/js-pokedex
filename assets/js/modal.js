var modal = document.getElementById("modal");
modal.addEventListener("click", function (e) {
  if (e.target == this) close_modal();
});

function open_modal() {
  modal.style.display = "block";
}

function close_modal() {
  modal.style.display = "none";
}
