```js noeditor
require('../styles/App.css');
require('../index.css');
<BooksShelf 
    title="Currently Reading"
    books={[
        {"id": "1",
        "title": "The Linux Command Line", 
        "shelf": "currentlyReading",
        "authors": ["William E. Shotts, Jr."],
        "imageLinks": {
            "thumbnail": "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        }},
        {"id": "2",
        "title": "Learning Web Development with React and Bootstrap", 
        "shelf": "currentlyReading",
        "authors": ["William E. Shotts, Jr.",
                    "Mehul Bhatt"],
        "imageLinks": {
            "thumbnail": "http://books.google.com/books/content?id=sJf1vQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
        }}]}
     onChangeShelf={function() {}} />
```

