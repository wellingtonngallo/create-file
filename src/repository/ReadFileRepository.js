import xlsx from 'xlsx';
import path from 'path';

export default class ReadFileRepository {
  constructor({ firstFile, secondFile }) {
    this.firstFile = firstFile;
    this.secondFile = secondFile;
  }

  convertExcelToJson(file) {
    const workbook = xlsx.readFile(file);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return data
  }

  combineData(dataFirstFile, dataSecondFile) {
    const combineDataJson = dataFirstFile.reduce((acc, item) => {
      const secondFileJson = dataSecondFile.find(secondItem => secondItem.ID === item.ID);

      if (secondFileJson) {
        acc.push({ ...item, ...secondFileJson });
      }
      
      return acc;
    }, []);
  
    return combineDataJson;
  }

  readExcelFiles() {
    const getDataFirstFile = this.convertExcelToJson(this.firstFile);
    const getDataSecondFile = this.convertExcelToJson(this.secondFile);

    console.log(this.combineData(getDataFirstFile, getDataSecondFile))
    return this.combineData(getDataFirstFile, getDataSecondFile)
  }

  generateExelFileFromJson(fileName) {
    try {
      const data = this.readExcelFiles();
      const allKeys = [...new Set(data.flatMap(Object.keys))];
  
      const ws = xlsx.utils.json_to_sheet(data, { header: allKeys });
      const wb = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(wb, ws, 'New File');
  
      const filePath = path.resolve('./src/', 'files', fileName);
      xlsx.writeFile(wb, filePath);
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}
