
//acessar o site para teste
describe('home page', ()=>{
    it('app deve estar online', ()=>{
        cy.viewport(1280, 720) //definir o tamanho da resolução que o cypress vai abrir
        cy.visit('https://buger-eats-qa.vercel.app') 
        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats') //verificar se existe um texto
    })
})

