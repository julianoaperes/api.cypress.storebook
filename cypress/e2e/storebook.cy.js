describe("/livros POST", () => {
  before(() => {
    cy.dropCollection("livros", {
      database: "test",
      failSilently: "true",
    }).then((result) => {
      cy.log(result); // Will return 'Collection dropped' or the error object if collection doesn’t exist. Will not fail the test
    });
  });

  it("Deve cadastrar um novo livro", () => {
    const livro = {
      titulo: "O Senhor dos Anéis 40",
      autor: "J.R.R. Tolkien",
      editora: "HarperCollins",
      anoPublicacao: 1954,
      numeroPaginas: 1178,
    };

    cy.postLivro(livro).then((response) => {
      expect(response.status).to.eql(201);
      expect(response.body.titulo).to.eql(livro.titulo);
      expect(response.body.autor).to.eql(livro.autor);
      expect(response.body.editora).to.eql(livro.editora);
      expect(response.body.anoPublicacao).to.eql(livro.anoPublicacao);
      expect(response.body.numeroPaginas).to.eql(livro.numeroPaginas);
      expect(response.body._id).to.not.be.empty;
    });
  });

  it("Não Deve cadastrar um livro com o título duplicado", () => {
    const livro = {
      titulo: "O Senhor dos Anéis 35",
      autor: "J.R.R. Tolkien",
      editora: "HarperCollins",
      anoPublicacao: 1954,
      numeroPaginas: 1178,
    };

    cy.postLivro(livro).then((response) => {
      expect(response.status).to.eql(201);
    });

    cy.postLivro(livro).then((response) => {
      expect(response.status).to.eql(409);
      expect(response.body.erro).to.eql("O título do livro já foi cadastrado!");
    });
  });
});
