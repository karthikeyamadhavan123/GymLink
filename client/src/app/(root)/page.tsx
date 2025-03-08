import Comment from "@/components/Comment";
import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Path from "@/components/Path";

export default function Home() {
  return (
    <div className="z-10 relative flex flex-col overflow-x-hidden">
     <Main/>
     <Comment/>
     <Path/>
     <Footer/>
    </div>
  );
}
