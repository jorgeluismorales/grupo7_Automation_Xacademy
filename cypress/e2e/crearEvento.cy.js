/// <reference types="cypress" />

let datosUsuarios;

describe('Crear evento', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('/');
        cy.fixture('registroYLoginUsuarios').then((datos) => {
            datosUsuarios = datos;
        });
    });

    it('Crear evento de forma correcta', () => {
        const nombreEvento = `evento de prueba ${Date.now()}`;
        cy.login(datosUsuarios.usuarioOrganizador.email, datosUsuarios.usuarioOrganizador.password);
        cy.contains('a', 'Cargar Evento').should('be.visible').click();
        cy.get('[data-cy="input-titulo"]').clear().type(nombreEvento);

        cy.get('button[aria-label="Calendario"]').click({ force: true });
        cy.get('button[data-slot="next-button"]').click();
        cy.get('[data-slot="grid-body"] [data-slot="cell"]')
            .find('span[role="button"]:not([data-outside-month]):not([data-disabled])')
            .last()
            .click({ force: true });

        cy.get('button[data-cy="select-edad"]').click();
        cy.contains('span', 'ATP').click();
        cy.get('button[data-cy="select-genero"]').click();
        cy.contains('span', 'StandUp').click();
        cy.get('[data-cy="input-horario"] [data-type="hour"]').click().type('23');

        cy.get('[data-cy="input-horario"] [data-type="minute"]').click().type('30');

        cy.get('[data-cy="input-duracion"] [data-type="hour"]').click().type('2');

        cy.get('[data-cy="input-duracion"] [data-type="minute"]').click().type('30');

        cy.get('button[data-cy="select-lugar-evento"]').click();
        cy.contains('span', 'Otro').click();

        cy.get('[data-cy="input-nombre-lugar"]').clear().type('Lugar de prueba');
        cy.get('[data-cy="input-calle-lugar"]').clear().type('Calle de prueba');
        cy.get('[data-cy="input-altura-lugar"]').clear().type('100');
        cy.get('[data-cy="input-codigo-postal-lugar"]').clear().type('12345');

        cy.get('input[name="provincia"]').click().type('Buenos Aires{enter}');
        cy.get('input[aria-label="Localidad"]').click().type('12 de Octubre{enter}');
        cy.get('[data-cy="input-info"]').clear().type('Información adicional del lugar de prueba');
        cy.contains('button', 'Siguiente').should('be.visible').click();

        cy.contains('span', 'Seleccionar entrada').should('be.visible').click();
        cy.contains('span', 'General').should('be.visible').click();
        cy.get('input[aria-label="Capacidad"]').click().type('2000');
        cy.get('input[aria-label="Precio Entrada"]').click().type('5000');
        cy.contains('button', 'Siguiente').should('be.visible').click();

        cy.contains('button', 'Cargar Imagen Evento')
            .find('input[type="file"]')
            .selectFile('cypress/fixtures/images.jpeg', { force: true });

        cy.contains('button', 'Siguiente').should('be.visible').click();
        cy.contains('button', 'Confirmar').should('be.visible').click();

        cy.contains('Evento creado con éxito').should('be.visible');

        cy.aprobarEventoPorNombre(nombreEvento);

        cy.contains('a', 'Mis Eventos').should('be.visible').click();
        cy.contains('p', nombreEvento).should('be.visible');
    });

    it('Crear evento sin imagen obligatoria', () => {
        const nombreEvento = `evento de prueba ${Date.now()}`;
        cy.login(datosUsuarios.usuarioOrganizador.email, datosUsuarios.usuarioOrganizador.password);
        cy.contains('a', 'Cargar Evento').should('be.visible').click();
        cy.get('[data-cy="input-titulo"]').clear().type(nombreEvento);

        cy.get('button[aria-label="Calendario"]').click({ force: true });
        cy.get('button[data-slot="next-button"]').click();
        cy.get('[data-slot="grid-body"] [data-slot="cell"]')
            .find('span[role="button"]:not([data-outside-month]):not([data-disabled])')
            .last()
            .click({ force: true });

        cy.get('button[data-cy="select-edad"]').click();
        cy.contains('span', 'ATP').click();
        cy.get('button[data-cy="select-genero"]').click();
        cy.contains('span', 'StandUp').click();
        cy.get('[data-cy="input-horario"] [data-type="hour"]').click().type('23');

        cy.get('[data-cy="input-horario"] [data-type="minute"]').click().type('30');

        cy.get('[data-cy="input-duracion"] [data-type="hour"]').click().type('2');

        cy.get('[data-cy="input-duracion"] [data-type="minute"]').click().type('30');

        cy.get('button[data-cy="select-lugar-evento"]').click();
        cy.contains('span', 'Otro').click();

        cy.get('[data-cy="input-nombre-lugar"]').clear().type('Lugar de prueba');
        cy.get('[data-cy="input-calle-lugar"]').clear().type('Calle de prueba');
        cy.get('[data-cy="input-altura-lugar"]').clear().type('100');
        cy.get('[data-cy="input-codigo-postal-lugar"]').clear().type('12345');

        cy.get('input[name="provincia"]').click().type('Buenos Aires{enter}');
        cy.get('input[aria-label="Localidad"]').click().type('12 de Octubre{enter}');
        cy.get('[data-cy="input-info"]').clear().type('Información adicional del lugar de prueba');
        cy.contains('button', 'Siguiente').should('be.visible').click();

        cy.contains('span', 'Seleccionar entrada').should('be.visible').click();
        cy.contains('span', 'General').should('be.visible').click();
        cy.get('input[aria-label="Capacidad"]').click().type('2000');
        cy.get('input[aria-label="Precio Entrada"]').click().type('5000');
        cy.contains('button', 'Siguiente').should('be.visible').click();

        cy.contains('button', 'Siguiente').should('be.visible').click();
        cy.contains('button', 'Confirmar').should('be.visible').click();

        cy.contains('Ocurrió un error al crear el evento').should('be.visible');
    });

    it('Crear evento con imagen con formato incorrecto', () => {
        const nombreEvento = `evento de prueba ${Date.now()}`;
        cy.login(datosUsuarios.usuarioOrganizador.email, datosUsuarios.usuarioOrganizador.password);
        cy.contains('a', 'Cargar Evento').should('be.visible').click();
        cy.get('[data-cy="input-titulo"]').clear().type(nombreEvento);

        cy.get('button[aria-label="Calendario"]').click({ force: true });
        cy.get('button[data-slot="next-button"]').click();
        cy.get('[data-slot="grid-body"] [data-slot="cell"]')
            .find('span[role="button"]:not([data-outside-month]):not([data-disabled])')
            .last()
            .click({ force: true });

        cy.get('button[data-cy="select-edad"]').click();
        cy.contains('span', 'ATP').click();
        cy.get('button[data-cy="select-genero"]').click();
        cy.contains('span', 'StandUp').click();
        cy.get('[data-cy="input-horario"] [data-type="hour"]').click().type('23');

        cy.get('[data-cy="input-horario"] [data-type="minute"]').click().type('30');

        cy.get('[data-cy="input-duracion"] [data-type="hour"]').click().type('2');

        cy.get('[data-cy="input-duracion"] [data-type="minute"]').click().type('30');

        cy.get('button[data-cy="select-lugar-evento"]').click();
        cy.contains('span', 'Otro').click();

        cy.get('[data-cy="input-nombre-lugar"]').clear().type('Lugar de prueba');
        cy.get('[data-cy="input-calle-lugar"]').clear().type('Calle de prueba');
        cy.get('[data-cy="input-altura-lugar"]').clear().type('100');
        cy.get('[data-cy="input-codigo-postal-lugar"]').clear().type('12345');

        cy.get('input[name="provincia"]').click().type('Buenos Aires{enter}');
        cy.get('input[aria-label="Localidad"]').click().type('12 de Octubre{enter}');
        cy.get('[data-cy="input-info"]').clear().type('Información adicional del lugar de prueba');
        cy.contains('button', 'Siguiente').should('be.visible').click();

        cy.contains('span', 'Seleccionar entrada').should('be.visible').click();
        cy.contains('span', 'General').should('be.visible').click();
        cy.get('input[aria-label="Capacidad"]').click().type('2000');
        cy.get('input[aria-label="Precio Entrada"]').click().type('5000');
        cy.contains('button', 'Siguiente').should('be.visible').click();

        cy.contains('button', 'Cargar Imagen Evento')
            .find('input[type="file"]')
            .selectFile('cypress/fixtures/image.png', { force: true });

        cy.contains('La imagen debe ser en formato .jpg (.jpeg).').should('be.visible');
    });


    it.only('Crear evento con fecha anterior al dia actual', () => {
        const nombreEvento = `evento de prueba ${Date.now()}`;
        cy.login(datosUsuarios.usuarioOrganizador.email, datosUsuarios.usuarioOrganizador.password);
        cy.contains('a', 'Cargar Evento').should('be.visible').click();
        cy.get('[data-cy="input-titulo"]').clear().type(nombreEvento);

        cy.get('button[aria-label="Calendario"]').click({ force: true });
        cy.get('[data-slot="grid-body"] [data-slot="cell"]')
            .find('span[role="button"]:not([data-outside-month]):not([data-disabled])')
            .first()
            .click({ force: true });

        cy.get('div[data-slot="error-message"]').should('be.visible');
        cy.contains('La fecha debe ser al menos 24 horas a partir de hoy.').should('be.visible');

    });

}); 