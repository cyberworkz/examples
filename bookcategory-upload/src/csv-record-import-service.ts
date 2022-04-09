import { Service } from 'typedi';
import { DataRepository } from './data-repository';
import * as stream from 'stream';
import * as csv from '@fast-csv/parse';

@Service()
export class CsvRecordImportService {

  constructor(private dataRepo: DataRepository) {
  }

    /**
     * Process stream of csv file.
     *
     * @param csvStream
     */
  async import(csvStream: stream.Readable) {
    return new Promise((resolve, reject) => {
      const parsedData = [];
      csvStream.pipe(csv.parse({ headers: true, delimiter: ';' }))
                .on('error', function (data) {
                  console.error(`Got an error: ${data}`);
                  reject("Error parsing \n" + data);
                })
                .on('data', (data) => {
                  parsedData.push(data);
                })
                .on('end', async () => {
                  if (parsedData.length > 0) {
                    await this.dataRepo.upload(parsedData);
                  } else {
                    console.log('No parsed data to upload');
                  }
                  resolve('done importing');
                });
    });
  }
}
