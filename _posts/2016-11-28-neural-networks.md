---
layout: post
title:  "What I am Learning: Neural Networks"
description: "Notes on neural networks."
categories: [learning]
---

### What is a neural network?

A neural network can be described as an algorithm or proccss that is intended to
progressively learn a concept by analyzing and remembering a set of training
examples. This set can be as small as 10 to a million. Obviously, the more
examples fed into the system, the more a program will learn this given concept.

A concept can be a replication of a human faculty. One common investigation
(and successful implementation, is handwriting. You see it nowadays with bank
ATMs, postal offices reading addresses, etcetera).

<!-- "But along the way we'll develop many key ideas about neural networks, including two important types of artificial neuron (the perceptron and the sigmoid neuron), and the standard learning algorithm for neural networks, known as stochastic gradient descent."
 -->

### Recurrent Neural Networks

Traditional neural networks do not have knowledge persistence. Which is to say,
they cannot build off previously learned knowledge to have a leg up in gaining
more. In short, they lack context. Each time new data is given, the process
will start from the beginning and reach a new conclusion. Unlike human processes
that take previously gained information to reason a novel one.

Recurrent neural networks address this issue. They are networks that contain
loops that pass data from one process to a duplicate process.

#### LSTM

This is a special sort of recurrent neural network. It stands for Long Short
Term Memory networks.

RNNs have a problem with information gaps. When we are talking about
predictability based off of previously gained knowledge, there might be a large
gap between one piece of information or another. So as the gap grows RNNs are
unable to connect that information.

However, LTSM are capable of learning long-term dependencies. They are designed
to avoid this problem.

Traditionally RNN have only one layer of mapping between each structure. A
LTSM has four.

The idea is that there is a cell state that runs through each structural
iteration. In each structure, there are gates that optionally let information
through. There are three gates that determines how much of the component to let
through. Within the gate, there will be logic to determine which information
to keep, throw away, or update. It basically handles all the information that
is being relayed in the cell-state.

Ref: [Understanding LSTMs]

### Perceptrons

Are an artificial neuron created in the 50s which take several binary inputs
to produce a single binary output. A binary input may be denoted by any
variable $$ x_1, .. $$. There are weights that are real numbers to express the
importance of the respective inputs to the output.

These can be viewed as scalar multiples that with the binary input determine
the output to be either 1, or 0, if the sum of the products of binary inputs
and weights are more or less than the threshold (determined by the neuron).

$$
\begin{align*}

 output =
  \begin{cases}
    0, & \text{if}\ \sum\limits_{j=1}^n w_jx_j \leq \text{threshold} \\
    1, & \text{if}\ \sum\limits_{j=1}^n w_jx_j > \text{threshold}
  \end{cases}

\end{align*}
$$

We can use the framework of a decision-making model. With any given determined
on-off value, x, and any weight of importance on whether or not the given
condition is present, w, we notice that in layman's terms, the lower the
threshold, the greater the chance of 1 (yes-value).

It essentially weighs up different kinds of evidence in order to make decisions.
Though it is a simple model, a combination of perceptrons can make quite
subtle decisions.

We often see layers of perceptrons in implementations of neural networks. A
first layer may make any number of simple decisions. Then a second layer
will weigh up those results, and are able to determine a decision based on
more interactions and abstract level of the first layer. This goes on.

In a model like this, each single output can be used by multiple, and different
receptor perceptrons.

To reinforce the framework of linear algebra, we can rewrite this model with
vectors. Thus the product of the weight and binary input is the dot product
$$ w \cdot x $$. And to bring the threshold onto the lefthand side, let $$ b =
-\text{threshold} $$, where $$ b $$ is also known as the perceptron's _bias_.

$$
\begin{align*}
 output =
  \begin{cases}
    0, & \text{if}\ w \cdot x + b \leq 0 \\
    1, & \text{if}\ w \cdot x + b > 0
  \end{cases}
\end{align*}
$$


In biology, we might think about this as how easy it is to get the perceptron
to fire. For a perceptron with a really big bias, it's extremely easy to fire.
But with a very negative bias, it is very difficult to output 1.

These perceptrons, if given two inputs can be reduced down, or are directly
anaglous to a construction of logic gates. Or simply, a unique type of NAND gate
which is used to produce a single output.

We learn later on, that our algorithm techniques can be used to fine tune our
weights and biases so that it elevates the conventional logic gate. And helps
us dynamically solve problems, as opposed to rigourously designing a static
circuit.

### Let's Learn about NAND gates and circuit diagrams

A NAND gate is defined to be a boolean operator that will only give the value
of zero, if and only if all the inputs have the value of one. Thus,

| A | B | A NAND B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

<!-- @ Expand on this thoroughly, try some examples yourself. Be vigilant. -->
<!-- @ Read the first two chapters of Nand2Tetris -->

#### Sigmoid Neurons

A subtype of perceptrons. Unlike the regular perceptron, there is a different
mathematical derivation of how to determine the output. One of the most
notable thing is that as opposed to recieving 1 or 0, it can also recieve any
number between 1 or 0, say, 0.077. This also applies to the bias and output.

Again, all that matters is the likelihood of the artificial neuron to _"fire"_.

The new equation of sigmoid neuron uses the constant $$ \sigma $$, also known is the
sigmoid function. Which is equivalent to:

$$
\begin{align*}

  \sigma \equiv \frac{1}{1 + e^{-z}}

\end{align*}
$$

The sigmoid function is much more of a step function. It grows relatively over
$$ z = w \cdot x + b $$.
<!-- kind of looks like this _|- -->

#### So what does this mean?



[Understanding LSTMs]: http://colah.github.io/posts/2015-08-Understanding-LSTMs/
[Neural Networking: Chapter 1]: http://neuralnetworksanddeeplearning.com/chap1.html
[Hacker's Guide to Neural Networks]: http://karpathy.github.io/neuralnets/
