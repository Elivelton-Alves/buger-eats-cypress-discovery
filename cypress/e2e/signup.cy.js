//import { it } from 'faker/lib/locales'
import SignupPage from '..//pages/SignupPage'
import signup from '..//pages/SignupPage' //importando a classe já instanciada no arquivo signupPage.js
import SignupFactory from '../factories/SignupFactory'


describe('Sigunp', () => {

    // beforeEach(function () {
    //     cy.fixture('deliver').then((d) => {
    //         this.deliver = d
    //     })
    // })

    //skip para pular o cenário quando for testar
    it('User should be deliver', function () {
        //criando massa de dados para teste

        var deliver = SignupFactory.deliver()

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        //Usar o ponto . para pesquisar o elemento pela class
        // criar constantes e variáveis para armazenar dados para utilização
        const expectMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectMessage)

    })

    it('Incorrect document', function () {

        var deliver = SignupFactory.deliver()

        deliver.cpf = '000000141aa'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShoulBe('Oops! CPF inválido')
    })

    it('Incorrect email', function () {

        var deliver = SignupFactory.deliver()

        deliver.email = 'teste.com.br'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShoulBe('Oops! Email com formato inválido.')
    })

    context('Required Fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function() {
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg) {
            it(`${msg.field} is required`, function() {
                signup.alertMessageShoulBe(msg.output)
            })
        })

    })

})


