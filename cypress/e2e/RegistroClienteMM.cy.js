describe('Prueba de Registro de Cliente', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('https://ticketazo.com.ar/auth/registerClient')
        cy.title().should('eq', 'Ticketazo')
    })

    it('Registro con campos vacios', () => {
        cy.get('[data-cy="btn-registrarse"]').click()

    })

    it('Registro con datos validos', () => {
        const email = Date.now();
        const dni = Math.floor(1e10 + Math.random() * 9e10);

        cy.get('.grid > :nth-child(1) > .tap-highlight-transparent > .inline-flex').type('Lorenas Movies')
        cy.get('.grid > :nth-child(2) > .relative > .inline-flex').type(dni)
        cy.get('[data-cy="select-provincia"]').type('Ciudad Autónoma de Buenos Aires' + '{enter}')
        cy.get('[data-cy="select-localidad"]').type('Caballito' + '{enter}')
        cy.get('.grid > :nth-child(5) > .relative > .inline-flex').type('Av. San Martin 1567')
        cy.get(':nth-child(6) > .relative > .inline-flex').type('1126405620')
        cy.get(':nth-child(7) > .relative > .inline-flex').type(`${email}@hotmail.com`)
        cy.get(':nth-child(8) > .relative > .inline-flex').type(`${email}@hotmail.com`)
        cy.get(':nth-child(9) > .relative > .inline-flex').type('Lorena08.')
        cy.get(':nth-child(10) > .relative > .inline-flex').type('Lorena08.')
        cy.get('[data-cy="btn-registrarse"]').click()

        cy.wait(7000);
        cy.aprobarClientePorCuit(`${email}@hotmail.com`);
        cy.login(`${email}@hotmail.com`, 'Lorena08.');
        cy.validarTexto('Logout');
        cy.validarTexto('Mis entradas');
        cy.validarTexto('Mi perfil');
    })

    it('Registro con datos invalidos', () => {
        cy.get('.grid > :nth-child(1) > .tap-highlight-transparent > .inline-flex').type('hiohíhihuhk')
        cy.get('.grid > :nth-child(2) > .relative > .inline-flex').type('455544555555')
        cy.get('[data-cy="select-provincia"]').type('Corrientes' + '{enter}')
        cy.get('[data-cy="select-localidad"]').type('Alvear' + '{enter}')
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

        cy.contains('button', 'Login').click({ force: true });

    })

        it('cambiar de modo claro a oscuro y viceversa', () => {
        cy.get('input[role="switch"]').first().click({ force: true });
        cy.get('html').should('have.class', 'light');

        cy.get('input[role="switch"]').first().click({ force: true });
        cy.get('html').should('have.class', 'dark');
    });

})