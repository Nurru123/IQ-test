window.addEventListener('load', () => init());
const host = 'http://127.0.0.1:5500/';
const btnNext = document.querySelector('.btn-next');
const bar = document.querySelector('.gray-bar_fill');
let counter = 0;

function init() {

    const iqTest = new IQTest()
    iqTest.createTest();

    btnNext.addEventListener('click', () => {
        if (counter < 10) {   
        ++counter;
        iqTest.deleteTest();
        iqTest.createTest();
        bar.style.width = `calc(100% / 11 * ${counter + 1})`;
        }
    })
}


class IQTest {
    constructor() {
        this.container = document.querySelector('.q-page__content');
        this.data = [];
    }

    createTest() {
        fetch(`${host}/data.json`)
            .then(res => res.json())
            .then(data => this.data = data.questions)
            .then(res => {
                const question = new Question(this.data[counter]);
                this.container.append(question.div);
            })
            .then(result => {
                document.querySelectorAll('.radio').forEach(item => {
                    console.log(item)
                    item.addEventListener('change', () => {
                        if (item.checked) {
                            btnNext.disabled = false;
                        }
                    })
                })
            })
    }

    deleteTest() {
        const test = document.querySelector('.test');
        test.remove();
        btnNext.disabled = true;
    }

}

class Question {
    constructor(question) {
        this.div = document.createElement('div');
        this.div.classList.add('test');
        this.div.innerHTML = `<p class='q'>${question.question}</p>`;

        if (question.pic) {
            this.pic = document.createElement('img');
            this.div.append(this.pic);
            this.pic.src = question.pic;
        }
        if (question.answers) {
            this.answers = question.answers.forEach((a, i) => {
                const answ = document.createElement('div');
                answ.classList.add('answer');
                const label = document.createElement('label');
                const radio = document.createElement('input');
                radio.classList.add('radio');
                radio.type = 'radio';
                radio.name = 'radio';
                radio.value = a;
                radio.id = `radio${i + 1}`;
                label.setAttribute('for', `radio${i + 1}`);
                label.innerHTML = a;
                answ.append(radio);
                answ.append(label);
                this.div.append(answ);
            })

        } else if (question.blocks) {
            const blocksAll = document.createElement('div')
            blocksAll.classList.add('blocks-all')
            this.div.append(blocksAll)
            this.blocks = question.blocks.forEach((item, i) => {
                const blockItem = document.createElement('div')
                blocksAll.append(blockItem)
                const label = document.createElement('label');
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.classList.add('radio');
                radio.name = 'radio';
                radio.id = `radio${i + 1}`;
                label.setAttribute('for', `radio${i + 1}`);
                const block = document.createElement('div');
                block.classList.add('block'); 
                block.innerHTML = item;
                label.append(block);
                blockItem.append(radio);
                blockItem.append(label);
            })
            
        } else if (question.colors) {
            const cubesAll = document.createElement('div');
            cubesAll.classList.add('cubes-all');
            this.div.append(cubesAll);
            this.cubes = question.colors.forEach((color, i) => {
                const cubeItem = document.createElement('div');
                // cube.classList.add('cube')
                cubesAll.append(cubeItem);
                const label = document.createElement('label');
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.classList.add('radio');
                radio.name = 'radio';
                radio.id = `radio${i + 1}`;
                label.setAttribute('for', `radio${i + 1}`);
                const cube = document.createElement('div');
                cube.classList.add('cube');
                cube.style.backgroundColor = color;
                label.append(cube);
                cubeItem.append(radio);
                cubeItem.append(label);
            })
            
        }
    }
}