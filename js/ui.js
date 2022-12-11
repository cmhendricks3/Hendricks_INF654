const pantryItems = document.querySelector(".pantry")

document.addEventListener("DOMContentLoaded", function () {
    //Nav Menu
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, { edge: "left" });

    const forms = document.querySelectorAll(".side-form");
    M.Sidenav.init(forms, { edge: "left" });
});

const renderPantryItem = (data, id) => {
    const html = `
        <div class="card-panel pantry_item white row" data-id="${id}">
            <div class="pantry_item-detail">
                <div class="pantry_item-description" style="font-size: 20px;">
                    ${data.ingredient}
                <div class="pantry_item-delete right">
                    <i class="material-icons" data-id="${id}">delete_outline</i>
                </div>
                <div class="pantry_item-edit right">
                    <i class="material-icons" data-id="${id}">edit</i>
                </div>
            </div>
        </div>
        `;
    pantryItems.innerHTML += html;
}