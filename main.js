const sections = document.querySelectorAll("div.container2 section");
const navLi = document.querySelectorAll("nav .container li");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionLeft = section.offsetLeft;
    const sectionWidth = section.clientWidth;
    if (scrollX >= sectionLeft - sectionWidth / 8) {
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((li) => {
    li.classList.remove("active");
    if (li.classList.contains(current)) {
      li.classList.add("active");
    }
  });
});


function transformScroll(event) {
  if (!event.deltaY) {
    return;
  }

  event.currentTarget.scrollLeft += event.deltaY * 3 + event.deltaX;
  event.preventDefault();
}

var element = document.scrollingElement || document.documentElement;
element.addEventListener('wheel', transformScroll);
