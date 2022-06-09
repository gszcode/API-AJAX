const $btnVerAmigos = document.getElementById("boton");
const $btnBuscarAmigo = document.getElementById("search");
const $btnEliminarAmigo = document.getElementById("delete");
const $img = document.querySelector("img");

// buscar lista de amigos
const mostarAmigos = () => {
  // document.getElementById('lista').empty(); NO ANDAAAA
  $("#lista").empty(); // limpia la lista

  $.get("http://localhost:5000/amigos", (data) => {
    const $lista = document.getElementById("lista");
    let fragmento = document.createDocumentFragment();

    data.forEach((amigo) => {
      let li = document.createElement("li");

      li.append(`👉🏽 ${amigo.name} 👽`);
      fragmento.append(li);
    });

    $lista.append(fragmento);
    $img.style.display = "none";
  });
};
$btnVerAmigos.addEventListener("click", mostarAmigos);

// buscar amigo
$btnBuscarAmigo.addEventListener("click", () => {
  const $input = document.getElementById("input").value;

  $.get(`http://localhost:5000/amigos/${$input}`, (data) => {
    const $span = document.getElementById("amigo");
    let p = document.createElement("p");

    p.append(`✔ ${data.name} `);
    $span.append(p);

    document.getElementById("input").value = "";
  });
});

// eliminar amigo
$btnEliminarAmigo.addEventListener("click", () => {
  let amigoEliminado;
  const $inputDelete = document.getElementById("inputDelete").value;

  $.get(`http://localhost:5000/amigos/${$inputDelete}`, (data) => {
    amigoEliminado = data.name;
  });

  $.ajax({
    url: `http://localhost:5000/amigos/${$inputDelete}`,
    type: "DELETE",
    success: function () {
      const $span = document.getElementById("success");
      let p = document.createElement("p");

      p.append(`❌ Tu amigo ${amigoEliminado} fue eliminado con exito.`);
      $span.append(p);
      mostarAmigos();

      document.getElementById("inputDelete").value = "";
    },
  });
});
