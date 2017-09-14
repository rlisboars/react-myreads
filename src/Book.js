import React, { Component } from 'react'

class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shelf: props.data.shelf
        }
    }
    onChange(newShelf) {
        this.setState({
            shelf: newShelf
        })
    }
    render() {
        const { data } = this.props
        const coverImage = data.imageLinks ? data.imageLinks.thumbnail : ''
        if (data) return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${coverImage})` }}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={this.state.shelf ? this.state.shelf : "none"} onChange={(e) => this.onChange(e.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{data.title}</div>
                <div className="book-authors">{data.authors && data.authors.join(' / ')}</div>
            </div>
        )
        else return null
    }
}

export default Book