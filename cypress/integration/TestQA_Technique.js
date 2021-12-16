/**
 * Auteur : Moustapha SAKHO
 * Date : 15/12/21
 * But : Tester sur le site https://www.staging.maiia.com/ la prise d'un RDV avec un Médecin précis pour un motif précis
 */
describe('Vérification des disponibilités d\'un médecin de Maiia', function () {
    it('Test de slection du médecin', function () {
        cy.visit('https://www.staging.maiia.com/')
        // On commence avec un test propre
        cy.clearCookies()
        cy.clearLocalStorage()
        // Si la popup des Cookies apparaît, je refuse les Cookies
        cy.get('div').then((refuser) => {
            if (refuser.text().includes('refuser')) {
                // On clique sur le bouton 'refuser tout'
                cy.get('#tarteaucitronAllDenied2').should('include.text', 'refuser').click({ force: true })
            //Sinon on continue le test
            } else {
                // On sélectionne la première entrée de texte
                cy.get('#downshift_input_0').should('be.visible')
                // On entre le nom du Médecin
                cy.get('#downshift_input_0').clear().type('Dr Test QATECHNIQUE')
                cy.get('.wrapper-info > :nth-child(1)').should('be.visible')
                // On sélectionne son nom dans la liste
                cy.get('.wrapper-info > :nth-child(1)').click()
                cy.get('#consultationReasonName').should('be.visible')
                cy.get('#consultationReasonName').click()
                // On sélectionne l"Ablation de fils"
                cy.get('[data-cy="Ablation de fils"] > .selected-list-item').should('be.visible')
                cy.get('[data-cy="Ablation de fils"] > .selected-list-item').click()
                // On vérifie que la classe '.search-card__rdv.availability-calendar' est présente
                cy.get('.search-card__rdv.availability-calendar').should('be.visible')
            }
        })
    })
})