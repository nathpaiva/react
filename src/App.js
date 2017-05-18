import React, { Component } from 'react';

import '../css/pure.min.css';
import '../css/slide-menu.css';

import InputCustomizado from './componentes/InputCustomizado'
import ButtonCustom from './componentes/ButtonCustom'

import $ from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    // cria estado só na variavel state
    this.state = {
      lista: [],
      nome: '',
      email: '',
      senha: ''
    };

    this.novoAutor = this.novoAutor.bind(this);

    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  componentDidMount() {
    $.get('http://localhost:8080/api/autores').then((response) => {
      var data = response.data;
      if (data.length === 0) data = [{ nome: 'Nath Mock', email: 'nath@nath.com.br', senha: '123456' }, { nome: 'Teste', email: 'teste@teste.com.br', senha: '123456' }];

      this.setState({ lista: data });
    });
  }

  novoAutor(evt) {
    evt.preventDefault();
    const saveNew = JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha });
    $.defaults.headers.post['Content-Type'] = 'application/json';
    $.post('http://localhost:8080/api/autores', saveNew).then((response) => {
      var data = response.data;

      this.setState({ lista: data });
    });
  }

  setNome(evt) {
    this.setState({ nome: evt.target.value });
  }

  setEmail(evt) {
    this.setState({ email: evt.target.value });
  }

  setSenha(evt) {
    this.setState({ senha: evt.target.value });
  }

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">Home</a>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">Autor</a>
              </li>
              <li className="pure-menu-item">
                <a href="#" className="pure-menu-link">Livro</a>
              </li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.novoAutor} method="post">
                <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} changeInput={this.setNome} label="Nome" />
                <InputCustomizado id="email" type="email" name="email" value={this.state.email} changeInput={this.setEmail} label="Email" />
                <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} changeInput={this.setSenha} label="Senha" />
                <ButtonCustom label="Gravando" />
              </form>

            </div>
            <div>
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.lista.map((autor, i) => {
                      return (
                        <tr key={`autor.name ${i}`}>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
