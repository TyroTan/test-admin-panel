/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
class Randomize {
  type: any;
  start: any;
  range: any;
  skip: number;

  constructor(opts: any = '', rangeP: boolean | number = false) {
    const { type = 'int' } = opts;
    let { start = 0, range = 99 } = opts; // default 1|2|3 ... 100
    let skip = 1;
    if (opts > 0 && rangeP !== false && ((rangeP as unknown) as number) > 1) {
      start = opts;
      range = (rangeP as number) - start + 1;
      skip = 0;
    }
    this.type = type;
    this.start = start;
    this.range = range;
    this.skip = skip;
  }

  get() {
    return (
      parseInt(((Math.random() * this.range) as unknown) as string) +
      this.skip +
      this.start
    );
  }
}

const r = new Randomize();
const r1_100 = new Randomize(1, 100); // 1|2|3 ... 100
const r1_4 = new Randomize(1, 4); // 1|2|3|4

const pad = function (x: string | number) {
  return x < 10 ? '0' + x : x;
};
const getHumanReadableTime = (seconds: number) => {
  return (
    pad(parseInt(((seconds / (60 * 60)) as unknown) as string)) +
    ':' +
    pad(parseInt((((seconds / 60) % 60) as unknown) as string)) +
    ':' +
    pad(seconds % 60)
  );
};

const unsafeClone = (o: any) => {
  return JSON.parse(JSON.stringify(o));
};

const clone = unsafeClone;

const getRandom = r.get;
const getShuffle1_4 = (arr = [1, 2, 3, 4]) => {
  const copy = [...arr];
  arr.forEach((val, index) => {
    const i = r1_4.get() - 1;
    const hold = copy[index];
    copy[index] = copy[i];
    copy[i] = hold;
  });

  return copy;
};

export {
  unsafeClone,
  clone,
  getHumanReadableTime,
  Randomize,
  getRandom,
  getShuffle1_4,
};
