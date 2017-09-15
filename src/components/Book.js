import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Component that renders a book thumbnail with a few information for fast identification.
 */

class Book extends Component {
    static propTypes = {
        /** Book data */
        data: PropTypes.object.isRequired,
        /** Callback function from the parent used to redefine a book shelf */
        onChangeShelf: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            shelf: props.data.shelf
        }
    }

    /**
     * Connects the select field with the shelf state and send the changes to parent.
     * @public
     * @param {string} newShelf New shelf code: "wantToRead", "currentlyReading" or "read"
     */
    onChange(newShelf) {
        this.setState({
            shelf: newShelf
        })
        const updatedBook = Object.assign(this.props.data, { shelf: newShelf })
        this.props.onChangeShelf(updatedBook)
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