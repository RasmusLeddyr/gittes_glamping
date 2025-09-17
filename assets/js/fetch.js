//
export async function GetData(path, type) {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return type ? data[type] : data;
  } catch (error) {
    console.error("Could not fetch module data: ", error);
  }
}
//
