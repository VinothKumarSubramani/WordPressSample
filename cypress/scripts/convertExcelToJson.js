const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");
 

  try {
    const workBook = XLSX.readFile("./cypress/fixtures/WordPress_TestData.xlsx");
    //  console.log(workBook.Sheets);
    const excelData = {};
    workBook.SheetNames.forEach(sheet => {
      const jsonData = XLSX.utils.sheet_to_row_object_array(workBook.Sheets[sheet]);
      if (!jsonData) { throw new Error("no data avaialble") }
      excelData[sheet] = jsonData;
    });
    fs.writeFileSync(
        "./cypress/fixtures/testData.json",
      JSON.stringify(excelData, null, 2),
      "utf-8"
    )
 
  } catch (e) {
    throw Error(e); 
  }
