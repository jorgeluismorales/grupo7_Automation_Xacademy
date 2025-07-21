/// <reference types="cypress" />

let datosUsuarios;

describe('Registro y login de usuarios', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.fixture('registroYLoginUsuarios').then((datos) => {
      datosUsuarios = datos;
    });
  });

  it('Login con credenciales inválidas', () => {
    cy.login(datosUsuarios.usuarioInvalido.email, datosUsuarios.usuarioInvalido.password);

    cy.validarTexto('Correo o contraseña incorrectos');
  });

  it('Login con credenciales válidas', () => {
    cy.login(datosUsuarios.usuarioValido.email, datosUsuarios.usuarioValido.password);

    cy.validarTexto('Logout');
    cy.validarTexto('Mis entradas');
    cy.validarTexto('Mi perfil');
  });

  it('Login con credenciales válidas con "Enter" desde el teclado', () => {
    cy.contains('button', 'Login').click({ force: true });
    cy.get('input[data-cy="input-email"]').clear().type(datosUsuarios.usuarioValido.email);
    cy.get('input[data-cy="input-password"]').clear().type(datosUsuarios.usuarioValido.password + '{enter}');

    cy.validarTexto('Logout');
    cy.validarTexto('Mis entradas');
    cy.validarTexto('Mi perfil');
  });

  it('Enviar solicitud de recuperación con email registrado', () => {
    cy.recuperarContrasena(datosUsuarios.usuarioValido.email);

    cy.validarTexto('Se ha enviado un correo para restablecer la contraseña');
  })

  it('Enviar solicitud de recuperación con email registrado y verificar correo', () => {
    cy.recuperarContrasena(datosUsuarios.usuarioValido.email);

    cy.validarTexto('Se ha enviado un correo para restablecer la contraseña');

    cy.origin('https://yopmail.com/es', () => {
      cy.visit('/');
      cy.get('#login').type('probando123123');
      cy.get('#refreshbut').click();
      cy.get('#refresh').click();

      cy.get('#ifinbox')
        .its('0.contentDocument.body').should('not.be.empty')
        .then(cy.wrap)
        .find('.m')
        .first()
        .should('contain.text', 'Recuperar contraseña - Ticketazo');

      cy.wait(2000);

    });
  })

  it('Registro exitoso con datos válidos', () => {
    const email = Date.now();
    const dni = Math.floor(10000000 + Math.random() * 90000000);

    cy.registrarUsuario({
      nombre: 'Jorge',
      apellido: 'Morales',
      telefono: '1234567890',
      dni,
      provincia: 'Buenos Aires',
      localidad: 'Abbott',
      fechaNacimiento: {
        dia: '15',
        mes: '07',
        anio: '1990'
      },
      email,
      password: 'Pass_1234',
      repetirPassword: 'Pass_1234'
    });
    cy.on('window:alert', (text) => {
      expect(text).to.contain('Usuario registrado con éxito. Por favor, verifica tu correo electrónico para activar tu cuenta.');
    });
  })

  it('Registro con nombre que contiene tildes y caracteres especiales permitidos', () => {
    const email = Date.now();
    const dni = Math.floor(10000000 + Math.random() * 90000000);

    cy.registrarUsuario({
      nombre: 'João Antônio',
      apellido: 'Gonçalves',
      telefono: '1234567890',
      dni,
      provincia: 'Buenos Aires',
      localidad: 'Abbott',
      fechaNacimiento: {
        dia: '15',
        mes: '07',
        anio: '1990'
      },
      email,
      password: 'Pass_1234',
      repetirPassword: 'Pass_1234'
    });
    cy.on('window:alert', (text) => {
      expect(text).to.contain('Usuario registrado con éxito. Por favor, verifica tu correo electrónico para activar tu cuenta.');
    });
  })

  it('Registro con email ya registrado', () => {
    const dni = Math.floor(10000000 + Math.random() * 90000000);

    cy.registrarUsuario({
      nombre: 'Pepe',
      apellido: 'Argento',
      telefono: '1234567890',
      dni,
      provincia: 'Buenos Aires',
      localidad: 'Abbott',
      fechaNacimiento: {
        dia: '15',
        mes: '07',
        anio: '1990'
      },
      email: 'probando123123',
      password: 'Pass_1234',
      repetirPassword: 'Pass_1234'
    });
    cy.validarTexto('Ya existe un usuario registrado con ese correo electrónico');
  })

  it('Registro con contraseñas que no coinciden', () => {
    const email = Date.now();
    const dni = Math.floor(10000000 + Math.random() * 90000000);

    cy.registrarUsuario({
      nombre: 'Pepe',
      apellido: 'Argento',
      telefono: '1234567890',
      dni,
      provincia: 'Buenos Aires',
      localidad: 'Abbott',
      fechaNacimiento: {
        dia: '15',
        mes: '07',
        anio: '1990'
      },
      email,
      password: 'Pass_1234',
      repetirPassword: 'Pass_12345'
    });
    cy.validarTexto('Las contraseñas no coinciden');
  })

    it('Registro con dni ya registrado', () => {
    const email = Date.now();

    cy.registrarUsuario({
      nombre: 'Pepe',
      apellido: 'Argento',
      telefono: '1234567890',
      dni: '11111111',
      provincia: 'Buenos Aires',
      localidad: 'Abbott',
      fechaNacimiento: {
        dia: '15',
        mes: '07',
        anio: '1990'
      },
      email,
      password: 'Pass_1234',
      repetirPassword: 'Pass_1234'
    });
    cy.validarTexto('Ya existe un usuario registrado con ese DNI');
  })
});