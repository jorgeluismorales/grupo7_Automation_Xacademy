describe('Envio email', () => {

  beforeEach( () => {
    cy.visit('https://ticketazo.com.ar/auth/forgotPassword')
    
  })

  it('Recuperar contraseña con email registrado', () => { 

    cy.get('.relative > .inline-flex').type('lorens_mendez@hotmail.com')
    cy.get('[data-cy="btn-enviar"]').click()

})

it('Recuperar contraseña con email no registrado', () => { 

    cy.get('.relative > .inline-flex').type('lolo@hotmail.com')
    cy.get('[data-cy="btn-enviar"]').click()

})

it('Recuperar contraseña con campo vacio', () => { 

    cy.get('[data-cy="btn-enviar"]').click()

})

})