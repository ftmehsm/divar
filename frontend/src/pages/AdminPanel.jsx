import CategoryList from '@/components/templates/CategoryList';
import CategoryForm from '@/components/templates/CategoryForm';

function AdminPanel() {
    return (
        <div>
            <CategoryList/>
            <CategoryForm/>
        </div>
    );
}

export default AdminPanel;