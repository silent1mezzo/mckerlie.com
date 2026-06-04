---
title: "Building CalledUp: Using AI to Ship a Real Product Without Losing the Plot"
date: 2026-06-04
tags: [development, ai, side projects]
description: "How I built CalledUp, a baseball and softball team management app, using AI in a sustainable way, starting features on my phone at the ball diamond and finishing them at home. A practical look for engineers who want to build real things."
---

I spent two hours on a lineup once. Then I had to throw it out an hour before the game.

I coach my kid's baseball team, and if you've done it you know the job is like 20% baseball and 80% logistics. The lineup is the part I dreaded most. You sit down with the roster and try to build a batting order, then a fielding rotation that's fair across six innings, while keeping track of which kids can actually catch and who can't be stuck in the outfield two innings in a row. It takes forever, and when you finally get it to balance you feel like you've solved a little puzzle.

Then your phone buzzes. "So sorry, Jacob can't make it tonight."

And it all falls apart. There's a hole in the batting order. The kid you had at second has to slide over to short, so someone else moves, and the fair-innings math you spent two hours on is suddenly nonsense. So you redo the whole thing in the parking lot, on your phone, while the kids are warming up and a parent is asking you what time the game ends.

I did that enough times to get properly annoyed, and being annoyed is how most of my side projects start. This one turned into [CalledUp](https://calledup.app). Rosters, schedules, lineups, and parent messaging in one place so coaches can stop chasing RSVPs and actually coach. But I don't really want to sell you on the app here. I want to talk about how I built it, because I think the _how_ is the useful part if you're an engineer trying to figure out how to use AI to ship something real instead of another weekend demo.

## I wasn't trying to "vibe code" an app

You've seen the pitch. Describe an app to an AI, it spits out the code, and now you supposedly have a business. I've poked at projects built that way and they tend to fall over the second a real person does something the demo didn't anticipate. Nobody can maintain the code, including the person who "wrote" it.

I've been writing software for almost three decades now and managing engineers for a decent chunk of it, so I came in with a rule. I have to be able to maintain this for years. I knew coaches and parents are putting their kids' schedules into it. They're spending time out of their day to help a coach actually coach so I wanted to make sure CalledUp solved a real problem and didn't fall down immediately.

That rule is the whole reason the AI part stayed sustainable instead of turning into a dopamine hit I'd regret. Here's what it actually looked like day to day.

## Thinking on my phone, building at home

The habit that made the biggest difference was splitting the thinking from the building.

A lot of features started as a conversation on my phone, usually while I was standing at the diamond watching practice. A parent would mention they could never figure out the start time, or I'd catch myself fumbling the lineup again, and I'd just open the Claude app right there and start talking it through. Not "write me this," more like "here's the problem, here's how a coach would actually use it, what am I not thinking about?"

By the time I got home I'd have a plan that I coul start building with. That's when I'd open Claude and Codex and actually build the thing, with the shape of it already worked out in my head.

I didn't plan it this way, it just happened, but the split turned out important. Standing in the ball diamnond is when the problem is freshest, right after I've watched a real person hit the exact thing that's annoying. The desk is for the engineering. When I tried to do both at once, design and code in the same sitting, I'd usually end up with a feature that worked fine and solved slightly the wrong problem.

## I still made all the real decisions

The iOS app is native Swift and SwiftUI. The site over at [calledup.app](https://calledup.app) is Next.js and React. I chose these because I have experience with both, I didn't want to just blindly follow what Claude told me.

That sounds obvious, but it's the thing I see people get wrong. They hand the AI the decisions that actually decide whether the codebase is still livable in a year, how the data's modeled, where the boundaries are, what gets saved and when. Let the model freelance those and you end up with a codebase where every feature was clearly built by a slightly different stranger with slightly different opinions.

So I treated it like a fast, talented engineer who'd joined last week and hadn't learned how we do things yet. I decided how a lineup is modeled, how the roster ties to the schedule, how state moves through the app. Then I let it do the grunt work inside those lines. It wrote plenty of code, but it was code that fit a design I understood and could defend.

Keep yourself in the architect's chair and AI stops being a slot machine.

## Small features, plan first, understand before you hand off

The features that went smoothly were the small ones. "Let me mark a player as unavailable for a game, and have the lineup flag it." That I can describe exactly, build in an evening, and check on my phone the next morning.

A few things I held myself to:

- One feature at a time. I never asked for "the roster system." I asked for the next small piece, got it working, tested it and then moved on. Big asks turn into big messes you have to untangle later.
- I always asked it to create a plan first, then I actually read the output. If I couldn't tell why it did something a certain way, I asked, or I changed it. The first time you ship code you don't understand, you've quietly given up the ability to fix your own app.
- I tested it like a coach, not like a demo. The app went on my real phone and I ran through real scenarios. First I'd build a lineup, pull a kid out, see what breaks. The test that matters for CalledUp isn't whether it compiles. It's whether it survives Jacob bailing an hour before first pitch.

None of this is clever. It's the same boring discipline that's always kept software alive. AI doesn't change those rules. It just makes them very easy to skip.

## So what did the AI actually do?

Fair question, if I'm reading every line and making every structural call then what's the point?

It shrank the gap between having an idea and having a working feature. My bottleneck as a solo builder with a day job and kids was never raw coding ability, it's time, and the cost of context-switching back into a project after a week away. The Swift boilerplate, the layout I'd otherwise be googling, the fifth list view that's almost like the last four, the marketing page, all the stuff that used to eat a whole evening now takes about an hour. That saved hour is the entire difference between a side project that ships and one that rots in a half-finished branch.

It also made it easier to _start_. When the feature already exists as a conversation from the ball diamond, opening the laptop isn't a mountain. It's just finishing a thought I already started.

That's the sustainable part for me. Not "AI builds my app while I sleep" more that it knocks down enough friction that I keep coming back. And coming back, week after week without burning out, is the only thing that ever gets a side project across the line.

## If you want to build something real

If you're sitting on your own version of this, here's what I'd say.

Start with a problem you actually have. I didn't set out to make an app, I set out to never redo a lineup in a parking lot again. That frustration _is_ the spec.

Do the thinking before you touch the keyboard. Talk the problem through with the AI on your phone, on a walk, wherever your head is clear, and show up to the editor with a design instead of a vibe.

Keep the decisions a senior engineer would never delegate. Hand off the typing, not the thinking.

Stay small and stay honest, one feature, read the code, test it like a real user, repeat. And actually ship it, because the app doesn't count for anything until someone who isn't you is using it. CalledUp went on the App Store, and that's when the feedback that mattered finally showed up.

The tools really are good now. Good enough that one person with a genuine problem and a bit of discipline can ship something polished in their spare evenings. The risk was never that AI is too weak. It's that it's strong enough to let you skip the parts that keep the thing standing.

So build it. Just don't lose the plot on the way.

_If you coach a baseball or softball team and you're sick of rebuilding lineups in the parking lot, [CalledUp](https://calledup.app) is free, and it's on the [App Store](https://apps.apple.com/ca/app/calledup/id6771082932)._
