// Export function
export function Search(data) {
  // Define variables for function parameters.
  const bar_parent = data.bar_parent;
  const bar_placement = data.bar_placement;
  const output = data.output;
  const fields = data.fields;
  const placeholder = data.placeholder;
  //

  // Create input element, define attributes, and append to "bar_placement".
  const input = document.createElement("input");
  input.type = "search";
  input.className = "search_input";
  input.placeholder = placeholder;
  bar_parent.insertAdjacentElement(bar_placement, input);
  //

  // Render the search list.
  function Render(list) {
    output.innerHTML = "";
    list.forEach((item) =>
      output.insertAdjacentHTML("beforeend", data.template(item))
    );
  }
  //

  // Filter list by search parameters, and render results.
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
  //

  // Render list on start and when input is interacted with
  Render(data.list);
  input.addEventListener("input", DoSearch);
  //
}
//
