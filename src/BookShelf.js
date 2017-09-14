import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        { this.props.books && this.props.books.map(book => {
                            return(
                                <li key={book.id}>
                                    <Book data={book} />
                                </li>
                            )
                        }) }
                    </ol>
                </div>
            </div>
        )
    }
}
    
export default BookShelf