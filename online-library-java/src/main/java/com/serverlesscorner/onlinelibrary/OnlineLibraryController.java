package com.serverlesscorner.onlinelibrary;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.util.List;


@RestController
@EnableWebMvc
@RequestMapping(value = "/books")
@Import(OnlineLibraryService.class)
public class OnlineLibraryController {

    private final OnlineLibraryService service;

    private static final Logger LOG = LoggerFactory.getLogger(OnlineLibraryController.class);

    public OnlineLibraryController(OnlineLibraryService service) {
        this.service = service;
    }

    @GetMapping(value = "/{isbn}", produces = "application/json")
    public ResponseEntity<Book> getBookByIsbn(@PathVariable("isbn") Integer isbn){
        Book book = service.getBookByIsbn(isbn);

        if(book != null){
            return new ResponseEntity<>(book, HttpStatus.OK);
        } else {
            LOG.info(" book not found");
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/author/{lastName}/{firstName}")
    public ResponseEntity<List<Book>> getBooksByAuthor(@PathVariable("lastName") String lastName, @PathVariable("firstName") String firstName) {
        List<Book> booksFromAuthor = service.getBooksFromAuthor(new Author(firstName, lastName));

        return new ResponseEntity<>(booksFromAuthor, HttpStatus.OK);
    }
}
