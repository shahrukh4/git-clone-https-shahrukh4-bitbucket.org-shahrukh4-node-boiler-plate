var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

Genre = require('./models/genres');
Book  = require('./models/book');

//connect to mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', function(req, res) {
	res.send('Please use /api prefixs');
});

app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if(err){
			throw err;
		}

		res.json(genres);
	});
});

//add a genre
app.post('/api/genres', function(req, res){
	var genre = req.body;

	Genre.addGenre(genre, function(err, genre){
		if(err){
			throw err;
		}

		res.json(genre);
	});
});

//update a genre
app.put('/api/genres/:_id', function(req, res){
	var id = req.params._id;
	var genre = req.body;

	Genre.updateGenre(id, genre, {}, function(err, genre){
		if(err){
			throw err;
		}

		res.json(genre);
	});
});	

//delete a genre
app.delete('/api/genres/:_id', function(req, res){
	var id = req.params._id;

	Genre.deleteGenre(id, function(err, genre){
		if(err){
			throw err;
		}

		res.json(genre);
	});
});

//get all books
app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}

		res.json(books);
	});
});

//get a single book
app.get('/api/books/:_id', function(req, res){
	Book.getBookById(req.params._id, function(err, book){
		if(err){
			throw err;
		}

		res.json(book);
	});
});

//add a book
app.post('/api/books', function(req, res){
	book = req.body;

	Book.addBook(book, function(err, book){
		if(err){
			throw err;
		}

		res.json(book);
	});
});

//update a single book
app.put('/api/books/:_id', function(req, res){
	var id 	 = req.params._id;
	var book = req.body;

	Book.updateBook(id, book, {}, function(err, book){
		if(err){
			throw err;
		}

		res.json(book);
	});
});

//delete a book
app.delete('/api/books/:_id', function(req, res){
	var id = req.params._id;

	Book.deleteBook(id, function(err, book){
		if(err){
			throw err;
		}

		res.json(book);
	});
});

app.listen(3000);
console.log('Running on port 3000');