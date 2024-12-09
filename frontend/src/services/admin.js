import api from "@/configs/axiosConfige";

const getAllCategories = () => api.get("/category").then(res => res  || false);
const createCategory = (form) => api.post("/category" ,form)
const deleteCategory = (id) => api.delete(`/category/${id}`)
const getCategory = (id,categories) => {
    
}


export {getAllCategories,createCategory,deleteCategory}