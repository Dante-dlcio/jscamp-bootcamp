<!-- Aquí puedes poner tus dudas sobre el ejercicio -->

En getSalaryRange me encontré con un problema al tipar los salarios.

Como salary es opcional dentro de Job, TypeScript lo entiende como number | undefined y después daba error al usar esos valores con Math.min y Math.max.
Mi primera idea fue filtrar primero los jobs que sí tenían salary y después hacer el map:

const salaries = jobs
.filter((job) => job.salary !== undefined)
.map((job) => job.salary);

El problema fue que, aunque ya había filtrado los jobs que tenían salary, TypeScript seguía interpretando salaries como un array que podía contener undefined, es decir, (number | undefined)[].

Por eso seguía dando error en:

Math.min(...salaries);
Math.max(...salaries);

Al final lo resolví haciendo primero el map y después filtrando los undefined con un type:

const salaries = jobs
.map((job) => job.salary)
.filter((salary): salary is number => salary !== undefined);

De esa forma TypeScript ya entiende que salaries es number[] y Math.min y Math.max dejan de romper todo.

Mi duda es si esta es la forma correcta o recomendada de resolverlo, o si hay una manera más simple de hacer que TypeScript mantenga el narrowing después del filter.
