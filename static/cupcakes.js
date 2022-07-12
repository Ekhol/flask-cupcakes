const URL = "http://localhost:5000/api";

function createCupcakeHTML(cupcake) {
    return `
    <div cupcake-id=${cupcake.id}>
        <li>
            ${cupcake.flavor}, ${cupcake.size}, ${cupcake.rating}
            <button>Delete?</button>
        </li>
        <img src="${cupcake.image}">
    </div>`;
}

async function showCupcakes() {
    const resp = await axios.get(`${URL}/cupcakes`);
    for (let cakeData of resp.data.cupcakes) {
        let newCupcake = $(createCupcakeHTML(cakeData));
        $("cupcakes").append(newCupcake);
    }
}

$("#new-cupcake").on("submit", async function (e) {
    e.preventDefault();

    let flavor = $("#flavor").val();
    let rating = $("#rating").val();
    let size = $("#size").val();
    let image = $("#image").val();

    const newCupcakeResp = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });

    let newCupcake = $(generateCupcakeHTML(newCupcakeResp.data.cupcake));
    $("#cupcakes").append(newCupcake);
    $("#new-cupcake").trigger("reset");
});

$("#cupcakes-list").on("click", ".delete-button", async function (e) {
    e.preventDefault();
    let $cupcake = $(evt.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");

    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});


$(showCupcakes);