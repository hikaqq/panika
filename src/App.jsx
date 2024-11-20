import { useState } from "react";
import JSZip from "jszip";
import CycleNameInput from "./components/CycleNameInput";
import modifyXMLContent from "./utils/xmlModifier";
import logo from "../src/images/panika2.png";
import { FaDiscord, FaTelegram } from "react-icons/fa";
import { GrYoutube } from "react-icons/gr";
import Footer from './Footer';

export default function App() {
  const [fileName, setFileName] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [cycleNames, setCycleNames] = useState([
    "EXTRASUNNY", "HALLOWEEN", "SNOWLIGHT", "BLIZZARD", "CLEARING",
    "OVERCAST", "NEUTRAL", "THUNDER", "CLOUDS", "CLEAR",
    "FOGGY", "RAIN", "SMOG", "SNOW", "XMAS"
  ]);
  const [selectedCycleNames, setSelectedCycleNames] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setFileContent(e.target.result);
    reader.readAsText(file);
  };

  const handleDownload = async () => {
    if (!fileContent || selectedCycleNames.length === 0) return;

    const zip = new JSZip();

    selectedCycleNames.forEach((selectedName) => {
      const modifiedXML = modifyXMLContent(fileContent, selectedName);
      const updatedFileName = `w_${selectedName.toLowerCase()}.xml`;
      zip.file(updatedFileName, modifiedXML);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const downloadUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "timecycle_panika_mods.zip";
    a.click();
  };

  const handleCheckboxChange = (name) => {
    setSelectedCycleNames((prevSelected) => {
      if (prevSelected.includes(name)) {
        return prevSelected.filter((cycle) => cycle !== name);
      } else {
        return [...prevSelected, name];
      }
    });
  };

  const handleDeleteCycleName = (index) => {
    const newNames = [...cycleNames];
    newNames.splice(index, 1);
    setCycleNames(newNames);
    setSelectedCycleNames((prevSelected) => prevSelected.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black to-red-900 p-4">
      <nav className="w-full p-7 flex items-center justify-center font-mono relative">
        <img src={logo} alt="PANIKA-MODS" className="h-14 absolute left-16 " />
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600 text-center">XML-Timecycle Modifier</h1>
        <div className="absolute right-16 flex space-x-4">
          <a href="https://discord.gg/panikamods" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 transition duration-300">
            <FaDiscord size={32} />
          </a>
          <a href="https://www.youtube.com/@Dionisz" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 transition duration-300">
            <GrYoutube size={32} />
          </a>
          <a href="https://t.me/panikamedia" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 transition duration-300">
            <FaTelegram size={32} />
          </a>
        </div>
      </nav>

      <div className="flex justify-center mt-8 w-full max-w-6xl font-mono">
        <div className="bg-black bg-opacity-15 p-8 rounded-lg shadow-lg w-full max-w-md mr-4 backdrop-blur-md border border-red-600">
          <input type="file" accept=".xml" onChange={handleFileUpload} className="block font-mono w-full text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-red-600 file:text-white hover:file:bg-red-700 transition duration-300" />

          <div className="mt-6 mb-4 font-mono">
            <h2 className="text-xl font-semibold text-white mb-2">Select Timecycle Names:</h2>
            <div className="bg-white p-4 rounded-md shadow-md bg-opacity-5">
              {cycleNames.map((name, index) => (
                <div key={index} className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    checked={selectedCycleNames.includes(name)}
                    onChange={() => handleCheckboxChange(name)}
                    className="mr-2 w-5 h-5 text-red-600 rounded border-red-600 focus:ring-red-500" />
                  <span className="text-white font-semibold">{name}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={!fileContent || selectedCycleNames.length === 0}
            className="w-full font-mono mt-4 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition duration-1000 disabled:bg-gray-400">Modify and Download ZIP</button>
        </div>

        <div className="bg-black bg-opacity-15 p-8 rounded-lg shadow-lg w-full max-w-md ml-4 backdrop-blur-md border border-red-600 font-mono">
          <h2 className="text-xl font-semibold text-white mb-2">Manage Timecycle Names:</h2>
          <div className="bg-white bg-opacity-5 p-4 rounded-md shadow-md text-black">
            {cycleNames.map((name, index) => (
              <div key={index} className="flex items-center justify-between">
                <CycleNameInput
                  name={name}
                  onNameChange={(newName) => {
                    const newNames = [...cycleNames];
                    newNames[index] = newName;
                    setCycleNames(newNames);
                  }} />
                <button onClick={() => handleDeleteCycleName(index)} className="ml-2 bg-red-600 text-white py-1 px-2 rounded hover:bg-red-800 transition duration-300">Delete</button>
              </div>
            ))}
          </div>
          <button onClick={() => setCycleNames([...cycleNames, ""])} className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-700"> Add New Timecycle Name </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
