---
layout: post
title:  "What I am Learning: UNIX Processes"
date:   2016-11-25 23:46:00 -0400
categories: learning
images:
  - image_path: /assets/unix_processes_1.jpg
    title: Unix Processes 1
    caption: 1. Overview of Kernel & Processes, how they communicate
  - image_path: /assets/unix_processes_2.jpg
    title: Unix Processes 2
    caption: 2. Program vs. Process
  - image_path: /assets/unix_processes_3.jpg
    title: Unix Processes 3
    caption: 3. Properties of a Process
---

In continuation to my compilation of notes about child processes in nodejs.
I recognized that I knew next to nothing about UNIX, or processes. I was really
just jotting down notes verbatim. So instead, I downloaded a PDF and got
cracking.

I don't know about anyone else, but I find programming texts can be a bit dry
and disengaging. I found myself zoning out or reading text without comprehending
the words. Eventually, I realized that I'd benefit from a visual note-taking
methodology and switched over.

It was fun exercise because processes in UNIX follows a tree-like structure and
its ontology is family-like (in a human sense). So, while there are still exists
large, daunting gaps in my knowledge, I think I've obtained a trivial
understanding of where processes fit into the operating system!

Which lands me further than I was yesterday. Yay :)

Here are my visual notes:

<ul class="photo-gallery" style="list-style: none;">
  {% for image in page.images %}
    <li>
      <a href="{{ image.link }}">
        <img src="{{ image.image_path }}" alt="{{ image.title}}"/>
      </a>
      <em>{{ image.caption }}</em>
    </li>
  {% endfor %}
</ul>

