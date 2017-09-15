import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BooksShelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    { props.books && props.books.map(book => {
                        return(
                            <li key={book.id}>
                                <Book data={book} onChangeShelf={(book) => props.onChangeShelf(book)}/>
                            </li>
                        )
                    }) }
                </ol>
            </div>
        </div>
    )
}

BooksShelf.propTypes =  {
    title: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.object),
    onChangeShelf: PropTypes.func.isRequired
}
    
export default BooksShelf