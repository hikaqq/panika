const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
        console.error("No file uploaded");
        return;
    }

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
        setFileContent(e.target.result);
    };

    reader.readAsText(file);
};
