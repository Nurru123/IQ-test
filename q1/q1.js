window.addEventListener('load', () => init());
const host = 'http://127.0.0.1:5500/';
const btnNext = document.querySelector('.btn-next');
let counter = 0

function init() {
    
    const iqTest = new IQTest()
    iqTest.createTest();

    btnNext.addEventListener('click', () => {
        ++counter
        iqTest.destructor()
        iqTest.createTest()
    })
}


class IQTest {
    constructor() {
        this.container = document.querySelector('.q-page__content');
        this.testList = []
        this.data = [];
    }

    createTest() {
        fetch(`${host}/data.json`)
            .then(res => res.json())
            .then(data => this.data = data.questions)
            .then(res => {
                const question = new Question(this.data[counter])
                this.testList.push(question)
                this.container.append(question.div)
            })
            .then(result => {
                document.querySelectorAll('.radio').forEach(item => {
                    item.addEventListener('change', () => {
                        if(item.checked) {
                            btnNext.disabled = false;
                        }
                    })
                })
            })
    }

    destructor() {
        const test = document.querySelector('.test');
        test.remove();
        btnNext.disabled = true
    }
   
}

class Question {
    constructor(question) {

        this.div = document.createElement('div');
        this.div.classList.add('test');
        this.div.innerHTML = `<p class='q'>${question.question}</p>`
        this.answers = question.answers.forEach(a => {
            const label = document.createElement('label');
            const radio = document.createElement('input');
            radio.classList.add('radio')
            const answ = document.createElement('div');
            answ.classList.add('answer')
            radio.type = 'radio'
            radio.name = 'radio'
            radio.value = a;
            label.innerHTML = a;
            answ.append(radio)
            answ.append(label)
            this.div.append(answ)
        })
        
        
    }

}