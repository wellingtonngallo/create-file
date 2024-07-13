import { fileURLToPath } from 'url';
import path from 'path';
import ReadFileRepository from './repository/ReadFileRepository.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

;(() => {
  const firstFile = path.join(__dirname, 'files', 'GalloTeste22.xlsx');
  const secondFile = path.join(__dirname, 'files', 'GalloTeste22.xlsx');

  const readFileRepository = new ReadFileRepository({ 
    firstFile,
    secondFile,
  });

  readFileRepository.generateExelFileFromJson('newFile.xlsx');
})();