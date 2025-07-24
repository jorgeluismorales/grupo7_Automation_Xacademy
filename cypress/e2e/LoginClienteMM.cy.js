describe('Prueba de Login Cliente', () => {

    beforeEach( () => {
    cy.visit('https://ticketazo.com.ar/auth/login')
  })

  it('Login con campos vacios', () => { 

    cy.get('[data-cy="btn-login"]').click()
})

it('Login con datos validos', () => { 

    cy.get(':nth-child(1) > .relative > .inline-flex').type('lorens_mendez@hotmail.com')
    cy.get('.mt-4 > .relative > .inline-flex').type('Lorena08.')
    cy.get('[data-cy="btn-login"]').click()

})

it('Login con datos invalidos', () => { 

    cy.get(':nth-child(1) > .relative > .inline-flex').type('lore@gmail.com')
    cy.get('.mt-4 > .relative > .inline-flex').type('1234.Lm')
    cy.get('[data-cy="btn-login"]').click()

})

it('Prueba boton "G"', () => { 

    cy.get('[data-cy="btn-google-login"]').click()

    
})

it('Prueba boton "¿Olvidaste tu Contraseña?"', () => { 

    cy.get('[data-cy="btn-forgot-password"]').click()

    
})

it('Prueba boton "¿No tienes cuenta? Registrate!"', () => { 

    cy.get('[data-cy="btn-register-user"]').click()

})

it('Prueba boton "¿Queres crear tus eventos?"', () => { 

    cy.get('[data-cy="btn-register-client"]').click()
})

})