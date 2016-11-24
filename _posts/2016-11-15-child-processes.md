---
layout: post
title:  "What I am Learning: Child Processes in Node.js"
date:   2016-11-15 13:34:00 -0400
categories: learning
---

### What is a child process?

A child process is akin to `Linux's` `popen(3)`. It is used to generate another
shell/bash and execute a command in that.

Since Node.js is designed for efficient I/O processes, this functionality allows
for more intensive CPU processes without freezing the event loop.

Parent processes _spawn processes_, which are called the children of that
particular process. Child processes and parent processes can ommunicate back
and forth, and parent processes can listen to and control (to some extent)
their child processes.

### How does this fit into the Observer pattern?

The observer pattern is a software design pattern in which an object, called
the subject, maintains a list of its dependents, called observers, and notifies
them automatically of any state changes, usually by calling one their methods.

### Stark differences between Windows and Unix

The binary installation of Node has only been provided the child_processes
module in version X.X.X.

Options:
`detached`:
  `Windows`: Allows child to outlive its parent process
  `Unix`: Since child processes have always been allowed to outlive its parent,
  this just enables the child process to become the leader of the new process
  group and session.

  The parent will wait for the detached child before exitting. You can use
  `child.unref()` to prevent the parent from waiting.



### Behaviours

The assumption here is that for a child process should exist, or at least extend
a base of the same environment as the parents (defined in `process.env`). I believe node does this automatically, or else I could be wrong.

_exec_:
  - Does not communicate between parent and child
  - Output is a buffer, not a readable stream
_execFile_:
  - Like `.exec` but does not spawn a shell, rather `file` is spawned directly
    as a new process (slightly more efficient)
_spawn_:
  - Monitored by parent process
  - Listens to events such as close, error, exit, etc.
  - Does not share memory with parent process
_fork_:
  - Simliar to spawn; allows parent-child communication
  - Returns a child_process establishing an IPC channel

### More Information

pid is known as the processing group ID. A child process inherits the same process session ID
as its parents. If a process that is a session leader terminates, then a SIGHUP[^1] signal is
sent to each process.

### Footnotes

[^1]: This signal is used to report the termination of the controlling process on a terminal
to jobs associated wih that session. This disconnects all processes in the session from the
controller terminal.

Any child process of the process being terminated are assigned a new parent process.

[^2]: The first process started during booting of the computer system. It continues running
until the system itself is shutdown.

### Glossary

Orphan process - is a computer process whose parent process has finished or terminated,
though it remains running. Inherent to Unix operating systems, orphaned processes will be
immediately adopted by the special init system process: the kernel sets the parent to init[^2].

Daemon - a computer program that runs as a background process, rather than being under the
direct control of an interactive user.

Resources:

https://medium.com/@graeme_boy/how-to-optimize-cpu-intensive-work-in-node-js-cdc09099ed41#.c78zcc41z
https://en.wikipedia.org/wiki/Observer_pattern
https://nodejs.org/api/child_process.html#child_process_options_detached

https://en.wikipedia.org/wiki/Init
https://en.wikipedia.org/wiki/Process_identifier