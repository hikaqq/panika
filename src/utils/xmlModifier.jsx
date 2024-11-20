export default function modifyXMLContent(xmlString, selectedName) {
    const upperCaseName = selectedName.toUpperCase();
    const cycleTagRegex = /<cycle\s+name="[^"]*"\s+regions="2">/;

    return xmlString.replace(
      cycleTagRegex,
      `<cycle name="${upperCaseName}" regions="2">`
    );
  }
  