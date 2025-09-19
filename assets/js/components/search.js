export function Search(data) {
  const bar_parent = data.bar_parent;
  const bar_placement = data.bar_placement;
  const output = data.output;
  const fields = data.fields;
  const placeholder = data.placeholder;

  const input = document.createElement("input");
  input.type = "search";
  input.className = "search_input";
  input.placeholder = placeholder;

  bar_parent.insertAdjacentElement(bar_placement, input);

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
