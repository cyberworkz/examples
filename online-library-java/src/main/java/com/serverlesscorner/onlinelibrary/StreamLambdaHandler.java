package com.serverlesscorner.onlinelibrary;

import com.amazonaws.serverless.exceptions.ContainerInitializationException;
import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.spring.SpringLambdaContainerHandler;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * @author haiko
 *
 */
public class StreamLambdaHandler implements RequestStreamHandler {

	private static final Logger LOG = LoggerFactory.getLogger(StreamLambdaHandler.class);

	private static SpringLambdaContainerHandler<AwsProxyRequest, AwsProxyResponse> handler;

	static {
		try {
			LOG.info("start lambda container init");

			handler = SpringLambdaContainerHandler.getAwsProxyHandler(ApplicationConfig.class);

			LOG.info("endlambda container init");
		} catch (ContainerInitializationException e) {
			// if we fail here. We re-throw the exception to force another cold start
			e.printStackTrace();
			throw new RuntimeException("Could not initialize Spring framework", e);
		}
	}

	@Override
	public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context)
			throws IOException {
		handler.proxyStream(inputStream, outputStream, context);
	}
}