import students from '../fixtures/students.json'
import StudentPage from '../support/pages/StudentPage'

import studentPage from '../support/pages/StudentPage'

describe('alunos', () => {


    it('deve poder cadastrar um novo aluno', () => {

        const student = students.create

        cy.task('deleteStudent', student.email)

        cy.adminLogin()

        //  //span[text()="Cadastrar"]/../..
        // a[href="/students/new
        
        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('Dados cadastrados com sucesso.')

    })

    it('não deve cadastrar com email duplicado', ()=> {

        const student = students.duplicate

        cy.task('resetStudent', student)

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('O email informado já foi cadastrado!')
    })

    it('deve remover um aluno sem matricula', ()=> {

        const student = students.remove

        cy.task('resetStudent', student)

        cy.adminLogin()

        //td[text()="johndoe@gmail.com"]/..//button

        studentPage.search(student.name)
        studentPage.remove(student.email)
        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')

    })

    it.only('todos os campos são obrigatórios', ()=>{

        const student = students.required

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)

        //label[text()="Nome completo"]/..//span
        //cy.contains('span', 'Nome é obrigatório').should('be.visible')

        studentPage.requiredMessage('Nome completo', 'Nome é obrigatório')
        studentPage.requiredMessage('E-mail', 'O email é obrigatório')
        studentPage.requiredMessage('Idade', 'A idade é obrigatória')
        studentPage.requiredMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.requiredMessage('Altura', 'A altura é obrigatória')

    })
})