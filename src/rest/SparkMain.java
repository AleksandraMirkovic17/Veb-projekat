package rest;

import java.io.File;
import java.io.IOException;
import static spark.Spark.*;





public class SparkMain {

	public static void main(String[] args) throws IOException {
		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		after((req,res) -> res.type("application/json"));
		
		

	}

}
