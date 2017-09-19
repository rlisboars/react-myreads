import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

// Component that renders a books's shelf

const BooksShelf = (props) => (
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

BooksShelf.propTypes =  {
    /** Shelf title */
    title: PropTypes.string.isRequired,
    /** Array of books currently on this shelf */
    books: PropTypes.arrayOf(PropTypes.object),
    /** Callback function from the parent used to redefine a book shelf */
    onChangeShelf: PropTypes.func.isRequired
}
    
export default BooksShelf