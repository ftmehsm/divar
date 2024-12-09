import Categories from "@/components/templates/Categories";
import Posts from "@/components/templates/Posts";




function HomePage() {


    return (
        <div className="grid md:grid-cols-4">
            <Categories/>
            <Posts/>
        </div>
    );
}

export default HomePage;