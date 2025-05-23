const SBCalculator = {
    operate_table: {},
    firstNumber: 0,
    secondNumber: 0,
    operation: '',
    lastInput:'',
    displayString:'',

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
        let removedChar = this.formula.textContent.slice(-1);
        if(this.operate_table.hasOwnProperty(removedChar)){
            this.operation = '';
            this.formula.textContent = this.formula.textContent.slice(0,-1);
            return;
        }else if(removedChar == '.'){
            this.dot.disabled = false;
        }
        if(this.secondNumber){
            this.secondNumber = this.secondNumber.slice(0,-1);
        }else if(this.firstNumber){
            this.firstNumber = this.firstNumber.slice(0,-1);
        }
        this.formula.textContent = this.formula.textContent.slice(0,-1);
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
        this.dot.disabled = false;

        
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
        this.dot.disabled = false;

    },
    handleDot(){
        if(this.secondNumber){
            this.secondNumber += '.';
        }else {
            this.firstNumber += '.';
        }
        this.dot.disabled = true;
    },
    parseInput(input){
        switch(input){
            case 'AC':
            case 'Escape':
                this.clear();
                return;
            case 'DEL':
            case 'Backspace':
                this.handleDel();
                return;
            case '+':
            case '-':
            case '*':
            case '/':
                this.handleOperation(input);
                break;
            case '=':
            case 'Enter':
                this.calculate();
                return;
            case '.':
                this.handleDot();
                break;
            default:
                this.handleNumber(input);
        }
        this.formula.textContent += input;
        this.lastInput = input;
    },
    handleKeyPress(e){
        let target = e.target;
        if(target.tagName.toLowerCase() !== 'button')
            return;
        if(this.computedRes == 'NaN')
            this.clear();
        let input = target.textContent.trim();
        this.parseInput(input);
    },
    handleKeyboardPress(e){
        const key = e.key;
        const validKeys = ['0','1','2','3','4','5','6','7','8','9',
            '+','-','*','/','.','Enter','Backspace','Escape'];
        
        if (!validKeys.includes(key))
            return;
        if(key == 'Enter')
            e.preventDefault(); // Avoid pressing focused button on the calculator
        if(this.computedRes == 'NaN')
            this.clear();

        this.parseInput(key);

    },
    clear(){
        this.displayString = '';
        this.firstNumber = '';
        this.secondNumber = '';
        this.operation = '';
        this.formula.textContent = '';
        this.computed.textContent = '';
        this.computedRes = '';
        this.lastInput = '';
        this.dot.disabled = false;
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
        this.dot = document.querySelector('#btn-dot');
        document.addEventListener('keydown',this.handleKeyboardPress.bind(this));
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