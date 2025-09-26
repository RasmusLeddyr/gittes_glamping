// Fetch API or JSON data using the URL (path), and optionally which key to look for (name).
export async function GetData(path, name) {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return name ? data[name] : name;
  } catch (error) {
    console.error("Could not fetch module data: ", error);
  }
}
//
