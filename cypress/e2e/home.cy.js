
describe('Home - Funcionalidad de filtros y navegación', () => {

  beforeEach(() => {
  cy.visit('https://ticketazo.com.ar/')
  cy.wait(500)
})

  it('TC01 - Carga de la home correctamente', () => {
    cy.get('[data-testid="event-card"]').should('exist')
  })

  it('TC03 - Navbar con barra de búsqueda visible', () => {
   cy.get('input[placeholder="Busca tu próxima función!"]')
   .should('be.visible')
  })

  it('TC32 - Filtro por fecha manual', () => {
  cy.get('[aria-label="día, Fecha de inicio, "]').click().type('02')
  cy.get('[aria-label="mes, Fecha de inicio, "]').click().type('02')
  cy.get('[aria-label="año, Fecha de inicio, "]').click().type('2025')
  cy.get('[aria-label="día, Fecha final, "]').click().type('30')
  cy.get('[aria-label="mes, Fecha final, "]').click().type('05')
  cy.get('[aria-label="año, Fecha final, "]').click().type('2025')
  cy.get('[data-cy="evento-titulo"]').should('exist')
})

const categorias = [
  'Recital', 'Teatro', 'StandUp', 'Fiesta', 'Conferencia',
  'Deportes', 'Feria', 'Festival', 'Exposición', 'Otro'
]
categorias.forEach(categoria => {
  it(`Filtrar por categoría: ${categoria}`, () => {
    cy.get('[data-testid="navbar-category-filter"]').click()
    cy.get(`li[data-key="${categoria}"]`).click()
    cy.get(`li[data-key="${categoria}"]`)
      .should('have.attr', 'aria-selected', 'true')
      .and('have.attr', 'data-selected', 'true')
    cy.contains('button', 'Limpiar filtros').click()
  })
})

  const provincias = [
  'Buenos Aires',
  'Chubut',
  'Corrientes',
  'Ciudad Autónoma de Buenos Aires',
  'Córdoba'
]
provincias.forEach(provincia => {
  it(`TC - Filtrar por provincia: ${provincia}`, () => {
    cy.get('[data-testid="navbar-location-filter"]').click()
    cy.contains('li', provincia).click()
    cy.get('li[aria-selected="true"]').should('contain.text', provincia)
    cy.get('[data-testid="navbar-location-locality-filter"]').should('be.visible')
  })
})


  it('TC - Información basica del evento', () => {
  cy.get('[data-testid="event-card"]').should('exist')
  cy.get('[data-testid="event-card"]').each(($card) => {
    cy.wrap($card).within(() => {
      cy.get('[data-cy="evento-titulo"]').should('be.visible')
      cy.get('[data-cy="evento-horario"]').should('be.visible')
      cy.get('[data-cy="evento-lugar"]').should('be.visible')
    })
  })
})


  it('TC10 - Botón login redirige correctamente', () => {
    cy.contains('button','Login').click()
    cy.url().should('include', '/login')
  })

it('TC14 - Búsqueda por nombre con resultados', () => {
  cy.get('input[placeholder="Busca tu próxima función!"]')
    .clear()
    .type('Esperando La Carroza')
  cy.get('[data-testid="event-card"]')
    .should('exist')
    .each(($card) => {
      cy.wrap($card).should('contain.text', 'Esperando La Carroza')
    })
})


})
