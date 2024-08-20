---
title: "Using AI to write blog posts, then and now"
date: 2024-08-20 12:00:00
tags: ["ai", "large language models", "programming", "blogging"]
description: "Six years ago I spent a week training a neural network to write blog posts and the results were terrible. Now with LLMs I want to see how much easier and better the results are."
---

> Disclaimer, all of the blog posts written on this blog are entirely written by myself from my own knowledge and experiences. The original post stemmed from a desire to learn about various AI techniques and this post is purely meant as a follow-up to see how far the technology has come.

Six years ago I worked at G Adventures as a Director of Engineering. At the time, we were getting our [engineering blog off the ground](/posts/building-a-company-engineering-blog/) and I was spending a lot of time generating ideas and working with the engineers to write, edit and publish their content. It also just so happened to be a hack day. Without a specific project in mind, I went down the path of [teaching a neural network to write a blog](/posts/we-taught-a-neural-network-to-write-a-blog/).

Since then, advances in AI, and specifically, the popularization of Large Language Models (LLMs), have made this process significantly easier, more prevalent in society and even infiltrated our day-to-day lives. Since it's now been six years since the original post I wanted to sit down and try to recreate the process using new technologies.

## A look back at six years ago

The approach I took six years ago was to download all of the text from our engineering blog, train a couple of different models and then unleash those models to write a blog post. On a relatively high-powered laptop it was taking hours to train. I settled on two approaches, [recurrent neural networks](https://en.wikipedia.org/wiki/Recurrent_neural_network) and [markov chains](https://en.wikipedia.org/wiki/Markov_chain#:~:text=A%20Markov%20chain%20or%20Markov,the%20state%20of%20affairs%20now.%22).

A recurrent neural network processes data across multiple iterations. They basically build a hidden state/memory and update that for each iteration. Overall it created mostly readable text. Markov chains put a probability on the next word and builds a sentence by choosing the highest probability of the next word. Later I found they're great for generating fake, random text for testing but not so great for writing blog posts because they generate nonsensical sentences.

```python
from textgenrnn import textgenrnn
tech_blog_posts = [...] # Contains a list of blog posts
textgen = textgenrnn()
textgen.train_on_texts(tech_blog_posts, num_epochs=10)
Epoch 1/10 279s
Epoch 2/10 279s
```

```shell
textgen.generate_samples(3)
#################### Temperature: 0.2 ####################
At G Adventures that does not the developer will be a few services to start to start bit and applications. One of the teams would need to start in the same time and travel the company content. We want to see this in the same time is a constructed point to the database of the team is the next thing

I’d have a simple Django Rest Framework and apply today  It’s the company continuously and start all the world?

Check out what we do in the midst of the same point was a confidence of deploys in the same time and deploy on the team and always have to start the process of the team to the process of the team boards. We want to see this only a few weeks an
#################### Temperature: 0.5 ####################
It’s the Project Adventure Post Gateway is the world? Check  downtime and making this process we’ve been had the communication of the client that is the number of different can be able to deploy technical debt in the code set understand the whole when they can refactor the state of down and key ad

I’d have a single time and important in the sample React. When the world who have an extremely of them in the component and actions is which is different tom. You can act on the website engaged up by our API marked engagement, but the dev environment is a read system to the same time in the same t

I’d be freed up our restore today
#################### Temperature: 1.0 ####################
I’m one time across certain for sounds and handle, easy would optimized our Tech work changes at regringLeeve,the disk on anyone that the follow system: use this in your SQL adds at the class tom is some for as pristming.. Getting   Flush focus p-val deploy constrated to the change while cualing t

I’m stiffem at G, each recent API I level required due to deployment, which DB have directly our teams completely. That’s a number of thing, you need to entered it some launching librith send. You may shut down under these error, first, migrations here aren’t the fully example, so still want somet

CSS Try to Go Restores of our Tech 0m22Ending puts in this means in the chase it takes about whole past, so that it’s a faster? Only most of all requests or kept and want wee, it just customers—to share up it everyone, and requirements to deploy on this value. Now, citizing the time we are able.
```

The posts it generated were pretty terrible ([RNN example](/posts/technical-react-apps-a-project-in-a-rest-data/), [Markov Chain example](/posts/dealing-with-web-adventures-of-web-applications/)). It was interesting learning new technologies but overall the results could never be used (and shouldn't even if it had worked!). I never ended up exploring this further for both practical and ethical reasons.

## Using LLMs

Fast forward six years and LLMs have caused the robots to rise up and take over the world! In November of 2022, [ChatGPT 3.5 was released](https://openai.com/index/chatgpt/) and it became very popular overnight. You could talk to it using natural language and it'd understand the context and respond in a way that, to a lot of people, felt like magic.

Things like [Prompt Engineering](https://en.wikipedia.org/wiki/Prompt_engineering) and coding assistant tools were created. In 2023 Stackoverflow's developer survey first introduced a section on AI. 43.78% of developers mentioned they used some sort of AI tooling in their development process. That number jumped to 61.8% in 2024.

With this new technology I thought I'd see how easy it was to generate a technical blog post.

```shell
prompt: As an engineer who works for G Adventures write a technical blog post in the same style as other posts on https://tech.gadventures.com. The title should be Building Resilient APIs: Lessons Learned from a Real-World Migration and link to other existing relevant posts on tech.gadventures.com if possible. The post should include code snippets as well.
```

With that, I hit enter and let ChatGPT do its thing. In under a minute, it [generated this post](/posts/building-resilient-apis-lessons-learned-from-a-real-world-migration-machine-generated/). It reads like a post that would have been written by an engineer at G Adventures. It includes code snippets that are valid, runnable code and it did it all in less time than it took to make myself a coffee. Technology is cool and scary.

LLMs aren't perfect. In a lot of ways they’re working similarly to the recurrent neural network except they're able to process entire sequences in parallel. This allows them to process magnitudes more information. They're also not able to evaluate their work like a human can. Sometimes they'll try to mimic this behaviour by running the results recursively through itself to verify but even this evaluation process is limited.

## Ethical Dilemma

So, should LLMs be used to write blog posts? No.

The reason I read blog posts is to learn from the expertise of the writer. LLMs can certainly produce a lot of content fast but they're not based on that lived experience. LLMs also hallucinate and create entirely plausible but false examples. This can be dangerous, especially for people who copy and paste code.

For me, when I'm writing about [engineering management](/tags/engineering-management/), [development](/tags/development/) or the books I've read, this is from my learned experiences with real people. It may not be perfect advice for your situation but you know for sure it's worked (or hasn't worked) in real life.

So how can you use LLMs to help you with writing? LLMs are great at generating writing prompts. These prompts help get hone in on topics I have experience with and can write about.

```shell
Prompt: Give me 10 blog post ideas I could write about. I normally write about engineering management, helping senior developers get into management and programming tutorials in Javascript and Python.

Results:
Here are 10 blog post ideas that combine your interests:

"From Code to Leadership: Key Skills Every Senior Developer Needs for Management"
Explore the essential skills for senior developers transitioning into management, balancing technical expertise with leadership qualities.

"Balancing Code and People: How Engineering Managers Can Stay Technically Relevant"
Discuss strategies for engineering managers to maintain their coding skills while effectively leading a team.

"The First 90 Days: A Guide for New Engineering Managers"
Provide a roadmap for senior developers who have just transitioned into management, focusing on setting priorities and building relationships.

"Building a Tech-Savvy Team: How to Mentor Junior Developers Using Python and JavaScript"
Offer tips on how engineering managers can use Python and JavaScript to mentor junior developers and build a strong, cohesive team.

"Technical Leadership: When to Code and When to Delegate"
Write about the decision-making process behind when an engineering manager should get hands-on with coding versus delegating tasks.

"Scaling Your Engineering Team: Best Practices for Growing and Leading a Team of Developers"
Explore strategies for scaling an engineering team, including recruitment, onboarding, and fostering a positive culture.

"Python for Engineering Managers: Tools and Libraries to Streamline Your Workflow"
Provide a list of Python tools and libraries that can help engineering managers automate tasks, manage projects, and increase productivity.

"Bridging the Gap: Effective Communication Between Developers and Non-Technical Stakeholders"
Offer insights into how engineering managers can facilitate clear communication between their technical team and non-technical stakeholders.

"JavaScript for Engineering Managers: How to Use Front-End Skills to Lead by Example"
Discuss how engineering managers can leverage their JavaScript expertise to inspire and guide their teams in front-end development projects.

"Mentorship in Management: Helping Senior Developers Grow into Leadership Roles"
Focus on the role of mentorship in helping senior developers transition into management, including tips for both mentors and mentees.
```

Most of these are things I have experience with and could write a blog post on.

## Final Thoughts

Overall I'm extremely impressed with how technology has advanced over the years. LLMs have entered people's everyday lives and in a lot of ways helped. These tools need to be used responsibly and ethically and writing entire blog posts, in my opinion, is a great way to break your reader's trust.
