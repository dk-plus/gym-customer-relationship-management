<!DOCTYPE html>
<html lang="en">
  <head>
    <title>{{title}}</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <input id="userInfo" type="hidden" value='{{userInfo}}' />
    {% block style %}{% endblock %}
  </head>
  <body>
    {% block content %}{% endblock %}
  </body>
</html>