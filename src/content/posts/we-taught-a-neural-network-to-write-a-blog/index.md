---
title: "We Taught a Neural Network to Write a Blog"
date: 2018-08-21
tags: [development]
---

![](./robot.jpeg)

At G Adventures, we write a lot of content for our various blogs. Our main [company blog](https://www.gadventures.com/blog/) has over 8 million words and our [technical blog](https://tech.gadventures.com/) is currently sitting at 114,000 words (though I just added another 2500 words through this post and the two generated posts!). Creating this content takes a lot of time and effort from over 40 writers.

Recently, the Technology team had a Hack Day and I decided to learn more about Machine Learning (ML) and  [TensorFlow](https://www.tensorflow.org/) . Initially, I didn’t have a specific project in mind but as I started my research I thought it’d be funny to use ML to create blog posts. Here’s how I did it.

**tl;dr** I used [Google’s Colaboratory](https://colab.research.go/), [Max Woolf’s textgenrnn](https://github.com/minimaxir/textgenrnn), and [Jeremy Singer-Vine’s markovify](https://github.com/jsvine/markovify) to create a couple of funny blog posts by training it against our existing posts.

## Recurrent Neural Network
In my first attempt to generate blog posts, I found an amazing Python library called [textgenrnn](https://github.com/minimaxir/textgenrnn) by [Max Woolf](https://twitter.com/minimaxir). This library sits on top of TensorFlow and makes it incredibly easy to start training a [Recurrent Neural Network](https://en.wikipedia.org/wiki/Recurrent_neural_network) (RNN) with a few lines of Python. This article would be way too long if I covered what an RNN is and how it works, so if you’d like more information check out this [great article](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) by Andrej Karpathy.

Getting started is as simple as installing a few libraries through pip.

```
pip install tensorflow textgenrnn
```

Once I had TensorFlow and textgenrnn installed I pulled down all of the blog posts from [tech.gadventures.com](https://tech.gadventures.com/) and loaded them into a list in Python. I still haven’t found a good way to do this so unfortunately, I had to do it by hand.

From there I started training the neural network. I’m on a mid-2015 MacBook Pro with a 3.1 GHz Intel Core i7 and it took over 45 minutes to run through the entire dataset. When I tried to train the network on G Adventures’ main blog posts it was taking 9 hours per iteration!

```
from textgenrnn import textgenrnn
tech_blog_posts = [...] # Contains a list of blog posts
textgen = textgenrnn()
textgen.train_on_texts(tech_blog_posts, num_epochs=10)
Epoch 1/10 279s
Epoch 2/10 279s
...
```

With the training done I was able to generate a number of samples to see the results after training the neural network. The Temperature allows us to play with the creativity of the results. The closer it is to zero, the more confident the RNN is and the closer it’ll be to the original text. Temperature values closer to one (or above) become much wilder and error-prone.

```
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

At this point, I was fairly happy with the results I was seeing. I wrote a quick script that generated a blog post title and 7 paragraphs of text and moved on.

```
textgen_titles.generate(1)
textgen_posts.generate_samples(7)
```

 [Here’s what that generated!](/posts/technical-react-apps-a-project-in-a-rest-data/) 

## Colaboratory
As I was waiting for the initial RNN training to be completed I researched how others managed to train their networks on _relatively_ small datasets. 9 hours per iteration (90 hours total) seemed like a really long time and I thought there had to be a better way.

[Google’s Colaboratory](https://colab.research.google.com/) was exactly what I was looking for. It’s a hosted Juypter notebook that allows you to code in either Python 2 or Python 3. Best of all it supports GPU hardware acceleration that greatly speeds up training.

```
Training on 113,685 character sequences. 
Epoch 1/10 40s
Epoch 2/10 39s
...
```

Here you can see that training the RNN on our blog dataset is sped up almost 7 times. When I tested it out with G Adventures primary blog dataset it was sped up from 9 hours per iteration to 1!

There are a few extra steps you need when working with Colaboratory. First, to install your requirements you need to preface commands with an exclamation mark.

```
!pip install tensorflow textgenrnn
```

Next, if you’re loading any information in from a file you’ll need to upload via Python. This will allow you to open it normally in Python using the filename of the file you uploaded.

```
import csv
from google.colab import files
uploaded = files.upload() # I uploaded a file named posts.csv
titles = []
lead_ins = []
blog_posts = []
with open('posts.csv', 'rU', encoding='utf-16') as csvfile:
    reader = csv.reader(csvfile, delimiter='\t')
    for row in reader:
        titles.append(row[2])
        lead_ins.append(row[34])
        blog_posts.append(row[50])
```

That’s it, everything else works like you’d expect. You can have multiple code blocks, results from previous blocks are available throughout. This means you can train your RNN once and then work on it as much as you want below. You can even document your code or write a full blog post right in Colaboratory.

## Markov Chain
I wasn’t totally happy with the results generated from the Recurrent Neural Network so I wanted to try another model I’ve used in the past. Markov Chain’s basically pair up all of the words in your text corpus (blog posts in this case) and determine the next word in a sentence based off the probability of pairs found in the past. There’s a [great article on Hacker Noon](https://hackernoon.com/automated-text-generator-using-markov-chain-de999a41e047) that describes how it works in much more detail.

[Markovify](https://github.com/jsvine/markovify) is a fantastic tool by another employee at Buzzfeed that makes generating text using a Markov Chain extremely simple.

All you have to do is load your posts into Markovify and generate sentences.

```
import markovify
blog_post_model = markovify.Text(blog_posts)

blog_post_model.make_sentence()

# If you'd like to make a tweet you can do that too!
blog_post_model.make_short_sentence(140))
```
One of the nice things about Markovify is that you can export the model to json to make it significantly faster to re-load later on.

```
import markovify
model_json = blog_post_model.to_json()

# In theory, here you'd save the JSON to disk, and then read it back later.
reconstituted_model = markovify.Text.from_json(model_json)
```

One of the main problems with a Markov Chain is that if your dataset isn’t large enough it won’t be able to produce any results. By default, the `make_sentence` method tries a maximum of 10 times per invocation, to make a sentence that doesn't overlap too much with the original text. If it is successful, the method returns the sentence as a string. If not, it returns `None`. This was a problem when I was trying to generate a new blog title since our training set was very limited.

In the end, I had to use the RNN to build out the title and a Markov Chain for the blog post.


Overall I’m really happy with how my Hack Day turned out. I learnt a lot and found a new tool with Google Colaboratory. The generated blog posts won’t win any Pulitzers – they don’t even pass for English – but I found it funny and the company got a kick out of it. Stay tuned for more Hack Day posts!

