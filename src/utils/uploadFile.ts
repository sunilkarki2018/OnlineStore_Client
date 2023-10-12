async function uploadFile(binaryFile: File) {
  try {
    const formData = new FormData();
    formData.append("file", binaryFile);

    const response = await fetch(
      "https://api.escuelajs.co/api/v1/files/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data.location as string;
    } else {
      console.error("Error:", response.status, response.statusText);
      return response.statusText;
    }
  } catch (error) {
    console.error("Network Error:", error);
    return error as string;
  }
}

export default uploadFile;
