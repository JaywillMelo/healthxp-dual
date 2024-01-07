import students from '../fixtures/students.json'
import StudentPage from '../support/pages/StudentPage'

import studentPage from '../support/pages/StudentPage'

describe('alunos', () => {


    it('deve poder cadastrar um novo aluno', () => {

        const student = students.create

        // cy.task('deleteStudent', student.email)
        cy.deleteStudent(student.email)

        cy.adminLogin()

        //  //span[text()="Cadastrar"]/../..
        // a[href="/students/new
        
        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('Dados cadastrados com sucesso.')

    })

    it('não deve cadastrar com email duplicado', ()=> {

        const student = students.duplicate

        // cy.task('resetStudent', student)
        cy.resetStudent(student)

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('O email informado já foi cadastrado!')
    })

    it('deve remover um aluno sem matricula', ()=> {

        const student = students.remove

        // cy.task('resetStudent', student)
        cy.resetStudent(student)

        cy.adminLogin()

        //td[text()="johndoe@gmail.com"]/..//button

        studentPage.search(student.name)
        studentPage.remove(student.email)
        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')

    })

    it('todos os campos são obrigatórios', ()=>{

        const student = students.required

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)

        //label[text()="Nome completo"]/..//span
        //cy.contains('span', 'Nome é obrigatório').should('be.visible')

        studentPage.alertMessage('Nome completo', 'Nome é obrigatório')
        studentPage.alertMessage('E-mail', 'O email é obrigatório')
        studentPage.alertMessage('Idade', 'A idade é obrigatória')
        studentPage.alertMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.alertMessage('Altura', 'A altura é obrigatória')

    })

    it('Não deve cadastrar aluno com menos de 16 anos', ()=> {

        const student = students.under_16_years

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Idade', 'A idade mínima para treinar é 16 anos!')

    })

    it.skip('Não deve cadastrar aluno com peso igual ou menor que 0', ()=> {

        const student = students.inv_weight

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Peso (em kg)', 'Peso inválido')

    })

    it.skip('Não deve cadastrar aluno com altura igual ou menor que 0', ()=> {

        const student = students.inv_feet_tall

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.alertMessage('Altura', 'Altura inválida')

    })

})