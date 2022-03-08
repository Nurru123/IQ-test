window.addEventListener('load', () => init());
const host = 'http://127.0.0.1:5500/';
const container = document.querySelector('.q-page__content');
const btnNext = document.querySelector('.btn-next');
const bar = document.querySelector('.gray-bar_fill');
let counter = 0;

function init() {

    const iqTest = new IQTest()
    iqTest.createTest();

    btnNext.addEventListener('click', () => {
        ++counter;

        if (counter <= 10) {   
        iqTest.deleteTest();
        iqTest.createTest();
        bar.style.width = `calc(100% / 11 * ${counter + 1})`;
        } else {
            iqTest.deleteTest();
            iqTest.createTest();
            btnNext.style.display = 'none';
            setTimeout(function() {
                window.location.href = '/last-page/last-page.html';
              }, 5000);
        }
    })
}




class IQTest {
    constructor() {
        this.container = container;
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
            .then(res => {
                document.querySelectorAll('.radio').forEach(item => {
                    item.addEventListener('change', () => {
                        document.querySelectorAll('.radio').forEach(item => {
                            item.parentElement.classList.remove('checked')
                        })
                        if (item.checked) {
                            item.parentElement.classList.add('checked')
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
            const answers = document.createElement('div');
            answers.classList.add('answers');
            this.div.append(answers);
            this.answers = question.answers.forEach((a, i) => {
                const answer = document.createElement('div');
                answer.classList.add('answer');
                const label = document.createElement('label');
                const radio = document.createElement('input');
                radio.classList.add('radio');
                radio.type = 'radio';
                radio.name = 'radio';
                radio.value = a;
                radio.id = `radio${i + 1}`;
                label.setAttribute('for', `radio${i + 1}`);
                label.innerHTML = a;
                answer.append(radio);
                answer.append(label);
                answers.append(answer);
            })

        } else if (question.blocks) {
            const blocksAll = document.createElement('div')
            blocksAll.classList.add('blocks-all')
            this.div.append(blocksAll)
            this.blocks = question.blocks.forEach((b, i) => {
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
                block.innerHTML = b;
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
                cubeItem.classList.add('cube-item')
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
            
        } else if (question.loading) {
            // const loadingTitle = document.querySelector('.q');
            // loadingTitle.classList.add('loading-title');
            // const loading = document.querySelector('img');
            // loading.classList.add('loading-img');
            const loadingText = document.createElement('p');
            loadingText.classList.add('loading-text');
            loadingText.innerHTML = `${question.loading}`;
            this.div.append(loadingText);
            let timer = setInterval(function() {
                loadingText.innerHTML = `${loadingText.innerHTML}` + `. `;
              }, 100);
            setTimeout(() => { clearInterval(timer); }, 5000);
        }
    }
}