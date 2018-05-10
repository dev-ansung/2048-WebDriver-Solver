import { isPowerOfTwo, equals, moveLeft } from './util';

export class Board {
    constructor(str?:string) {
        let grid: number[] = new Array(4 * 4);
        grid.fill(0);
        this.grid = grid;
        if (str) {
            this.fromString(str);
        }
    }

    grid: number[];

    toString(): string {
        let grid = this.grid;
        return grid.toString();
    }

    equals(input: Board): boolean {
        let gridA = this.grid;
        let gridB = input.grid;
        return equals(gridA, gridB);
    }

    set(x: number, y: number, val: number) {
        if (!isPowerOfTwo(val)) {
            throw 'invalid number';
        }
        let isWithinGrid = (x: number) => { return (x > 0 && x < 4) }
        if (!isWithinGrid(y)) {
            throw `${y} is not a valid grid position`;
        }
        if (!isWithinGrid(x)) {
            throw `${x} is not a valid grid position`;
        }
        this.grid[y % 4 + x] = val;
    }

    get(x: number, y: number) {
        return this.grid[y * 4 + x];
    }

    fromString(str: string) {
        let rawGrid = str.split(',');
        let newGrid = new Array(16);
        newGrid.fill(0);
        if (rawGrid.length != 4 * 4) {
            throw 'invalid string';
        }
        rawGrid.forEach((val, i) => {
            let num = parseInt(val);
            if (isPowerOfTwo(num)) {
                newGrid[i] = num;
            }
        })
        this.grid = newGrid;
    }

    moveLeft() {
        return moveLeft(this.grid);
    }

    move(input: string) {
        switch (input) {
            case 'L':
                this.moveLeft()
                break;
            case 'D':
                this.rotateRight();
                this.moveLeft();
                this.rotateRight();
                this.rotateRight();
                this.rotateRight();
                break;
            case 'R':
                this.rotateRight();
                this.rotateRight();
                this.moveLeft();
                this.rotateRight();
                this.rotateRight();
                break;
            case 'U':
                this.rotateRight();
                this.rotateRight();
                this.rotateRight();
                this.moveLeft();
                this.rotateRight();
                break;
            default:
                throw 'incorrect input';
        }
    }

    rotateRight() {
        let oldGrid = this.grid;
        let newGrid: number[] = new Array(16);
        newGrid.fill(0);
        oldGrid.forEach((v, i) => {
            const x = i % 4;
            const y = Math.floor(i / 4);
            newGrid[3-y + x * 4] = v;
        });
        this.grid = newGrid;
    }

    calculateScore() {
        let grid = this.grid;
        return grid.reduce(((acc, curr)=>{return acc+curr;}));
    }

    countEmptySpot() {
        let grid = this.grid;
        return grid.reduce(((acc, curr)=>{
            if (curr==0) return acc+1;
            else return acc;
        }));
    }
}
