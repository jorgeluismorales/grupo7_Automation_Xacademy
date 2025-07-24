describe('Prueba de Registro de Cliente', () => {

    beforeEach( () => {
    cy.visit('https://ticketazo.com.ar/auth/registerClient')
    cy.title().should('eq','Ticketazo')
  })

  it('Registro con campos vacios', () => { 
    cy.get('[data-cy="btn-registrarse"]').click()
    
})

it('Registro con datos validos', () => { 
    cy.get('.grid > :nth-child(1) > .tap-highlight-transparent > .inline-flex').type('Lorenas Movies')
    cy.get('.grid > :nth-child(2) > .relative > .inline-flex').type('27956725687')
    cy.get('[data-cy="select-provincia"]').select('Ciudad Autónoma de Buenos Aires')
    cy.get('[data-cy="select-localidad"]').select('Caballito')
    cy.get('.grid > :nth-child(5) > .relative > .inline-flex').type('Av. San Martin 1567')
    cy.get(':nth-child(6) > .relative > .inline-flex').type('1126405620')
    cy.get(':nth-child(7) > .relative > .inline-flex').type('lorens_mendez@hotmail.com')
    cy.get(':nth-child(8) > .relative > .inline-flex').type('lorens_mendez@hotmail.com')
    cy.get(':nth-child(9) > .relative > .inline-flex').type('Lorena08.')
    cy.get(':nth-child(10) > .relative > .inline-flex').type('Lorena08.')
    cy.get('[data-cy="btn-registrarse"]').click()

})

it.skip('Registro con datos invalidos', () => { 
    cy.get('.grid > :nth-child(1) > .tap-highlight-transparent > .inline-flex').type('hiohíhihuhk')
    cy.get('.grid > :nth-child(2) > .relative > .inline-flex').type('455544555555')
    cy.get('[data-cy="select-provincia"]').select('Corrientes')
    cy.get('[data-cy="select-localidad"]').select('Alvear')
    cy.get('.grid > :nth-child(5) > .relative > .inline-flex').type('jgjgukñkjnñkjpu')
    cy.get(':nth-child(6) > .relative > .inline-flex').type('5555555546')
    cy.get(':nth-child(7) > .relative > .inline-flex').type('lore@gmail.com')
    cy.get(':nth-child(8) > .relative > .inline-flex').type('lore@gmail.com')
    cy.get(':nth-child(9) > .relative > .inline-flex').type('lorena08.')
    cy.get(':nth-child(10) > .relative > .inline-flex').type('lorena08.')
    cy.get('[data-cy="btn-registrarse"]').click()

})

it('Boton "¿Ya tienes cuenta? Inicia sesion"', () => { 

    cy.get('[data-cy="btn-login-link"]').click()

})

it('Boton Login', () => { 

    cy.get('.justify-end > .text-sm').click()
    
})

it('Boton icono Sol/Luna', () => { 

    cy.get('.justify-end > .group').click()
    
})

})