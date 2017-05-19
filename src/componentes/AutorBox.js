import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'axios';

import TreatErrors from '../TreatErrors';
import InputCustomizado from './InputCustomizado';
import ButtonCustom from './ButtonCustom';


class FormAutor extends Component {

  constructor(props) {
    super(props);
    // cria estado só na variavel state
    this.state = {
      nome: '',
      email: '',
      senha: ''
    };

    this.novoAutor = this.novoAutor.bind(this);

    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  novoAutor(evt) {
    evt.preventDefault();
    const saveNew = JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha });
    $.defaults.headers.post['Content-Type'] = 'application/json';
    $.post('http://localhost:8080/api/autores', saveNew)
      .then(list => {
        // this.props.callbackAtualizaLista(list.data);
        this.setState({ nome: '', email: '', senha: '' });
        PubSub.publish("clean-errors", {});
        PubSub.publish('refresh-list-autor', list.data);
      })
      .catch(error => {
        const err = error.response;
        if (err.status === 400) {
          console.log('veio aqui dentro');
          console.log('err', err);
          new TreatErrors().pubError(err.data.errors);
        }
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
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.novoAutor} method="post">
          <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
          <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
          <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />
          <ButtonCustom label="Gravando" />
        </form>
      </div>
    );
  }
}


class ListaAutor extends Component {

  render() {
    return (
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
              this.props.lista.map((autor, i) => {
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
      </div>)
      ;
  }
}

class AutorBox extends Component {
  constructor(props) {
    super(props);
    // cria estado só na variavel state
    this.state = {
      lista: []
    };

    // this.atualizaLista = this.atualizaLista.bind(this);
  }

  componentDidMount() {
    $.get('http://localhost:8080/api/autores').then((response) => {
      var data = response.data;
      if (data.length === 0) data = [{ nome: 'Nath Mock', email: 'nath@nath.com.br', senha: '123456' }, { nome: 'Teste', email: 'teste@teste.com.br', senha: '123456' }];

      this.setState({ lista: data });
    });
    PubSub.subscribe('refresh-list-autor', (topic, newList) => {
      this.setState({ lista: newList });
    });
  }

  // atualizaLista(list) {
  //   this.setState({ lista: list });
  // }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de autores</h1>
        </div>
        <div className="content" id="content">
          <FormAutor />
          {/*<FormAutor callbackAtualizaLista={this.atualizaLista} />*/}
          <ListaAutor lista={this.state.lista} />
        </div>
      </div>
    );
  }
}

export default AutorBox;

// export { FormAutor, ListaAutor };
