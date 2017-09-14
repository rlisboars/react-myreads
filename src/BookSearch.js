import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookSearch extends Component {
    state = {
        query: '',
        books: undefined
    }
    searchBooks(e) {
        console.log('entrou')
        this.setState({
            query: e.target.value
        })
        if (e.target.value.length > 0) 
            BooksAPI.search(e.target.value, 20).then(books => {
                if (!books || books.error) this.setState({ books: [] })
                else {
                    books.map(book => {
                        const inShelf = this.props.myBooks.find(b => b.id === book.id)
                        if (inShelf) return Object.assign(book, { shelf: inShelf.shelf })
                        return book
                    })
                    this.setState({books})
                }
            })
        else this.setState({ books: [] })
    }
    render() {
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                    type="text"
                    value={this.state.query} 
                    onChange={(e) => this.searchBooks(e)}
                    placeholder="Search by title or author"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                { this.state.books && this.state.books.map(book => (
                    <li key={book.id}>
                        <Book data={book}/>
                    </li>
                ))

                }
              </ol>
            </div>
          </div>
        )
    }
}

export default BookSearch