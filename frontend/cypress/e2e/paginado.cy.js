describe('template spec', () => {
  beforeEach(() => {
    // Visita la página donde se encuentra el carrusel
    cy.visit('http://localhost:3001');
  });

  it('1. La lista debe contener 5 slides visibles en el carrousel de productos destacados', () => {

    cy.get('.MuiBox-root.css-7wh13m > .slick-slider > .slick-list > .slick-track > .slick-active').should('have.length', 5);

  });



    it('boton producto destacados, El primer producto es el iPhone 17 y hay 9 productos en la página', () => {


        cy.get('a.MuiButtonBase-root')
            .contains('Productos')
            .click();

        cy.url().should('include', '/productos');

        const productListContainer = '.MuiBox-root.css-i9gxme .MuiBox-root.css-1fgd84t';

        cy.get(productListContainer).children('a')
            .should('have.length', 9);

        cy.get(productListContainer)
            .children('a')
            .first()
            .should('have.attr', 'href', '/productos/68ee705430b8bdd0b423655b');
    });

  it('Cuando abro el producto iphone 17 me manda a producto detail ', () => {
    cy.get('.slick-track > div[data-index="2"]')
        .as('targetSlide'); // Alias para reutilizar la selección

    // 2. Encuentra el enlace 'a' DENTRO del slide.
    cy.get('@targetSlide')
        .find('a[href="/productos/68ee705430b8bdd0b423655b"]')
        .should('have.attr', 'href', '/productos/68ee705430b8bdd0b423655b')
        .click();


    cy.url().should('include', '/productos/68ee705430b8bdd0b423655b');
  });

  it('Cuando apreta un producto destacado del carrousel lo manda al producto detalle indicado', () => {

    const selectorEnlaceProducto = '.slick-track > div.slick-active[aria-hidden="false"] a[href^="/productos/"]';

    cy.get(selectorEnlaceProducto)
        .first() //agarra el primer enlace que encuentre
        .invoke('attr', 'href')
        .then((expectedHref) => {

          cy.get(selectorEnlaceProducto).first().click();
          //url para verifcar que se navego
          cy.url().should('include', expectedHref);
          expect(expectedHref).to.not.be.empty;
        });
  });

  it('Cuando apreto el siguiente del carrusel, el slide 0 se oculta y el slide 5 se hace visible', () => {
      cy.get('.MuiBox-root.css-7wh13m > .slick-slider > .MuiButtonBase-root> .MuiSvgIcon-root[data-testid="ChevronRightIcon"]')
            .click();

      cy.get('.MuiBox-root.css-7wh13m > .slick-slider > .slick-list > .slick-track > div[data-index="0"]')
            .should('have.attr', 'aria-hidden', 'true')

      cy.get('.MuiBox-root.css-7wh13m > .slick-slider > .slick-list > .slick-track > div[data-index="5"]')
            .should('have.attr', 'aria-hidden', 'false')
            .and('have.class', 'slick-active');

  });

    it('Cuando apreto el anterior del carrusel, el slide 4 se oculta(el 5 elemento visible) y el slide 8 se hace visible(el ultimo)', () => {
        cy.get('.MuiBox-root.css-7wh13m > .slick-slider > .MuiButtonBase-root > .MuiSvgIcon-root[data-testid="ChevronLeftIcon"]')
            .click();

        cy.get('.MuiBox-root.css-7wh13m > .slick-slider > .slick-list > .slick-track > div[data-index="4"]')
            .should('have.attr', 'aria-hidden', 'true')

        cy.get('.MuiBox-root.css-7wh13m > .slick-slider > .slick-list > .slick-track > div[data-index="9"]')
            .should('have.attr', 'aria-hidden', 'false')
            .and('have.class', 'slick-active');

    });

   /*

  it('3. El orden y el estado de ocultamiento de los clones son correctos', () => {
    // Verifica que los slides fuera de la vista tengan la clase aria-hidden="true"
    cy.get('.slick-track > div[data-index="-2"]').should('have.attr', 'aria-hidden', 'true');
    cy.get('.slick-track > div[data-index="0"]').should('have.attr', 'aria-hidden', 'true');
    cy.get('.slick-track > div[data-index="3"]').should('have.attr', 'aria-hidden', 'false'); // Visible o parcialmente visible
  });


  it('4. Al hacer clic en el botón de siguiente, el slide activo cambia', () => {
    // Simula una acción de usuario (mover al siguiente slide)
    // El botón de siguiente generalmente tiene la clase .slick-next o .slick-arrow
    cy.get('button.slick-next').click();

    // Esperar que el nuevo slide activo sea data-index="3" (originalmente 2)
    cy.get('.slick-track > div[data-index="3"]').should('have.class', 'slick-current');
    cy.get('.slick-track > div[data-index="2"]').should('not.have.class', 'slick-current');
  });*/
})