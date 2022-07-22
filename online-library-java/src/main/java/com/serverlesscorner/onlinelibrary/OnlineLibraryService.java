package com.serverlesscorner.onlinelibrary;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OnlineLibraryService {

    private static final Logger LOG = LoggerFactory.getLogger(OnlineLibraryService.class);

    private static Map<Integer, Book> booksByIsbnMap = new HashMap<>();

    private static Map<Author, List<Book>> booksByAuthor = new HashMap();

    static {

        Author tolkien = new Author("JRR", "Tolkien");
        Author rowling = new Author("JK", "Rowling");

        Book hobbit = new Book(1234, "The Hobbit", tolkien);
        Book twoTowers = new Book(1224, "Two Towers", tolkien);
        Book philosophersStone = new Book(4556, "Harry Potter and the Philosopher's Stone", rowling);
        Book deathlyHallows = new Book(4875, "Harry Potter and the Deathly Hallows", rowling);

        // fill maps
        booksByIsbnMap.put(hobbit.getIsbn(), hobbit);
        booksByIsbnMap.put(twoTowers.getIsbn(), twoTowers);
        booksByIsbnMap.put(philosophersStone.getIsbn(), philosophersStone);
        booksByIsbnMap.put(deathlyHallows.getIsbn(), deathlyHallows);

        booksByAuthor.put(tolkien, List.of(hobbit, twoTowers));
        booksByAuthor.put(rowling, List.of(philosophersStone, deathlyHallows));

    }

    public Book getBookByIsbn(Integer isbn) {
        return booksByIsbnMap.get(isbn);
    }

    public List<Book> getBooksFromAuthor(Author author) {
        LOG.debug(author.toString());
        return booksByAuthor.get(author) != null ? booksByAuthor.get(author): new ArrayList<>();
    }
}
