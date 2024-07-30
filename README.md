# API du projet

- `/api/books` - GET : récupère l'ensemble des books
- `/api/books` - POST : créé un nouveau book
- `/api/books/:id` - GET : récupère 1 book à partir de l'id mongo (\_id)
- `/api/books/:id` - PUT : modifie 1 book à partir de l'id mongo (\_id)
- `/api/books/:id` - DELETE : supprime 1 book à partir de l'id mongo (\_id)
- `/api/books/:id/rating` - POST : ajoute une note à un book
- `/api/books/bestrating` - GET : récupère l'ensemble des books triés du mieux noté au moins bien noté