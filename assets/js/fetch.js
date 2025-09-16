//
export async function GetData(path) {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Could not fetch module data: ", error);
  }
}
//
