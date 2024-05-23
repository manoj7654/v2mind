const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Shape {
    constructor(shapeType, alignment, drawChar, rows, columns) {
        this.shapeType = shapeType.toLowerCase();
        this.alignment = alignment.toLowerCase();
        this.drawChar = drawChar;
        this.rows = rows;
        this.columns = columns;

        if (this.validateInput()) {
            this.draw();
        }
    }

    validateInput() {
        const validShapes = ['triangle', 'square', 'rectangle'];
        const validAlignments = ['left', 'right', 'center'];

        if (!validShapes.includes(this.shapeType)) {
            console.log(`Invalid shape type: ${this.shapeType}. Valid options are: ${validShapes.join(', ')}.`);
            return false;
        }

        if (!validAlignments.includes(this.alignment)) {
            console.log(`Invalid alignment: ${this.alignment}. Valid options are: ${validAlignments.join(', ')}.`);
            return false;
        }

        if (typeof this.drawChar !== 'string' || this.drawChar.length !== 1) {
            console.log('Draw character must be a single character.');
            return false;
        }

        if (!Number.isInteger(this.rows) || this.rows <= 0) {
            console.log('Rows must be a positive integer.');
            return false;
        }

        if (!Number.isInteger(this.columns) || this.columns <= 0) {
            console.log('Columns must be a positive integer.');
            return false;
        }

        return true;
    }

    draw() {
        console.log(`Drawing ${this.shapeType} with alignment ${this.alignment}:`);
        if (this.shapeType === 'triangle') {
            this.Triangle();
        } else if (this.shapeType === 'square') {
            this.Square();
        } else if (this.shapeType === 'rectangle') {
            this.Rectangle();
        }
        console.log('\n');
    }

    Triangle() {
        for (let i = 1; i <= this.rows; i++) {
            let line = this.Line(i);
            if (this.alignment === 'center') {
                let padding = Math.floor((this.rows - i) / 2);
                line = this.Line(padding, ' ') + line;
            } else if (this.alignment === 'right') {
                let padding = this.rows - i;
                line = this.Line(padding, ' ') + line;
            }
            console.log(line);
        }
    }

    Square() {
        for (let i = 0; i < this.rows; i++) {
            let line = this.Line(this.columns);
            if (this.alignment === 'center') {
                let padding = Math.floor((this.columns - this.columns) / 2);
                line = this.Line(padding, ' ') + line;
            } else if (this.alignment === 'right') {
                line = this.Line(this.columns - this.columns, ' ') + line;
            }
            console.log(line);
        }
    }

    Rectangle() {
        for (let i = 0; i < this.rows; i++) {
            let line = this.Line(this.columns);
            if (this.alignment === 'center') {
                let padding = Math.floor((this.columns - this.columns) / 2);
                line = this.Line(padding, ' ') + line;
            } else if (this.alignment === 'right') {
                line = this.Line(this.columns - this.columns, ' ') + line;
            }
            console.log(line);
        }
    }

    Line(length, char = this.drawChar) {
        let line = '';
        for (let i = 0; i < length; i++) {
            line += char;
        }
        return line;
    }
}

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    const shapeType = await askQuestion('Enter shape type (triangle/square/rectangle): ');
    const alignment = await askQuestion('Enter alignment (left/right/center): ');
    const drawChar = await askQuestion('Enter draw character (single character): ');
    const rows = await askQuestion('Enter number of rows: ');
    const columns = await askQuestion('Enter number of columns: ');

    new Shape(shapeType, alignment, drawChar, parseInt(rows), parseInt(columns));

    rl.close();
}

main();
