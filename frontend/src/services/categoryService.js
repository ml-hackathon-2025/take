export async function getCategories() {
    const res = await fetch("/api/categories");
    return res.json();
  }
  
  export async function getCategoryById(id) {
    const res = await fetch(`/api/categories/${id}`);
    return res.json();
  }
  
  export async function createCategory(category) {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    return res.json();
  }