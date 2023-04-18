# Real-Time Chat Application for Drive School
This document outlines the design and implementation of a real-time chat application built with React Native, Expo, Node.js, Socket.IO, Sequelize, and MySQL. The application is designed for a driving school to facilitate communication between driving instructors and students. The application allows students to send messages to their assigned instructor and receive real-time responses. Instructors can also communicate with their students using the application. Additionally, the application sends push notifications to the students when they receive a new message.
## Architecture
The application is built using the following technologies:

- React Native and Expo for the mobile application frontend
- Node.js and Express for the server-side backend
- Socket.IO for real-time communication between the client and server
- Sequelize as the ORM for MySQL database

The client-side application is built using React Native and Expo, which allows for easy deployment to both iOS and Android devices.

## Database Design
The application uses MySQL as the database management system and Sequelize as the ORM.The database schema consists of four tables: ChatRoom, Candidat, Message, and Moniteur.

The ChatRoom table has the following columns:

- roomId: a string of up to 250 characters that serves as the primary key
- lastMessages: a string of up to 1000 characters that contains the last messages sent in the chat room
- candidatId: a string of up to 250 characters that references the primary key of the Candidat table
- moniteurId: a string of up to 250 characters that references the primary key of the Moniteur table

The Candidat table has the following columns:

- candidatId: a string of up to 250 characters that serves as the primary key
- name: a string of up to 150 characters that represents the candidate's name
- login: a string of up to 250 characters that represents the candidate's login
- password: a string of up to 250 characters that represents the candidate's password
- cin: a string of 8 characters that represents the candidate's identification number
- solde: a double that represents the candidate's account balance
- nbSession: an integer that represents the number of sessions the candidate has signed up for
- nbsessionEffected: an integer that represents the number of sessions the candidate has attended
- amountPaid: a double that represents the amount of money the candidate has paid
- amountRequired: a double that represents the amount of money the candidate is required to pay
- phone: a string of 8 characters that represents the candidate's phone number
- accountStatus: a boolean that indicates whether the candidate's account is active or not
- accountType: a string of up to 150 characters that represents the type of account the candidate has
- pic: a string of up to 300 characters that represents the candidate's profile picture
- moniteurId: a string of up to 250 characters that references the primary key of the Moniteur table

The Message table has the following columns:

- messageId: a string of up to 250 characters that serves as the primary key
- messages: a string of up to 1000 characters that contains the message text
- sender: a string of up to 250 characters that represents the sender of the message
- receiver: a string of up to 250 characters that represents the receiver of the message
- isView: a boolean that indicates whether the message has been viewed or not
- chatRoomId: a string of up to 250 characters that references the primary key of the ChatRoom table

The Moniteur table has the following columns:

- MoniteurId: a string of up to 250 characters that serves as the primary key
- name: a string of up to 150 characters that represents the monitor's name
- login: a string of up to 250 characters that represents the monitor's login
- password: a string of up to 250 characters that represents the monitor's password
- phone: a string of up to 50 characters that represents the monitor's phone number
- cin: a string of 8 characters that represents the monitor's identification number
- accountStatus: a boolean that indicates whether the monitor's account is active or not
- pic: a string of up to 300 characters that represents the monitor's profile picture
- salaire: a double that represents the monitor's salary
- accountType: a string of up to 150 characters that represents the type of account the monitor has
- createdAt: a date that indicates when the record was created
- updatedAt: a date that indicates when the record was last updated

### Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the GitHub repository. If you would like to contribute code, please fork the repository and submit a pull request.

## secreen shot 

### condidat chat 
<img src="https://github.com/thamerh/Mobile_Chat_App/blob/360e047db512ff206d22f334ab4779398eff4d4c/secreenshot/condidat.jpg" width="200" height="500">

### moniteur chat
<img src="https://github.com/thamerh/Mobile_Chat_App/blob/360e047db512ff206d22f334ab4779398eff4d4c/secreenshot/moniteur.jpg" width="200" height="500">

### discussion
<img src="https://github.com/thamerh/Mobile_Chat_App/blob/360e047db512ff206d22f334ab4779398eff4d4c/secreenshot/conversation.jpg" width="200" height="500">

<img src="https://github.com/thamerh/Mobile_Chat_App/blob/360e047db512ff206d22f334ab4779398eff4d4c/secreenshot/conversation1.jpg" width="200" height="500">


## Conclusion
This real-time chat application provides a simple and efficient way for driving instructors and students to communicate in real-time. The application uses a modern tech stack consisting of React Native, Expo, Node.js, Socket.IO, Sequelize, and MySQL, making it easy to develop and deploy on both iOS and Android devices.

By leveraging the power of Socket.IO, the application provides real-time communication between the client and server, allowing students and instructors to communicate efficiently. Additionally, push notifications provide a way for users to receive updates even when they are not actively using the application.

Overall, this real-time chat application is an excellent example of how modern technologies can be used to develop efficient communication tools .

## Made By

- [@thamerh](https://github.com/thamerh)