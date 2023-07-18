# Platform Team Interview Take Home Exercise

## Outline

As a potential member of the Voiceflow Platform Team, you have been tasked with writing the first piece of a new API: an interface to handle conversation interactions. This API will be the basis for other routes and features, but your task is limited to the conversation flow.

Provided are two templates using different frameworks: NestJS and Express (coming soon). Choose one to work in for whichever you'd feel most comfortable.

- [NestJS](./backend/nest/)
- [Express](./backend/express/)

## Goals

Create an endpoint to take in a message from the chat app. That endpoint should reference a `diagram` ID that you need to load from the resources. These resources are [just files](./resources/data/diagram.js), but treat this like you'd handle any other need for a database.

Once you have the diagram, you need to follow the `nodes` within (starting from the `startNodeID`). Depending on the `type` of node you need to output a different `reply`. For now this only includes `text` nodes, but we would want to extend this in the future. You need to take the node type and process it to get a `reply` object back.
> :information_source: Normally some natural language understanding would be applied to the message and the diagram would be processed differently depending on what was said. But for this exercise, we will just process all nodes in the diagram every time.

You should return an array of each `reply` to the caller, following this example:
```
{
  reply: [
    {
      type: 'text',
      text: 'Hello World!'
    }
  ]
}
```

Each `node` has a `nextID` referencing the next `node` to be processed. Follow the tree of nodes, processing each, collecting each `reply`.

The `text` node has a `value` that can be an array with variable references. When you see this you need to look up the variable and resolve the `value` into a string. The variables can be found in the `diagram` in the `variables` property.

When a message is received, we also need to send this off to an analytics service. For purposes of this exercise, just append the messages to a text file.

## Data Structures

The data structures you'll be working with can be found in the [`interfaces` folder](backend/nest/src/conversation/interfaces).

## Setup

Fork this repository (making it private is a-ok!), clone it, then decide which template to work in.

Install by running `yarn install`.

This is set up as a monorepo using the [yarn package manager](https://classic.yarnpkg.com/en/docs/install#mac-stable). Run all commands from the root using the `yarn workspace` syntax. The workspace depends on which template you've chosen: `nest` or `express`.

To add dependencies use the `add` command. For example: `yarn workspace nest add my-cool-package`.

To start the development server use the `dev` command. For example: `yarn workspace nest dev`.

## Evaluation

Here's a few things we'll be looking for from your solution:

1. Interface Design
  - Do the API routes follow an established pattern like REST? Are interfaces consistent?
1. Separation of Concerns
  - Is each domain of the system outlined with a clear separation? Are functions not overloaded? Is the system extendable?
1. "Build vs Buy"
  - Where are existing libraries used vs custom solutions? What trade offs have been made?

Don't hesitate to ask for clarification on any aspect. This isn't set up to trick you in any way. We want you to succeed and want an understanding of how you write code.
