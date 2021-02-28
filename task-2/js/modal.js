function _createModal(options) {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="modal-overlay">
        <div class="modal-window">
          ${
            options.closable
              ? `<button class="modal-close" data-close="true">&times;</button>`
              : ""
          }
          <img id="largeImg" class="modal-image" />
        </div>
      </div>
  `
  );
  document.body.appendChild(modal);
  return modal;
}
$.modal = function (options) {
  const ANIMATION_SPEED = 500;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) {
        return console.log("Modal is destroyed");
      }
      !closing && $modal.classList.add("open");
    },
    close() {
      closing = true;
      $modal.classList.remove("open");
      $modal.classList.add("hide");
      setTimeout(function () {
        $modal.classList.remove("hide");
        closing = false;
      }, ANIMATION_SPEED);
    },
  };
  const listener = (event) => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };
  $modal.addEventListener("click", listener);
  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener("click", listener);
      destroyed = true;
    },
  });
};
