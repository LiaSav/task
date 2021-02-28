const formatDate = function () {
  var date = new Date();
  var dd = date.getDate();
  if (dd < 10) dd = "0" + dd;
  var mm = date.getMonth() + 1;
  if (mm < 10) mm = "0" + mm;
  var yyyy = date.getFullYear();
  var hh = date.getHours();
  if (hh < 10) hh = "0" + hh;
  var mmm = date.getMinutes();
  if (mmm < 10) mmm = "0" + mmm;
  return dd + "." + mm + "." + yyyy + " / " + hh + ":" + mmm;
};
const quantity = document.querySelectorAll("img").length;
const title = document.querySelector(".title");
title.innerHTML +=
  "Количество картинок на странице: " +
  quantity +
  ". Дата и время: " +
  formatDate();

const container = document.querySelector(".container");
container.addEventListener("click", function (event) {
  let picture = event.target.closest("img");
  if (!picture) return;
  showPicture(picture.src);
  event.preventDefault();
});
function showPicture(src) {
  largeImg.src = src;
  modal.open();
}

const buttons = document.querySelectorAll(".delete-button");
const removeBlock = (target, selector) => {
  const element = target.closest(selector);
  if (element !== null) {
    if (element.id !== "") {
      const deletedElements =
        JSON.parse(localStorage.getItem("deleted-elements")) || [];
      deletedElements.push(element.id);
      localStorage.setItem("deleted-elements", JSON.stringify(deletedElements));
    }
    element.remove();
  }
};
for (const button of buttons) {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    removeBlock(event.currentTarget, ".image");
  });
}
window.addEventListener("DOMContentLoaded", () => {
  const deletedElements =
    JSON.parse(localStorage.getItem("deleted-elements")) || [];

  for (const deletedElement of deletedElements) {
    const element = document.querySelector(`#${deletedElement}`);
    if (element !== null) {
      element.remove();
    }
    console.log(deletedElements);
    console.log(Storage.length);
  }
});

const recover = document.querySelector(".recover-button");
recover.addEventListener("click", function () {
  localStorage.removeItem("deleted-elements");
});
