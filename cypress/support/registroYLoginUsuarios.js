Cypress.Commands.add("login", (email, password) => {
    cy.contains('button', 'Login').click({ force: true });
    cy.get('input[data-cy="input-email"]').clear().type(email);
    cy.get('input[data-cy="input-password"]').clear().type(password);
    cy.get('button[data-cy="btn-login"]').click();
});

Cypress.Commands.add("validarTexto", (texto) => {
    cy.contains(texto).should('be.visible');
});

Cypress.Commands.add("recuperarContrasena", (email) => {
    cy.contains('button', 'Login').click({ force: true });
    cy.get('button[data-cy="btn-forgot-password"]').click();
    cy.get('input[data-cy="input-email"]').clear().type(email);
    cy.get('button[data-cy="btn-enviar"]').click();
});

Cypress.Commands.add("registrarUsuario", (datos) => {
        cy.contains('button', 'Login').click({ force: true });
    cy.get('button[data-cy="btn-register-user"]').click();
    cy.get('[data-cy="input-nombres"]').clear().type(datos.nombre);
    cy.get('[data-cy="input-apellido"]').clear().type(datos.apellido);
    cy.get('[data-cy="input-telefono"]').clear().type(datos.telefono);
    cy.get('[data-cy="input-dni"]').clear().type(datos.dni);
    cy.get('[data-cy="select-provincia"]').type(datos.provincia + '{enter}');
    cy.get('[data-cy="select-localidad"]').type(datos.localidad + '{enter}');
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="day"]').click().type(datos.fechaNacimiento.dia);
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="month"]').click().type(datos.fechaNacimiento.mes);
    cy.get('[data-cy="input-fecha-nacimiento"] [data-type="year"]').click().type(datos.fechaNacimiento.anio);
    cy.get('[data-cy="input-email"]').clear().type(`${datos.email}@example.com`);
    cy.get('[data-cy="input-confirmar-email"]').clear().type(`${datos.email}@example.com`);
    cy.get('[data-cy="input-password"]').clear().type(datos.password);
    cy.get('[data-cy="input-repetir-password"]').clear().type(datos.repetirPassword);
    cy.get('[data-cy="btn-registrarse"]').click();
});