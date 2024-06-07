import HomeCoverImage from "../components/HomeCoverImage";
import HomeHeader from "../components/HomeHeader";
import TopCategories from "../components/TopCategories"
import TopWomenCategories from "../components/TopWomenCategories";
import ColoredSection from "../components/ColoredSection";




function Home(){
    return(
        <>
        <HomeHeader />
        <TopCategories/>
        <ColoredSection/>
        <HomeCoverImage/>
        <TopWomenCategories/>
        </>
    )
}

export default Home;