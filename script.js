// drag and drop events
// drag, dragstart, dratenter, dragexit, dragleave, dragover

const lists = document.querySelectorAll(".drag_li");
const dropSec = document.querySelectorAll(".drag-zone");

lists.forEach((list) => {
  addClassWithDragStart(list);
  removeClassWithDragStart(list);
});

dropSec.forEach((sec) => {
  sec.addEventListener("dragover", (e) => {
    e.preventDefault();
    let draggingElement = document.querySelector(".dragging");
    let listAfterDraggingList = getlistAfterDraggingList(sec, e.clientY);
    if (listAfterDraggingList) {
      listAfterDraggingList.parentNode.insertBefore(
        draggingElement,
        listAfterDraggingList
      );
    } else {
      sec.appendChild(draggingElement);
    }
  });
});

function getlistAfterDraggingList(list, yDraggingList) {
  let Lists = [...list.querySelectorAll(".drag_li:not(.dragging)")];

  return Lists.reduce(
    (closestLists, nextList) => {
      let nextListRect = nextList.getBoundingClientRect();
      let offset = yDraggingList - nextListRect.top - nextListRect.height / 2;

      if (offset < 0 && offset > closestLists.offset) {
        return { offset, element: nextList };
      } else {
        return closestLists;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function addClassWithDragStart(list) {
  list.addEventListener("dragstart", (e) => {
    list.classList.add("dragging");
  });
}

function removeClassWithDragStart(list) {
  list.addEventListener("dragend", (e) => {
    list.classList.remove("dragging");
  });
}
