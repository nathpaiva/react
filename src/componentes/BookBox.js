import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import $ from 'axios';

import TreatErrors from '../TreatErrors';
import InputCustomizado from './InputCustomizado';
import ButtonCustom from './ButtonCustom';


class FormBook extends Component {

  constructor(props) {
    super(props);
    // cria estado só na variavel state
    this.state = {
      titulo: '',
      autorId: '',
      preco: ''
    };

    this.novoAutor = this.novoAutor.bind(this);

    this.setTitulo = this.setTitulo.bind(this);
    this.setPreco = this.setPreco.bind(this);
    this.setAutorId = this.setAutorId.bind(this);
  }

  novoAutor(evt) {
    evt.preventDefault();
    const saveNew = JSON.stringify({ titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId });
    $.defaults.headers.post['Content-Type'] = 'application/json';
    $.post('http://localhost:8080/api/livros', saveNew)
      .then(list => {
        this.setState({ titulo: '', preco: '', autorId: '' });
        PubSub.publish("clean-errors", {});
        PubSub.publish('refresh-list-book', list.data);
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

  setTitulo(evt) {
    this.setState({ titulo: evt.target.value });
  }

  setPreco(evt) {
    this.setState({ preco: evt.target.value });
  }

  setAutorId(evt) {
    this.setState({ autorId: evt.target.value });
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.novoAutor} method="post">
          <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Título" />
          <InputCustomizado id="preco" type="number" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preço" />
          <InputCustomizado id="autorId" type="number" name="autorId" value={this.state.autorId} onChange={this.setAutorId} label="Id do Autor" />
          <ButtonCustom label="Gravando" />
        </form>
      </div>
    );
  }
}


class BookList extends Component {

  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Preço</th>
              <th>Autor</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.lista.map((book, i) => {
                return (
                  <tr key={`book.id ${i}`}>
                    <td>{book.id}</td>
                    <td>{book.titulo}</td>
                    <td>{book.preco}</td>
                    <td>{book.autor.nome}</td>
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
    this.state = {
      lista: []
    };
  }

  componentDidMount() {
    $.get('http://localhost:8080/api/livros').then((response) => {
      var data = response.data;

      this.setState({ lista: data });
    });
    PubSub.subscribe('refresh-list-book', (topic, newList) => {
      this.setState({ lista: newList });
    });
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>Cadastro de Livros</h1>
        </div>
        <div className="content" id="content">
          <FormBook />
          <BookList lista={this.state.lista} />
        </div>
      </div>
    );
  }
}

export default AutorBox;
