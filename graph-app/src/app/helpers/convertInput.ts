export const transformInput = (text: string) => {
  const rows = text.split("\n");

  const arr = [];

  for (const row of rows) {
    const elements = row.trim().split(/\s+/);
    arr.push(elements.map(Number));
  }
  const n: number = arr[0][0];
  const start: number = arr[0][1];

  arr.shift();
  return {
    n,
    start,
    arr,
  };
};

/* 
4 0
0 10 15 20
10 0 35 25
15 35 0 30
20 25 30 0
*/
