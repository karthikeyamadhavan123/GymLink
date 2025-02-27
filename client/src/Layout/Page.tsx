import Layout from "./Layout";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Main from "../components/Main";
import Procedure from "../components/Procedure";

const Page = () => {
    return (
        <>
            <Layout>
                <div className="relative min-h-screen w-full">
                    <div className="bg-[url('/background.jpg')] absolute inset-0 bg-cover -z-10 "></div>
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    <div className="relative z-10">
                        <Navbar />
                        <div className="mt-28 flex flex-col text-center">
                            <Header />
                        </div>

                    </div>

                </div>
                <div className="flex flex-col">
                    <Main />
                </div>
                <div className="bg-black text-white h-[710px]">
                    <Procedure />
                </div>
            </Layout>
        </>
    );
};

export default Page;