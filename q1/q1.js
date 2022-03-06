window.addEventListener('load', () => init());
const host = 'http://127.0.0.1:5500/';
const btnNext = document.querySelector('.btn-next');
const bar = document.querySelector('.gray-bar_fill');
let counter = 4;

function init() {

    const iqTest = new IQTest()
    iqTest.createTest();

    btnNext.addEventListener('click', () => {
        ++counter;
        iqTest.destructor();
        iqTest.createTest();
        bar.style.width = `calc(100% / 11 * ${counter + 1})`;
    })
}


class IQTest {
    constructor() {
        this.container = document.querySelector('.q-page__content');
        this.testList = [];
        this.data = [];
    }

    createTest() {
        fetch(`${host}/data.json`)
            .then(res => res.json())
            .then(data => this.data = data.questions)
            .then(res => {
                const question = new Question(this.data[counter]);
                this.testList.push(question);
                this.container.append(question.div);
            })
            .then(result => {
                document.querySelectorAll('.radio').forEach(item => {
                    item.addEventListener('change', () => {
                        if (item.checked) {
                            btnNext.disabled = false;
                        }
                    })
                })
            })
    }

    destructor() {
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
            this.answers = question.answers.forEach(a => {
                const label = document.createElement('label');
                const radio = document.createElement('input');
                radio.classList.add('radio');
                const answ = document.createElement('div');
                answ.classList.add('answer');
                radio.type = 'radio';
                radio.name = 'radio';
                radio.value = a;
                label.innerHTML = a;
                answ.append(radio);
                answ.append(label);
                this.div.append(answ);
            })
        } else if (question.blocks) {
            console.log('lol');
        } else if (question.colors) {
            const cubesAll = document.createElement('div')
            cubesAll.classList.add('cubes-all')
            this.div.append(cubesAll)
            this.cubes = question.colors.forEach(color => {
                const cube = document.createElement('div')
                cube.classList.add('cube')
                cube.style.backgroundColor = color
                cubesAll.append(cube)
            })
        }





    }

}