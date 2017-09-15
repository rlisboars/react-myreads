import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../api/BooksAPI'
import Book from './Book'

/**
 * Component that renders the books search feature.
 */
class BooksSearch extends Component {
    static propTypes = {
        /**  List of books that are in the user shelfs */
        myBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
        /**  Callback function to change book shelf */
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: undefined
    }

    searchBooks(e) {
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
                        <Book data={book} onChangeShelf={(book) => this.props.onChangeShelf(book)}/>
                    </li>
                ))

                }
              </ol>
            </div>
          </div>
        )
    }
}

export default BooksSearch