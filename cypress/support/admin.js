Cypress.Commands.add('aprobarEventoPorNombre', (nombreEvento) => {
    cy.getCookies().then((cookies) => {
        cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}/api/backend/auth/login`,
            body: {
                email: 'admin@admin.com',
                password: 'admin'
            },
            failOnStatusCode: false
        }).then((loginResponse) => {
            expect(loginResponse.status).to.eq(200);

            if (!loginResponse.headers['set-cookie'] || !loginResponse.headers['set-cookie'][0]) {
                throw new Error('No se encontró cookie de autenticación en la respuesta');
            }

            const authToken = loginResponse.headers['set-cookie'][0].split(';')[0].split('=')[1];

            cy.request({
                method: 'GET',
                url: `${Cypress.config('baseUrl')}/api/backend/events/all`,
                headers: {
                    authToken: authToken
                },
                failOnStatusCode: false
            }).then((eventsResponse) => {
                expect(eventsResponse.status).to.eq(200);

                const evento = eventsResponse.body.find(e => e.name === nombreEvento);
                if (!evento) {
                    throw new Error(`Evento "${nombreEvento}" no encontrado`);
                }

                cy.request({
                    method: 'PUT',
                    url: `${Cypress.config('baseUrl')}/api/backend/events/updateEstadoEvento`,
                    headers: {
                        authToken: authToken
                    },
                    body: {
                        estado: 1,
                        id: evento.id
                    },
                    failOnStatusCode: false
                }).then((updateResponse) => {
                    expect(updateResponse.status).to.eq(200);
                    expect(updateResponse.body).to.eq('Evento actualizado correctamente');

                    cy.clearCookies();
                    cookies.forEach(cookie => {
                        cy.setCookie(cookie.name, cookie.value, {
                            domain: cookie.domain,
                            path: cookie.path,
                            secure: cookie.secure,
                            httpOnly: cookie.httpOnly
                        });
                    });
                });
            });
        });
    });
});

Cypress.Commands.add('aprobarClientePorCuit', (email) => {
    cy.getCookies().then((cookies) => {
        cy.request({
            method: 'POST',
            url: `${Cypress.config('baseUrl')}/api/backend/auth/login`,
            body: {
                email: 'admin@admin.com',
                password: 'admin'
            },
            failOnStatusCode: false
        }).then((loginResponse) => {
            expect(loginResponse.status).to.eq(200);

            if (!loginResponse.headers['set-cookie'] || !loginResponse.headers['set-cookie'][0]) {
                throw new Error('No se encontró cookie de autenticación en la respuesta');
            }

            const authToken = loginResponse.headers['set-cookie'][0].split(';')[0].split('=')[1];

            cy.request({
                method: 'GET',
                url: `${Cypress.config('baseUrl')}/api/backend/auth/UsuariosAConfirmar`,
                headers: {
                    authToken: authToken
                },
                failOnStatusCode: false
            }).then((usuariosResponse) => {
                expect(usuariosResponse.status).to.eq(200);

                const usuario = usuariosResponse.body.find(u => u.email === email);
                if (!usuario) {
                    throw new Error(`Usuario con email "${email}" no encontrado`);
                }

                cy.request({
                    method: 'PUT',
                    url: `${Cypress.config('baseUrl')}/api/backend/auth/confirmarUsuario`,
                    headers: {
                        authToken: authToken
                    },
                    body: {
                        userId: usuario.id,
                        Estado: 1
                    },
                    failOnStatusCode: false
                }).then((updateResponse) => {
                    expect(updateResponse.status).to.eq(200);
                    expect(updateResponse.body).to.eq('Estado del usuario actualizado con éxito');


                    cy.clearCookies();
                    cookies.forEach(cookie => {
                        cy.setCookie(cookie.name, cookie.value, {
                            domain: cookie.domain,
                            path: cookie.path,
                            secure: cookie.secure,
                            httpOnly: cookie.httpOnly
                        });
                    });
                });
            });
        });
    });
});