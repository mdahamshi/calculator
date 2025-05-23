const SBCalculator = {
    container: {},
    grid_size: 16,
    max_grid_size: 100,
    squareSize: 0,
    operate_table: {},
    firstNumber: 0,
    secondNumber: 0,
    operation: '',
    displayString:'',
    getSquareSize(){

        return this.squareSize + 'px';
    },

    getRandomColor(){
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    },

    add(a,b){
        return a + b;
    },
    subtract(a,b){
        return a - b;
    },
    multiply(a,b){
        return a * b;
    },
    divide(a,b){
        if(b == 0){
            return 'NaN';
        }
        return a / b;
    },
    operate(a,operator,b){
        a = parseFloat(a);
        b = parseFloat(b);
        if(! this.operate_table.hasOwnProperty(operator))
            return console.error(`bad operator ${operator}`);
        let res = this.operate_table[operator](a,b);
        if(typeof res === 'number')
            res = res.toFixed(2);
        return res;
    },
    handleDel(){

    },
    calculate(){
        if(! this.firstNumber || !this.secondNumber || ! this.operation)
            return;
        let res = this.operate(this.firstNumber, this.operation, this.secondNumber);
        this.computed.textContent = res;
        this.formula.textContent = res;
        this.firstNumber = res;
        this.computedRes = res;
        this.secondNumber = '';
        this.operation = '';
        
    },
    handleNumber(num){
        if(this.operation && ! this.firstNumber){
            this.firstNumber = (this.operation + num); 
            this.operation = '';
            return;
        }
        if(! this.operation){
            if(this.computedRes && (this.computedRes == this.firstNumber)){
                this.formula.textContent = '';
                this.firstNumber = num;
                return;
            }
            this.firstNumber += num;
        }
        else{
            this.secondNumber += num;
        }
        return num;
    },
    handleOperation(operation){
        if(this.operation){
            this.calculate();
            this.formula.textContent = this.computedRes;
        }
        this.operation = operation;


    },
    handleKeyPress(e){
        let target = e.target;
        this.clickedtarget = target;
        if(target.tagName.toLowerCase() !== 'button')
            return;
        if(this.computedRes == 'NaN')
            this.clear();
        let input = target.textContent.trim();
        switch(input){
            case 'AC':
                this.clear();
                return;
            case 'DEL':
                this.handleDel();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                this.handleOperation(input);
                break;
            case '=':
                this.calculate();
                return;
            default:
                this.handleNumber(input);
        }
        this.formula.textContent += input;
    },
    clear(){
        this.displayString = '';
        this.firstNumber = '';
        this.secondNumber = '';
        this.operation = '';
        this.formula.textContent = '';
        this.computed.textContent = '';
        this.computedRes = '';
    },

    /**
     * Adds events and init score dom elements
     */
    init(){
        
        this.operate_table['*'] = this.multiply;
        this.operate_table['+'] = this.add;
        this.operate_table['-'] = this.subtract;
        this.operate_table['/'] = this.divide;
        const keys = document.querySelector('#keys');
        const formula = document.querySelector('#formula');
        const computed = document.querySelector('#computed-value');
        keys.addEventListener('click', this.handleKeyPress.bind(this));
        this.formula = formula;
        this.computed = computed;
        this.keys = keys;
    },

  
};

SBCalculator.init();
exports = {
    SBCalculator
};