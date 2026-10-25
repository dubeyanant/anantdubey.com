---
title: "Taskaro: A Task Prioritization Android App"
date: "2023-05-29"
summary: "Efficiently Prioritize and Organize Your Tasks"
tags: ["Android","Firebase","Material Design","UI","Productivity"]
---

## Introduction

As a busy individual constantly juggling multiple responsibilities, I understand the struggle of staying on top of tasks and deadlines. That's why I'm thrilled to share my journey of building Taskaro with you. Hey there! My name is [Anant](https://bio.link/aanant), and in this article, we'll delve into how Taskaro came to be and explore its ins and outs.

Taskaro is built upon the principles of the Eisenhower matrix, with a simple yet powerful purpose — to help individuals like myself reclaim control over their busy lives. In today's fast-paced world, the demands and responsibilities can quickly become overwhelming. Whether you're a student with assignment deadlines, a professional managing numerous projects, or a homemaker handling household chores, Taskaro is designed to be your trusted companion, ensuring you never miss a beat. Taskaro empowers you to effortlessly organize, prioritize, and execute tasks, allowing you to navigate through your responsibilities with ease.

## Problem Statement

Have you ever found yourself overwhelmed by a lengthy list of tasks that require completion, each with varying levels of importance, urgency and different deadlines? It can be quite challenging to determine which task to prioritize, resulting in confusion and anxiety. Recognizing the significance of undertaking the right task at the right time cannot be emphasized enough.

This is precisely why this app came into existence and the vision behind it drove its development. In a nutshell, this app can be described as a tool that simplifies the complexities of everyday life.

Existing solutions in the market have their limitations. Traditional to-do lists or basic task management apps often lack a comprehensive approach to organizing tasks. Some existing apps may have a steep learning curve or an overwhelming interface, limiting their accessibility to a wide range of users.

## The Application

### Working

Taskaro organizes its home screen into four distinct sections: "Do it," "Schedule it," "Delegate it," and "Delete it." As the names imply, tasks placed within each section should be approached accordingly.

Distinguishing itself from typical to-do list applications, Taskaro incorporates a simple yet sophisticated algorithm that assesses task priorities and categorizes them accordingly. This backend functionality enables the application to determine which tasks require immediate attention and which ones can be postponed without compromising overall productivity.

The app relies on two inputs from users to prioritize tasks: Urgency and Importance. **When entering a task, users indicate whether it is urgent and/or important. Based on this information, Taskaro assigns a priority to the task accordingly.**

On the technical side, Taskaro is built using Java and developed in Android Studio by leveraging Firebase as its backend infrastructure.

### Features and Functionality

**Login/Signup**: Users can log in or sign up on the app, ensuring the security of their data on the online server, which they can retrieve whenever they wish.

**Task Prioritization**: One of Taskaro's key features is its task prioritization functionality. When a user enters multiple tasks into the app, Taskaro automatically categorizes them into four distinct groups based on different priorities. This is achieved through colour coding and prompt headings. By doing so, Taskaro encourages users to focus on tasks that are both urgent and important, while leaving tasks that are neither urgent nor important to be addressed later or possibly deleted.

**Note Taking**: Taskaro offers a simple and minimalist note-taking feature. Users can conveniently enter and store notes within the same application system as their tasks. The notes feature allows users to add, edit, and delete notes as needed, providing a practical way to keep important information alongside their tasks.

**User Profile**: Taskaro includes a user profile screen, where users can easily personalize their accounts. Users can set a profile photo and make changes to their names if they were initially entered incorrectly. The profile screen also provides the option to log out of the app. If desired, users can delete their profiles, resulting in the deletion of their data, tasks, and notes from the app.

### User Interface & Experience

The app starts with onboarding screens to familiarize the user with its purpose. Subsequently, users are prompted to either login or sign up using their email address.

![](/writing/taskaro-a-task-prioritization-android-app/01.jpg)

![](/writing/taskaro-a-task-prioritization-android-app/02.jpg)

Upon successful login, users can explore every section of the app through the bottom navigation bar. The bar comprises the home screen, notes screen, and user profile screen.

![](/writing/taskaro-a-task-prioritization-android-app/03.jpg)

The bottom navbar also includes a floating action button. Clicking it on the home screen creates a new task, while on the notes screen, it creates a new note.

![](/writing/taskaro-a-task-prioritization-android-app/04.jpg)

The home screen organizes tasks into different sections, each colour-coded for easier browsing and workflow.

![](/writing/taskaro-a-task-prioritization-android-app/05.jpg)

The notes and user profile screens consist of a minimalistic and soothing appearance.

![](/writing/taskaro-a-task-prioritization-android-app/06.jpg)

Taskaro incorporates [Material 3](https://m3.material.io/) design components, utilizes the [Inter](https://fonts.google.com/specimen/Inter?query=inter) font family, and maintains a side margin of 20dp throughout the app.

The app's front end is created using Figma, taking into consideration various [UI principles](https://tusharsrivastava.hashnode.dev/5-key-ui-design-principles-for-beginners) and [UX laws](https://blog.adarshdubey.com/ux-design-laws-every-developer-should-know) to enhance user navigation. [Click here](https://www.figma.com/file/aYi39I9W6tRWavWJU2Gydo/Screens?type=design&t=rFQyq3jIy6djkbko-1) 👈 to view app screens on Figma.

Any feedback on the app would be greatly appreciated! 🙏

### How to Use the App

1.  Taskaro is only available for Android devices and can be downloaded either from [GitHub](https://github.com/dubeyanant/Taskaro/releases/tag/v0.1.0-alpha) or by [clicking here](https://github.com/dubeyanant/Taskaro/releases/download/v0.1.0-alpha/Taskaro.apk)👈 for a direct download.
    
2.  To begin using the app, simply sign up.
    
3.  Once signed in, you will be directed to the home screen, where you can create a task by clicking on the plus button.
    
4.  Explore the app through the bottom navigation bar. 🚀
    

### Benefits

By utilizing this app and adhering to the task order provided, you can tackle the tasks that have a significant impact on your overall productivity and life. As the saying goes, "Eat the biggest frog first 🐸", prioritize the larger tasks that require the most effort at the start of your day. Taskaro is designed to assist you in accomplishing precisely that.

If you follow the recommended task sequence within different sections, your day will become more productive and efficient. Tasks marked for deletion can be completed towards the end of the list, or they can be eliminated 🚮, as they will have minimal to no impact on your productivity.

### Resources

Here are some resources that I utilized:

*   [Material Design](https://m3.material.io/theme-builder#/custom)
    
*   [DrawKit](https://www.drawkit.com/)
    
*   [Freepik](https://www.freepik.com/)
    
*   [icons8](https://icons8.com/)
    

### Future Updates

Roadmap for the upcoming features and improvement:

1.  **Notifications**: Implement a notification system to alert users about their pending tasks.
    
2.  **Edit task**: Allow users to make edits to their tasks even after saving them.
    
3.  **Google login**: Enable users to conveniently sign up and log in using their Google accounts.
    
4.  **Offline data storage**: Implement offline data storage capability, allowing users to access and sync their data when an internet connection is unavailable.
    
5.  **Data encryption**: Enhance security by encrypting user data stored in the online cloud storage.
    
6.  **Enhanced UI/UX**: Improve the app's user interface and experience to ensure easy navigation and a seamless user journey.
    
7.  **Analytics screen**: Provide users with an analytics screen where they can gain insights into their task patterns, time allocation, and other relevant metrics.
    

My ultimate vision for the app is to transform it into _one of the most accessible open-source task prioritization tools, widely used by students, professionals, and individuals from diverse backgrounds_.

**I highly value your feedback** and encourage you to share your thoughts in the comments section or on the [GitHub page](https://github.com/dubeyanant/Taskaro). Your feedback will help improve the app further.

Also, **I greatly appreciate any contributions** made to enhance the usability of the app. You can contribute in various ways:

*   **Open issues**: Identify and report any bugs, suggest improvements, or request changes by creating new issues on GitHub.
    
*   **README pages**: Contribute by creating informative README pages on topics such as contributions, licenses, or any other relevant areas. You can also enhance existing README pages to provide better documentation.
    
*   **Bug fixes and UI enhancements**: Help improve the app by fixing bugs, enhancing the user interface, or integrating suggested changes.
    
*   **Translation**: Contribute by translating the app into different languages, making it more accessible to users worldwide.
    
*   **Feature integration**: Implement any of the above-mentioned features in the app.
    
*   **GitHub page maintenance**: You can also assist in maintaining the GitHub page, keeping it up to date with the latest information and improvements.
    

Any other contributions you may have in mind are welcome. Your support and contributions are highly valued and will contribute to making the app even better.

## My Journey

### Problems I Faced

1.  **Overwhelmed with Complexities and Lack of Knowledge**: Having a background solely in development and lacking knowledge in designing and managing an extensive app, I was uncertain where to start. To overcome this, I adopted a systematic approach, breaking down the process into manageable tasks and focusing on one component at a time. I actively sought resources such as online tutorials, developer forums, and documentation. I also reached out to experienced professionals on platforms like Twitter and Discord.
    
2.  **Integrating Features**: My goal was to provide a modern and intuitive user interface by implementing the latest design principles, such as Material Design 3. However, integrating these design elements and ensuring a seamless user experience presented their own set of challenges. Additionally, incorporating functionalities like a runnable class for recurring tasks or background services for notifications required careful implementation and thorough testing. Through experimentation, iteration, and testing, I successfully integrated some of these features, while others are still pending.
    
3.  **Managing My Team**: While developing Taskaro, I also encountered the challenge of managing a small team of developers. Coordinating efforts, assigning tasks, and ensuring effective communication were vital to maintaining productivity and achieving project milestones. Regular team meetings, progress tracking, and open channels of communication helped with this.
    
4.  **Managing Deadlines**: Balancing multiple responsibilities and ensuring the timely completion of tasks posed a significant challenge. To manage deadlines effectively, I employed project management techniques, such as creating a detailed timeline, breaking down tasks into smaller subtasks with their respective deadlines, and regularly monitoring progress. Tools like Todoist and Slack helped me achieve this.
    
5.  **GitHub Workflow**: Developing Taskaro involved implementing an efficient GitHub workflow with a team and effectively managing the source code, both of which were crucial. Initially, I encountered difficulties in establishing a clear workflow. But I started learning and adopting best practices, seeking guidance from experienced individuals. This enabled me to effectively manage the expanding codebase. I also implemented coding standards and started with regular code reviews to ensure code quality and consistency.
    

### My Learnings

1.  **Searching for Solutions**: One of the most valuable lessons I learned during my development journey was how to effectively find solutions. I faced numerous challenges that demanded my ability to seek answers. Here are some approaches that proved helpful:
    
    1.  **_Online Resources_**: I found great value in seeking developer forums, coding communities, and technical documentation to find solutions. Websites such as Stack Overflow, GitHub, and official documentation were very useful.
        
    2.  **_Online Tutorials_**: I greatly benefited from online tutorials and different YouTube videos when dealing with complex issues and bugs.
        
2.  **Debugging Techniques**: When faced with errors or unexpected behaviour during the app development process, I employed the following methods to identify and resolve issues:
    
    1.  **_Logging_**: To track the execution flow and pinpoint potential problems, I strategically inserted log statements at crucial points in the code. By analyzing the logs, I was able to narrow down the source of the problem.
        
    2.  **_Divide and Conquer_**: When dealing with complex issues, I broke down the problem into smaller, manageable parts and isolated the specific issue. This method helped me narrow down and focus on the problem at hand.
        
3.  **Collaboration and Communication**: This played a vital role in the development of Taskaro. I scheduled regular meetings with the development team to discuss progress, challenges, and next steps. These meetings provided a platform for exchanging ideas, clarifying requirements, and aligning our efforts.
    
4.  **UI/UX development**: Creating an intuitive and visually appealing user interface (UI) was my key focus. Here are some practices I followed for UI/UX development:
    
    1.  **_User Research_**: I conducted user research to understand the preferences, colour theory, and pain points of the audience. This research informed the design decisions, ensuring the UI met user expectations.
        
    2.  **_Consistency and Simplicity_**: I aimed for a consistent and simple UI design throughout Taskaro. By using a cohesive colour palette, typography, and layout, I created a visually harmonious experience.
        
5.  **How to Seek Help**: You'll not get help if you don't ask for it, and there is no shame in doing so. I learned the following best practices when seeking assistance:
    
    1.  **_Research First_**: Before asking for help, I made sure to conduct thorough research on the issue. By showing that I had already attempted to find a solution, I increased the likelihood of receiving help and avoided duplicating efforts.
        
    2.  **_Be Specific and Clear_**: When asking for help, I provided detailed information about the problem, including error messages, relevant code snippets, and steps to reproduce the issue. Clear communication helped others understand the problem and provide targeted assistance.
        
    3.  **_Show Respect_**: When seeking help on online forums or communities, I followed the guidelines and rules of the community. I maintained a respectful attitude, displayed patience, and expressed gratitude for any support I received.
        

### My Future Goals

One of the goals is to keep enhancing this app and making it even more useful.

Here are some other future goals:

*   Develop additional Android apps incorporating various technologies.
    
*   Learn JavaScript and create web apps.
    
*   Expand understanding of team management and explore related areas.
    
*   Produce more technical blog posts.
    

## Conclusion

In conclusion, Taskaro is the result of my journey to address the challenges of managing tasks and deadlines in today's fast-paced world. It is a tool designed to simplify the complexities of everyday life, helping users prioritize tasks and maximize their productivity.

Through the development process, I faced various challenges, however, I learned valuable lessons along the way, including the importance of seeking solutions, effective collaboration and communication.

I greatly value your feedback and contributions to enhance the app further.

### **Thank you**

Did you reach the bottom? **_Thank you for reading!_**

Feel free to [connect with me](https://bio.link/aanant). 👋