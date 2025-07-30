
describe("Ticketazo - Login",() => {
   beforeEach  (() => {
      cy.visit("https://vps-3696213-x.dattaweb.com/auth/login");
      cy.get('[data-cy="input-email"]').type('belupietra@gmail.com');
      cy.get('input[type="password"]').type('asdqwe123ASDQWE!"#');
      cy.get('[data-cy="btn-login"]').click();
      });

 it('Comprar entrada- Exitoso Gratis- Con butacas', () => {
    cy.get('[data-cy="btn-ver-evento-7"]').should('be.visible').click();
    cy.contains('button', 'Adquirir entrada', { timeout: 10000 }).click();
    cy.contains('span', 'Auditorio', { timeout: 10000 }).should('be.visible').click();
    cy.get('button[title^="Fila"]:not(:disabled)').first().click();
    cy.contains('button', 'Comprar').click();
    cy.contains('Generar Entrada Gratuita').click();
 });

it('Comprar entrada- Exitoso Gratis- Sin butacas', () => {
   cy.get('[aria-label="pagination item 4"]').click();
   cy.get('[data-cy="btn-ver-evento-145"]').click();
   cy.contains('button', 'Adquirir entrada', { timeout: 10000 }).click();
   cy.get('[data-cy="btn-sumar-Campo"]',{ timeout: 10000 }).click();
   cy.get('[data-cy="btn-sumar-Campo"]',{ timeout: 10000 }).click();
   cy.contains('button', 'Continuar').click();
   cy.contains('Generar Entrada Gratuita').click();
});

it('Comprar entrada- Sin Butacas-MP', () => {
   cy.get('[data-cy="btn-ver-evento-2"]').click();
   cy.contains('button', 'Adquirir entrada', { timeout: 10000 }).click();
   cy.contains('button', 'Sin Butacas', { timeout: 10000 }).click();
   cy.contains('button', '+').click();
   cy.contains('button', '+').click();
   cy.contains('button', '+').click();
   cy.contains('button', '+').click();
   cy.contains('button', 'Comprar').click();
   cy.get('input[aria-label="Aceptar términos"]').click();
   cy.contains('Pagar').click();
   cy.wait(5000)
});

it('Comprar entrada- Con Butacas-MP', () => {
   cy.get('[data-cy="btn-ver-evento-1"]').click();
   cy.contains('button', 'Adquirir entrada', { timeout: 10000 }).click();
   cy.contains('button', 'Con Butacas', { timeout: 10000 }).click();
   cy.get('button[title^="Fila"]:not(:disabled)').first().click();
   cy.contains('button', 'Comprar').click();
   cy.get('input[aria-label="Aceptar términos"]').click();
   cy.contains('Pagar').click();
   cy.wait(5000)
});

it('Sin aceptar Terminos y condiciones - MP', () => {
   cy.get('[data-cy="btn-ver-evento-12"]').click();
   cy.contains('button', 'Adquirir entrada', { timeout: 10000 }).click();
   cy.contains('button', 'Audiotorio', { timeout: 10000 }).click();
   cy.get('button[title^="Fila"]:not(:disabled)').first().click();
   cy.contains('button', 'Comprar').click();
   cy.contains('Pagar', {timeout: 300}).should('be.disabled');
});

});

describe("Ticketazo - Sin login", () => {
  it("Intentar comprar entrada sin loguearse", () => {
    cy.visit("https://vps-3696213-x.dattaweb.com");

    cy.get('[data-cy="btn-ver-evento-7"]').click();
    cy.contains("Adquirir entrada").click();
    cy.url("https://vps-3696213-x.dattaweb.com/auth/login");
   });

});