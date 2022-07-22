package com.serverlesscorner.onlinelibrary;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Collection;

public class LoggingInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(LoggingInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse response, Object handler)
            throws Exception {
        logger.info("adr:{}; req:\"{} {} {}\";", req.getRemoteAddr(), req.getMethod(), req.getRequestURL(), req.getProtocol());

        return true;
    }

    @Override
    public void postHandle(	HttpServletRequest request, HttpServletResponse response,
                               Object handler, ModelAndView modelAndView) throws Exception {
        Collection<String> responseHeaders =  response.getHeaderNames();
        for(String name: responseHeaders){
            logger.info("header:" + name + ":" + response.getHeader(name));
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) throws Exception {
        logger.info("Request completed with Status({})", response.getStatus());
    }
}
