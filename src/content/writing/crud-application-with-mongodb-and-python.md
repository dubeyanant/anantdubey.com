---
title: "CRUD application with MongoDB and Python"
date: "2023-03-24"
summary: "In this article, we will explore how to build a CRUD (Create, Read, Update, Delete) application using MongoDB and Python. We will start by discussing what…"
tags: ["MongoDB","Python","crud"]
---

## **Introduction**

In this article, we will explore how to build a CRUD (Create, Read, Update, Delete) application using MongoDB and Python. We will start by discussing what a CRUD application is and why it is useful. Then, we will look at the technologies we will be using to build our application, namely MongoDB and Python. After that, we will dive into the step-by-step process of building our CRUD application.

## **Understanding CRUD Applications**

A CRUD application is a type of software application that allows users to perform four basic operations on a dataset: create, read, update, and delete. These four operations correspond to the acronym CRUD.

CRUD applications are useful because they allow users to easily manipulate and interact with data. They are commonly used in web applications, content management systems, and other data-driven software.

## **Technologies Used**

In this tutorial, we will be using two technologies to build our CRUD application: MongoDB and Python.

MongoDB is a popular NoSQL database that is well-suited for storing and managing large amounts of unstructured or semi-structured data. It is known for its ease of use and scalability.

Python is a popular programming language that is often used for web development, data analysis, and scientific computing. It is easy to learn and has a large and active community.

## **Setting Up the Environment**

Before we start building our CRUD application, we need to set up our environment. This involves installing and configuring MongoDB and Python.

### **Installing MongoDB**

To install MongoDB, follow these steps:

1.  Go to the [**MongoDB website**](https://www.mongodb.com/try/download/community) and download the appropriate version for your operating system.
    
2.  Follow the installation instructions provided by MongoDB.
    

### **Installing Python**

To install Python, follow these steps:

1.  Go to the [**Python website**](https://www.python.org/downloads/) and download the appropriate version for your operating system.
    
2.  Follow the installation instructions provided by Python.
    

## **Building the CRUD Application**

Now that our environment is set up, we can start building our CRUD application. We will be using Python and the PyMongo library to interact with MongoDB.

### **Creating a Connection to MongoDB**

To start, we need to create a connection to our MongoDB instance. We can do this using the following code:

```
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['mydatabase']
```

This code creates a connection to a MongoDB instance running on the local machine on port 27017. It also creates a database called "mydatabase".

### **Creating the Data Model**

Next, we need to define the data model for our application. In this example, we will be creating a simple data model for storing information about books.

```
book = {
    'title': 'The Great Gatsby',
    'author': 'F. Scott Fitzgerald',
    'published_date': '1925-04-10'
}
```

This code defines a dictionary that represents a book. It has three fields: title, author, and published\_date.

### **Inserting Data into MongoDB**

Now that we have defined our data model, we can insert some data into MongoDB. We can do this using the following code:

```
result = db.books.insert_one(book)
print(result.inserted_id)
```

This code inserts a single book into the "books" collection in our MongoDB database. It then prints the ID of the inserted document.

### **Retrieving Data from MongoDB**

Next, we can retrieve data from MongoDB using the following code:

```
result = db.books.find_one({'title': 'The Great Gatsby'})
print(result)
```

This code retrieves the first document from the "books" collection where the title field matches "The Great Gatsby". It then prints the result to the console.

### **Updating Data in MongoDB**

To update data in MongoDB, we can use the `update_one()` method. For example, to update the published date of a book, we can use the following code:

```
query = {'title': 'The Great Gatsby'}
new_values = {'$set': {'published_date': '1925-04-11'}}
result = db.books.update_one(query, new_values)
print(result.modified_count)
```

This code updates the published date of the book with the title "The Great Gatsby" to "1925-04-11". It then prints the number of documents that were modified (which should be 1 in this case).

### **Deleting Data from MongoDB**

To delete data from MongoDB, we can use the `delete_one()` method. For example, to delete a book from the "books" collection, we can use the following code:

```
result = db.books.delete_one({'title': 'The Great Gatsby'})
print(result.deleted_count)
```

This code deletes the first document from the "books" collection where the title field matches "The Great Gatsby". It then prints the number of documents that were deleted (which should be 1 in this case).

## **Conclusion**

In this article, we have explored how to build a CRUD application using MongoDB and Python. We started by discussing what a CRUD application is and why it is useful. Then, we looked at the technologies we would be using to build our application, namely MongoDB and Python. We then walked through the step-by-step process of building a CRUD application, including creating a connection to MongoDB, defining a data model, and inserting, retrieving, updating, and deleting data.

By following this tutorial, you should now have a good understanding of how to build a CRUD application using MongoDB and Python.

## Thank you

Did you reach the bottom? _Thank you for reading!_

👋 Hello again! Feel free to connect with me here: [Anant's socials](https://bio.link/aanant)