import React from 'react'
import './styles/App.css'
import { Route, Link } from 'react-router-dom'
import BooksShelf from './components/BooksShelf'
import BooksSearch from './components/BooksSearch'
import * as BooksAPI from './api/BooksAPI'

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
		let bookIdx
		this.state.myBooks.find((bk, idx) => {
			if (bk.id === book.id) {
				bookIdx = idx
				return true
			}
			return false
		})
		BooksAPI.update(book, book.shelf).then(b => {
			this.setState(prevState => {
				let updatedBooks = prevState.myBooks.slice()
				if (bookIdx === undefined) updatedBooks.push(book)
				else updatedBooks[bookIdx].shelf = book.shelf
				return { myBooks: updatedBooks }
			})
		})
	}

	render() {
		return (
			<div className="app">
				<Route exact path='/' render={() => (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<BooksShelf title='Currently Reading' books={this.state.myBooks.filter(book => book.shelf === 'currentlyReading')} onChangeShelf={(book) => this.changeShelf(book)} />
						<BooksShelf title='Want to Read' books={this.state.myBooks.filter(book => book.shelf === 'wantToRead')} onChangeShelf={(book) => this.changeShelf(book)} />
						<BooksShelf title='Read' books={this.state.myBooks.filter(book => book.shelf === 'read')} onChangeShelf={(book) => this.changeShelf(book)} />
						<div className="open-search">
							<Link to='/search'>Add a book</Link>
						</div>
					</div>
				)} />
				<Route path='/search' render={() => (
					<BooksSearch myBooks={this.state.myBooks} onChangeShelf={(book) => this.changeShelf(book)} />
				)} />
			</div>
		)
	}
}

export default BooksApp
