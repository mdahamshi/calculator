const ETch = {
    container: {},
    grid_size: 16,
    max_grid_size: 100,
    squareSize: 0,
    
    getSquareSize(){

        return this.squareSize + 'px';
    },

    getRandomColor(){
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    },

    getSquare(){
        const square = document.createElement('div');
        square.classList.add('sb-square');
        square.style.width = this.getSquareSize();
        square.style.height = this.getSquareSize();
        square.addEventListener('mouseover', (e) => {
            square.style.backgroundColor = this.getRandomColor();
            let current = parseFloat(square.style.opacity) || 0;
            if (current < 1) {
                square.style.opacity = Math.min(current + 0.1, 1); // max 1
              }

        });
        return square;
    },
    calculateSquareSize(){
        let rec = this.container.getBoundingClientRect();
        let gsize = rec.width * rec.height;
        let sqaure_size = Math.floor(Math.sqrt(gsize / ((this.grid_size + 1) * (this.grid_size + 2)))) - 2;

        this.squareSize = sqaure_size;
    },
    createGrid(){
        let container = this.container;
        while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        this.calculateSquareSize();
        let grid_size = this.grid_size;
        for(let i = 0; i < grid_size; i++)
            for(let j = 0; j < grid_size; j++)
                container.append(this.getSquare());
        
        
    },
    /**
     * Adds events and init score dom elements
     */
    init(){
        const container = document.querySelector('#container');
        this.container = container;
        this.createGrid();

        const btn_size = document.querySelector('#set-size');
        btn_size.addEventListener('click', () => {
            let gsize = parseInt(prompt('Please enter grid size: (max 100)'));
            gsize = Math.min(gsize, this.max_grid_size);
            this.grid_size = gsize;
            this.createGrid();
        });
        
        const btn_clear = document.querySelector('#clear');
        btn_clear.addEventListener( 'click',
            () => this.createGrid()
        );
        window.addEventListener('resize', () => this.createGrid());

        
    },

  
};

ETch.init();
exports = {
    ETch
};