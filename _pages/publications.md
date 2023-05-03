---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

My academic articles can be accessed via <a href="https://scholar.google.com/citations?user=uVz5JY0AAAAJ&hl=en" target="_blank">my Google Scholar profile</a>.

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}