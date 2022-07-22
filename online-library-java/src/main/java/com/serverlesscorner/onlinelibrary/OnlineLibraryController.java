package com.serverlesscorner.onlinelibrary;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@RestController
@EnableWebMvc
@Import(OnlineLibraryService.class)
public class OnlineLibraryController {

    private final OnlineLibraryService service;

    private static final Logger LOG = LoggerFactory.getLogger(OnlineLibraryController.class);

    public OnlineLibraryController(OnlineLibraryService service) {
        this.service = service;
    }

    public Object getBookByIsbn(Integer isbn){
        service.getBookByIsbn(isbn);
    }
}
