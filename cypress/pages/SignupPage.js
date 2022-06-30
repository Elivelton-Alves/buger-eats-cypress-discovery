

class SignupPage {

    go() {
        cy.viewport(1440, 900) 
        cy.visit('https://buger-eats-qa.vercel.app') 

        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas') //Checkpoint é uma verificação
    }

    fillForm(deliver) {
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        //Fazendo a verificação se os campos foram preenchidos automaticamente pelo sistema
        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)


        //Clicando na opção moto, usa o método contains para juntar texto com css selector
        cy.contains('.delivery-method li', deliver.delivery_method).click()
        // Usa o ^ para encontrar o valor que começa com o texto, $ para que termina e * para que contém
        //Fazendo upload de arquivos
        cy.get('input[accept^="image"]').attachFile('/images/' + deliver.cnh)
    }

    submit() {
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectMessage) {
        cy.get('.swal2-container .swal2-html-container')
        .should('have.text', expectMessage)
    }

    alertMessageShoulBe(expectMessage) {
        //cy.get('.alert-error').should('have.text', expectMessage)   aqui pega somente um elemento
        cy.contains('.alert-error', expectMessage).should('be.visible') //o contains combina localizador com a mensagem
    }
}

export default new SignupPage; //exportar já instanciado