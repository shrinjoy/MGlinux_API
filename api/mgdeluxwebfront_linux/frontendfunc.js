const input = document.querySelectorAll("#loginform .loginWrapper input");

input.forEach((item) => {
  item.addEventListener("input", (event) => {
    if (item.value === "") {
      item.style.backgroundColor = "#fff";
    } else {
      item.style.backgroundColor = "#fffcc8";
    }
  });
});
