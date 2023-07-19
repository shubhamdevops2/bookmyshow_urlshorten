mongodb+srv://shubham:U2h1YmhhbUAxMjMK@bookmyshow.vr5ga60.mongodb.net/?retryWrites=true&w=majority
docker run --rm --name mongo -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=VRuAd2Nvmp4ELHh5 -e MONGO_INITDB_DATABASE=test -v /tmp/mongo-data:/data/db mongo:latest



      - backend:
          service:
            name: game-service
            port:
              number: 8082
        path: /score/?(.*)



version: '3'
networks:
  net:
services:
  jenkins:
    container_name: jenkins
    image: jenkins/jenkins:latest
    volumes:
      - $PWD/jenkins_home/:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - 8080:8080
    networks:
      - net

  sonarqube:
    container_name: sonarqube
    image: sonarqube:latest
    volumes:
      - $PWD/sonarqube/data:/opt/sonarqube/data
      - $PWD/sonarqube/logs:/opt/sonarqube/logs
      - $PWD/sonarqube/ext:/opt/sonarqube/extensions
    ports:
      - 9000:9000
    networks:
      - net

  httpd:
    container_name: httpd
    image: test:3
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - net



apiVersion: v1
kind: Service
metadata:
  name: "handler-service-nodeport"
spec:
  selector:
    app: handler-deploy
  ports:
  - name: mongodb
    port: 27017
    targetPort: 27017
    nodePort: 32258
  - name: handler
    port: 3001
    targetPort: 3001
    nodePort: 32251
  type: NodePort



apiVersion: v1
kind: Service
metadata:
  name: "handler-service-nodeport"
spec:
  selector:
    app: handler-deploy
  ports:
  - name: handler
    port: 3001
    targetPort: 3001
    nodePort: 32255
  - name: mongo
    port: 27017
    targetPort: 27017
  type: NodePort

---

apiVersion: v1
kind: Service
metadata:
  name: "handler-svc"
spec:
  selector:
    app: handler-deploy
  ports:
  - name: handler
    port: 3001
    targetPort: 3001
  - name: mongo
    port: 27017
    targetPort: 27017