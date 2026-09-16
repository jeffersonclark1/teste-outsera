import fs from "node:fs";
import parse from "csv-parse";

type recordCount = {
    min: number;
    count: number;
    producers: string;
    years: [number];
}

type returnMinMax = {
  producer: string;
  followingWin: number;
  previousWin: number;
  interval: number;
}

export const parseCSV = async (file: string) => {
  const recordsCount: any = [];
  const parser = fs.createReadStream(file).pipe(
    parse({
      columns: true,
      delimiter: ";",
    }),
  );

  for await (const record of parser) {

    if (
      recordsCount.length > 0 &&
      recordsCount.filter((a: any) => a.producers === record.producers).length > 0
    ) {
      const findProducer = recordsCount.find(
        (b: any) => b.producers === record.producers,
      );
      findProducer.count = findProducer.count + 1;
      findProducer.years.push(parseInt(record.year));
    } else {
      recordsCount.push({
        producers: record.producers,
        years: [parseInt(record.year)],
        count: 1,
      });
    }
  }

  const minMaxInterval: returnMinMax[] = [];
  recordsCount.map((i: recordCount) => {
    if (i.count > 1 && i.producers) {
      const min = Math.min(...i.years);
      const max = Math.max(...i.years);
      const interval = max - min;

      minMaxInterval.push({
        producer: i.producers,
        followingWin: max,
        previousWin: min,
        interval,
      });
    }
  });

  minMaxInterval.sort((a, b) => a.interval - b.interval);

  return {
    max: minMaxInterval.slice(-2),
    min: minMaxInterval.slice(0, 2)
  };
};
