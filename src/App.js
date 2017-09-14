import React from 'react'
import './App.css'
import { Route, Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    myBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ myBooks: books })
    });
  }

  changeShelf(book) {
	  
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelf title='Currently Reading' books={this.state.myBooks.filter(book => book.shelf === 'currentlyReading')} />
            <BookShelf title='Want to Read' books={this.state.myBooks.filter(book => book.shelf === 'wantToRead')} />
            <BookShelf title='Read' books={this.state.myBooks.filter(book => book.shelf === 'read')} />
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
        <Route path='/search' render={() => (
          <BookSearch myBooks={this.state.myBooks}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
