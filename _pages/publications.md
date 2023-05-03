---
layout: archive
title: "Publications"
{% permalink: /publications/ %}
author_profile: true
---

<script src="https://bibbase.org/show?bib=https%3A%2F%2Fapi.zotero.org%2Fusers%2F11426807%2Fcollections%2F7HX4MMA4%2Fitems%3Fkey%3D2Cer1z7th4xh1anNFOATvphS%26format%3Dbibtex%26limit%3D100&jsonp=1"></script>

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}