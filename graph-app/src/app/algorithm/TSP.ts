export class TSP {
  maxInt = 999999;

  private n: number;
  private start: number;
  private arr: number[][];

  constructor(n: number, start: number, arr: number[][]) {
    this.n = n;
    this.start = start;
    this.arr = arr;

    this.isVisited = Array(this.n)
      .fill(null)
      .map(() => Array(this.n).fill(false));

    console.log("n:", this.n);
    console.log("start:", this.start);
    console.log("arr:", this.arr);
  }
  private tempMinCost: number = this.maxInt;
  private total: number = 0;
  private bound: number = 0;
  private isVisited: boolean[][];

  printRes(resPath: number[]): number {
    let sum = 0;
    for (let i = 0; i < this.n; i++) {
      sum += this.arr[resPath[i]][resPath[i + 1]];
    }
    return sum;
  }

  minEdge(): number {
    let min = this.maxInt;
    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.n; j++) {
        if (this.arr[i][j] && !this.isVisited[i][j] && this.arr[i][j] < min) {
          min = this.arr[i][j];
        }
      }
    }
    return min;
  }

  lowerBound(level: number): number {
    return this.total + (this.n - level) * this.minEdge();
  }

  isCircle(path: number[], level: number, next: number): boolean {
    let i = 0;
    while (i < level) {
      if (path[i] === next) {
        return true;
      }
      i++;
    }
    return false;
  }

  updateSolution(solution: number[], resPath: number[]): void {
    solution[this.n] = this.start;
    const cost = this.total + this.arr[solution[this.n - 1]][this.start];
    if (cost < this.tempMinCost) {
      this.tempMinCost = cost;
      for (let i = 0; i <= this.n; i++) {
        resPath[i] = solution[i];
      }
    }
  }

  BaB(
    level: number,
    curr: number,
    solution: number[],
    resPath: number[]
  ): void {
    for (let j = 0; j < this.n; j++) {
      if (
        curr != j &&
        !this.isVisited[curr][j] &&
        !this.isCircle(solution, level, j)
      ) {
        this.isVisited[curr][j] = this.isVisited[j][curr] = true;
        this.total += this.arr[curr][j];
        this.bound = this.lowerBound(level);

        if (this.bound < this.tempMinCost) {
          solution[level] = j;

          if (level == this.n - 1) {
            this.updateSolution(solution, resPath);
          } else {
            this.BaB(level + 1, j, solution, resPath);
          }
        }
        this.total -= this.arr[curr][j];
        this.isVisited[curr][j] = this.isVisited[j][curr] = false;
      }
    }
  }

  solver(): object {
    // eslint-disable-next-line prefer-const
    let solution: number[] = Array(this.n + 1);
    // eslint-disable-next-line prefer-const
    let resPath: number[] = Array(this.n + 1);

    solution[0] = this.start;
    this.BaB(1, this.start, solution, resPath);

    const sum = this.printRes(resPath);

    return { sum, resPath };
  }
}
