import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../api/BooksAPI'
import Book from './Book'
import _ from 'lodash'

/**
 * Component that renders the books search feature.
 */
class BooksSearch extends Component {
    static propTypes = {
        /**  List of books that are in the user's shelfs */
        myBooks: PropTypes.arrayOf(PropTypes.object).isRequired,
        /**  Callback function from the parent used to redefine a book shelf */
        onChangeShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: undefined
    }

    /**
     * Function that controls the search textfield updating the state and calling the API search
     * @public
     * @param {string} query text to be searched
     */
    searchBooks(query) {
        this.setState({ query })
        this.searchDebounced(query.trim())
    }

    searchDebounced = _.debounce((query) => {
        if (query.trim() !== "") 
            BooksAPI.search(query, 20).then(books => {
                if (!books || books.error) this.setState({ books: [] })
                else {
                    this.setState({
                        books: books.map(book => {
                            const inShelf = this.props.myBooks.find(b => b.id === book.id)
                            if (inShelf) return Object.assign(book, { shelf: inShelf.shelf })
                            return book
                        })
                    })
                }
            })
        else this.setState({ books: [] })
    }, 300)

    render() {
        return(
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input 
                    type="text"
                    value={this.state.query} 
                    onChange={(e) => this.searchBooks(e.target.value)}
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