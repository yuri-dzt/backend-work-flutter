window.onload = () => {
  const clientBox = document.querySelector("#clients");
  const productsBox = document.querySelector("#productsList");

  fetch(`http://localhost:3355/api/clients`)
    .then(async (response) => await response.json())
    .then((clients) => {
      clients.forEach((client) => {
        clientBox.innerHTML += `
        <div class="border border-gray-400 place-items-center py-2 text-white px-10 rounded-lg grid grid-cols-4">
            <span class="w-full flex justify-center truncate">${client.name} ${client.lastname}</span>
            <span class="w-full flex justify-center truncate">${client.email}</span>
            <span class="w-full flex justify-center truncate">${client.age}</span>
            <button onClick=(deleteClient(${client.id})) class="text-red-500 ">X</button>
        </div>`;
      });
    })
    .catch((error) => {
      console.error("Error fetching clients:", error);
    });

  fetch(`http://localhost:3355/api/products`)
    .then(async (response) => await response.json())
    .then((products) => {
      products.forEach((product) => {
        const updated = new Date(product.updateDate);
        productsBox.innerHTML += `
        <div class="border border-gray-400 place-items-center py-2 text-white px-10 rounded-lg grid grid-cols-5">
            <span class="w-full flex justify-center">${product.name}</span>
            <span class="w-full flex justify-center">${product.price}</span>
            <span class="w-full flex justify-center">${
              product.description
            }</span>
            <span class="w-full flex justify-center">${updated.getDate()}/${updated.getMonth()}/${updated.getFullYear()}</span>
            <button onClick=(deleteProduct(${
              product.id
            })) class="text-red-500">X</button>
        </div>`;
      });
    })
    .catch((error) => {
      console.error("Error fetching clients:", error);
    });
};

const deleteClient = (clientId) => {
  fetch(`http://localhost:3355/api/clients/${clientId}`,{
    method: "DELETE",
  })
    .then((reponse) => {
      if (!reponse.ok) {
        alert("Erro");
      }else{
        location.reload();
      }
    })
};

const deleteProduct = (productId) => {
  fetch(`http://localhost:3355/api/products/${productId}`,{
    method: "DELETE",
  })
    .then((reponse) => {
      if (!reponse.ok) {
        alert("Erro ao deletar produto");
      }else{
        
        location.reload();
      }
    })
   ;
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#ClientForm"); // Corrigido para selecionar pelo ID com '#'

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;

    const requestBody = JSON.stringify({
      nome: name,
      sobrenome: lastName,
      email,
      idade: age,
    });

    

    try {
      fetch(`http://localhost:3355/api/clients`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao criar cliente");
          }
        })
        .then((data) => {
          console.log(data);
          document.querySelector("#requestMessage").innerHTML = 'Cliente criado com sucesso!';
          location.reload();
        });
    } catch (err) {
      console.error("Erro ao criar cliente:", err.message);
    }

    document.getElementById("name").value = "";
    document.getElementById("lastname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("age").value = "";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#ProductForm"); // Corrigido para selecionar pelo ID com '#'

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("productName").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;

    const requestBody = JSON.stringify({
      name,
      description,
      price,
    });

    try {
      fetch(`http://localhost:3355/api/poducts`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      })
        .then((response) => {
          if (!response.ok) {
            alert("Erro ao criar cliente");
          }
        })
        .then((data) => {
          location.reload();
        });
    } catch (err) {
      alert("err");
    }

    document.getElementById("productName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
  });
});
