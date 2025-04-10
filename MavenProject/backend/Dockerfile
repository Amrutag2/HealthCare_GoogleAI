FROM eclipse-temurin:21-jdk-alpine

VOLUME /tmp
COPY target/healthcare-backend.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
