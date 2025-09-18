export function Search(data) {
  const bar = document.querySelector(data.bar);
  const output = data.output;
  const fields = data.fields;
  const placeholder = data.placeholder;

  bar.insertAdjacentHTML(
    "afterbegin",
    `<input type="search" class="search_input" placeholder="${placeholder}">`
  );
  const input = bar.querySelector(".search_input");

  function Render(list) {
    output.innerHTML = "";
    list.forEach((item) =>
      output.insertAdjacentHTML("beforeend", data.template(item))
    );
  }

  function DoSearch() {
    const term = input.value.toLowerCase().trim();
    const results = term
      ? data.list.filter((item) =>
          fields.some((f) =>
            String(item[f] ?? "")
              .toLowerCase()
              .includes(term)
          )
        )
      : data.list.slice();
    Render(results);
  }

  Render(data.list);
  input.addEventListener("input", DoSearch);
}
